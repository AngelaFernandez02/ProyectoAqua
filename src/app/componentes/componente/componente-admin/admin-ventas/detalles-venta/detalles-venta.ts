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

export interface DetalleVenta {
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
  nombreProducto?: string;
}

@Component({
  selector: "app-detalle-venta",
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule, NgIf, NgFor],
  templateUrl: "./detalles-venta.html",
  styleUrls: ["./detalles-venta.css"],
})
export class DetallesVenta implements OnInit {
  venta: Venta | null = null;
  cliente: ICliente | null = null;
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
      this.productos =
        (await firstValueFrom(this.serviceProducto.getProductos())) ?? [];
      console.log("Productos cargados en ngOnInit:", this.productos);
    } catch (err) {
      console.error("Error cargando productos:", err);
      this.productos = [];
    }

    this.cargarVenta(idVenta);
  }

  cargarVenta(idVenta: number): void {
    this.serviceVenta.getVentaById(idVenta).subscribe({
      next: (data: Venta & { tbVentaDetalles?: any[] }) => {
        console.log("Venta recibida:", data);
        this.venta = data;

        // Cargar cliente si existe
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

        // Usar tbVentaDetalles para los detalles
        if (Array.isArray(data.tbVentaDetalles)) {
          this.detallesVenta = data.tbVentaDetalles.map((detalle: any) => {
            // Ajusta según el nombre de la propiedad idProducto que venga en detalle
            const idDetalleNum =
              Number(detalle.idProducto ?? detalle.IDPRODUCTO ?? 0);

            const productoEncontrado = this.productos.find(
              (p) => Number(p.idProducto) === idDetalleNum
            );

            if (productoEncontrado) {
              console.log(
                "Producto encontrado:",
                productoEncontrado.nombreProducto
              );
            } else {
              console.warn(`Producto NO encontrado para idProducto=${idDetalleNum}`);
            }

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

        console.log("DetallesVenta final con nombres:", this.detallesVenta);
      },
      error: (error) => {
        console.error("Error al obtener venta:", error);
      },
    });
  }

  goBack(): void {
    this.router.navigate(["/admin/catalogo-venta"]);
  }
}
