import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ServiceVenta } from '../../../../../service/service-venta/service-venta';
import { ClienteService } from '../../../../../service/service-cliente/service-cliente';

import { Venta } from '../../../../../interface/Venta';
import { ICliente } from '../../../../../interface/cliente';

@Component({
  selector: 'app-eliminar-venta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar-venta.html',
  styleUrls: ['./eliminar-venta.css']
})
export class EliminarVenta implements OnInit {
  ventaId!: number;
  venta: Venta | null = null;
  cliente: ICliente | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceVenta: ServiceVenta,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.ventaId = +this.route.snapshot.paramMap.get('id')!;
    this.obtenerVenta();
  }

  obtenerVenta(): void {
    this.serviceVenta.getVentaById(this.ventaId).subscribe({
      next: (data) => {
        this.venta = data;
        if (this.venta?.idCliente) {
          this.obtenerCliente(this.venta.idCliente);
        }
      },
      error: (err) => {
        console.error('Error al obtener venta:', err);
        alert('Error al cargar los datos de la venta');
        this.router.navigate(['/admin/catalogo-venta']);
      }
    });
  }

  obtenerCliente(idCliente: number): void {
    this.clienteService.getById(idCliente).subscribe({
      next: (clienteData: ICliente) => {
        this.cliente = clienteData;
      },
      error: (err) => {
        console.error('Error al obtener cliente:', err);
        this.cliente = null;
      }
    });
  }

  confirmarEliminacion(): void {
    if (!confirm(`¿Confirmas que deseas eliminar la venta con folio #${this.ventaId}?`)) return;

    this.serviceVenta.eliminarVenta(this.ventaId).subscribe({
      next: () => {
        alert('Venta eliminada con éxito');
        this.router.navigate(['/admin/catalogo-venta']);
      },
      error: (err) => {
        console.error('Error al eliminar venta:', err);
        alert('No se pudo eliminar la venta');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/admin/catalogo-venta']);
  }
}
