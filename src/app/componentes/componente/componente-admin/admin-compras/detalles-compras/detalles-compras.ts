import { Component, OnInit } from "@angular/core";
import { CommonModule, CurrencyPipe, NgFor, NgIf } from "@angular/common";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { MenuLateral } from "../../menu-lateral/menu-lateral";
import { Compra } from "../../../../../interface/compra";
import { IProveedor } from "../../../../../interface/proveedores";
import { ServiceCompra } from "../../../../../service/service-compra/service-compra";
import { IInsumo } from "../../../../../interface/insumos";

export interface DetalleCompra {
  idCompra: number;
  idInsumo: number;
  cantidad: number;
  precioUnitario: number;
  insumo?: IInsumo; 
}

interface DetalleCompraConNombre extends DetalleCompra {
  nombreInsumo?: string;
}

@Component({
  selector: 'app-detalle-compra',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule, NgIf, NgFor, MenuLateral],
  templateUrl: './detalles-compras.html',
  styleUrls: ['./detalles-compras.css']
})
export class DetallesCompra implements OnInit {
  compra: Compra | null = null;
  detallesCompra: DetalleCompraConNombre[] = [];
  proveedor: IProveedor | null = null;
  insumos: IInsumo[] = [];
  proveedores: IProveedor[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceCompra: ServiceCompra
  ) {}

  ngOnInit() {
    const idCompra = Number(this.route.snapshot.paramMap.get('id'));

    Promise.all([
      this.serviceCompra.getInsumos().toPromise(),
      this.serviceCompra.getProveedores().toPromise()
    ])
    .then(([insumosData, proveedoresData]) => {
      this.insumos = insumosData ?? [];
      this.proveedores = proveedoresData ?? [];
      this.cargarCompra(idCompra);
    })
    .catch(err => {
      console.error('Error cargando insumos o proveedores:', err);
      this.insumos = [];
      this.proveedores = [];
      this.cargarCompra(idCompra);
    });
  }

  cargarCompra(idCompra: number): void {
    this.serviceCompra.getCompraById(idCompra).subscribe({
      next: (data: any) => {
        this.compra = data;

        
        this.proveedor = this.proveedores.find(p => p.idProveedor === data.idProveedor) || null;

        this.detallesCompra = Array.isArray(data.detalles) ? data.detalles.map((detalle: DetalleCompra) => {
          
          if (detalle.insumo?.nombreInsumo) {
            return { ...detalle, nombreInsumo: detalle.insumo.nombreInsumo };
          }
     
          const insumoEncontrado = this.insumos.find(i => i.idInsumo === detalle.idInsumo);
          return { ...detalle, nombreInsumo: insumoEncontrado?.nombreInsumo ?? 'Desconocido' };
        }) : [];

        console.log('Detalles con nombreInsumo:', this.detallesCompra);
      },
      error: (error) => {
        console.error('Error al obtener compra:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/catalogo-compras']);
  }
}
