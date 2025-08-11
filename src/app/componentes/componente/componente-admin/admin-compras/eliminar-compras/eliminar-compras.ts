import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SProveedores } from '../../../../../service/service-proveedores/proveedores';

import { IProveedor } from '../../../../../interface/proveedores';
import { ServiceCompra } from '../../../../../service/service-compra/service-compra';
import { Compra } from '../../../../../interface/compra';

@Component({
  selector: 'app-eliminar-compra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar-compras.html',
  styleUrls: ['./eliminar-compras.css']
})
export class EliminarCompras implements OnInit {
  compraId!: number;
  compra: Compra | null = null;
  proveedorNombre: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sCompras: ServiceCompra,
    private sProveedores: SProveedores
  ) {}

  ngOnInit(): void {
    this.compraId = +this.route.snapshot.paramMap.get('id')!;
    this.obtenerCompra();
  }

  obtenerCompra(): void {
    this.sCompras.getCompraById(this.compraId).subscribe({
      next: (data) => {
        this.compra = data;
        if (this.compra?.idProveedor) {
          this.obtenerProveedor(this.compra.idProveedor);
        }
      },
      error: (err) => {
        console.error('Error al obtener compra:', err);
        alert('Error al cargar los datos de la compra');
        this.router.navigate(['/compras']);
      }
    });
  }

obtenerProveedor(idProveedor: number): void {
  this.sProveedores.getProveedorById(idProveedor).subscribe({
    next: (proveedor: IProveedor) => {
      this.proveedorNombre = proveedor.nombreProveedor ?? 'Proveedor desconocido';
    },
    error: (err) => {
      console.error('Error al obtener proveedor:', err);
      this.proveedorNombre = 'Proveedor desconocido';
    }
  });
}

  confirmarEliminacion(): void {
    if (!confirm(`¿Confirmas que deseas eliminar la compra con folio #${this.compraId}?`)) return;

    this.sCompras.eliminarCompra(this.compraId).subscribe({
      next: () => {
        alert('Compra eliminada con éxito');
        this.router.navigate(['/catalogo-compras']);
      },
      error: (err) => {
        console.error('Error al eliminar compra:', err);
        alert('No se pudo eliminar la compra');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/catalogo-compras']);
  }
}
