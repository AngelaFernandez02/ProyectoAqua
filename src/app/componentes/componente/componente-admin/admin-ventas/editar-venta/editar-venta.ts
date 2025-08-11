import { Component, OnInit } from "@angular/core";
import { CommonModule, CurrencyPipe, NgFor, NgIf } from "@angular/common";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

import { ICliente } from "../../../../../interface/cliente";
import { IProducto } from "../../../../../interface/producto";

import { ServiceVenta } from "../../../../../service/service-venta/service-venta";
import { SProducto } from "../../../../../service/service-producto/productos";
import { ClienteService } from "../../../../../service/service-cliente/service-cliente";
import { Venta } from "../../../../../interface/Venta";

import { firstValueFrom } from "rxjs";
import { FormsModule } from "@angular/forms";

export interface DetalleVenta {
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
  nombreProducto?: string;
}

@Component({
  selector: "app-editar-venta",
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule,FormsModule, NgIf, NgFor],
  templateUrl: "./editar-venta.html",
  styleUrls: ["./editar-venta.css"],
})
export class EditarVenta implements OnInit {
  venta: Venta | null = null;
  cliente: ICliente | null = null;
  clientes: ICliente[] = [];
  productos: IProducto[] = [];
  detallesVenta: DetalleVenta[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceVenta: ServiceVenta,
    private serviceProducto: SProducto,
    private serviceCliente: ClienteService
  ) {}

  async ngOnInit() {
    const idVenta = Number(this.route.snapshot.paramMap.get("id"));

    try {
      this.productos = (await firstValueFrom(this.serviceProducto.getProductos())) ?? [];
      this.clientes = (await firstValueFrom(this.serviceCliente.getList())) ?? [];
      console.log("Productos cargados:", this.productos);
      console.log("Clientes cargados:", this.clientes);
    } catch (err) {
      console.error("Error cargando productos o clientes:", err);
      this.productos = [];
      this.clientes = [];
    }

    this.cargarVenta(idVenta);
  }

  cargarVenta(idVenta: number): void {
    this.serviceVenta.getVentaById(idVenta).subscribe({
      next: (data: Venta & { tbVentaDetalles?: any[] }) => {
        console.log("Venta recibida:", data);
        this.venta = data;

        // Cargar cliente actual
        if (data.idCliente) {
          this.serviceCliente.getById(data.idCliente).subscribe({
            next: (clienteData) => {
              this.cliente = clienteData;
              console.log("Cliente cargado:", this.cliente);
            },
            error: (err) => {
              console.error("Error cargando cliente:", err);
              this.cliente = null;
            },
          });
        }

        if (Array.isArray(data.tbVentaDetalles)) {
          this.detallesVenta = data.tbVentaDetalles.map((detalle: any) => {
            const idDetalleNum = Number(detalle.idProducto ?? detalle.IDPRODUCTO ?? 0);

            const productoEncontrado = this.productos.find(
              (p) => Number(p.idProducto) === idDetalleNum
            );

            return {
              idProducto: idDetalleNum,
              cantidad: detalle.cantidad,
              precioUnitario: detalle.precioUnitario,
              nombreProducto: productoEncontrado
                ? productoEncontrado.nombreProducto
                : "Producto desconocido",
            };
          });
        } else {
          this.detallesVenta = [];
          console.warn("La propiedad tbVentaDetalles no es un arreglo");
        }
      },
      error: (error) => {
        console.error("Error al obtener venta:", error);
      },
    });
  }

  onProductoChange(detalle: DetalleVenta, nuevoIdProducto: number) {
    const producto = this.productos.find(p => p.idProducto === nuevoIdProducto);
    if (producto) {
      detalle.idProducto = nuevoIdProducto;
      detalle.nombreProducto = producto.nombreProducto;
      detalle.precioUnitario = producto.precio; // Ajusta según tu propiedad
    }
  }

  guardarCambios() {
  if (!this.venta) return;

  const ventaActualizada = {
    ...this.venta,
    Detalles: this.detallesVenta.map(d => ({
      idProducto: d.idProducto,
      cantidad: d.cantidad,
      precioUnitario: d.precioUnitario,
    })),
  };

  this.serviceVenta.actualizarVenta(this.venta.idVenta!, ventaActualizada).subscribe({
    next: () => {
      alert("Venta actualizada correctamente");
      this.router.navigate(["/admin/catalogo-venta"]);
    },
    error: (err) => {
      console.error("Error al actualizar venta:", err);
      alert("Error al actualizar la venta");
    },
  });
}

  goBack(): void {
    this.router.navigate(["/admin/catalogo-venta"]);
  }
}
