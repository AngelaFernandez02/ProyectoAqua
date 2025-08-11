import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor, DatePipe, CommonModule } from '@angular/common';
import { MenuLateral } from "../../menu-lateral/menu-lateral";
import { Router, RouterModule } from '@angular/router';
import { Venta } from '../../../../../interface/Venta';
import { ServiceVenta } from '../../../../../service/service-venta/service-venta';
import { SearchVenta } from "../search-venta/search-venta";
import { ClienteService } from '../../../../../service/service-cliente/service-cliente';
import { SProducto } from '../../../../../service/service-producto/productos';
import { DetalleVenta } from '../../../../../interface/DetalleVenta';

@Component({
  selector: 'app-catalogo-ventas',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NgFor, RouterModule, MenuLateral,CommonModule, SearchVenta],
  templateUrl: './catalogo-venta.html',
  styleUrls: ['./catalogo-venta.css']
})
export class CatalogoVenta implements OnInit {
  ventas: (Venta & { clienteNombre?: string })[] = [];
  filteredVentas: (Venta & { clienteNombre?: string })[] = [];
  ventaSeleccionada: Venta | null = null;

  constructor(
    private router: Router,
    private sVentas: ServiceVenta,
    private clienteService: ClienteService,
    private productoService: SProducto
  ) {}

  ngOnInit(): void {
    this.cargarVentas();
  }

  cargarVentas(): void {
    this.sVentas.obtenerVentas().subscribe({
      next: (data: any) => {
        const valores = data?.$values || data;
        this.ventas = valores;

        this.ventas.forEach(venta => {
          if (venta.idCliente) {
            this.clienteService.getById(venta.idCliente).subscribe({
              next: (cliente) => venta.clienteNombre = cliente.nombreContacto,
              error: () => venta.clienteNombre = 'Desconocido'
            });
          } else {
            venta.clienteNombre = 'Sin cliente';
          }
        });

        this.filteredVentas = [...this.ventas];
      },
      error: (error) => console.error('Error al obtener ventas:', error)
    });
  }

  onSearchChange(searchText: string): void {
    if (!searchText) {
      this.filteredVentas = [...this.ventas];
      return;
    }

    const lowerSearch = searchText.toLowerCase();
    this.filteredVentas = this.ventas.filter(venta => 
      (venta.clienteNombre && venta.clienteNombre.toLowerCase().includes(lowerSearch)) ||
      Object.values(venta).some(value =>
        String(value).toLowerCase().includes(lowerSearch)
      ) ||
      (venta.detalles && venta.detalles.some(detalle => 
        Object.values(detalle).some(v => String(v).toLowerCase().includes(lowerSearch))
      ))
    );
  }

  abrirDetallesVenta(venta: Venta & { clienteNombre?: string }): void {
    this.ventaSeleccionada = venta;

    if (this.ventaSeleccionada?.detalles) {
      this.ventaSeleccionada.detalles.forEach(detalle => {
        this.productoService.getProductoById(detalle.idProducto).subscribe({
          next: producto => (detalle as any).nombreProducto = producto.nombreProducto,
          error: () => (detalle as any).nombreProducto = 'N/D'
        });
      });
    }
  }

  abrirAgregarVenta(): void {
    this.router.navigate(['agregar-venta']);
  }

  abrirEliminarVenta(venta: Venta): void {
    if (confirm(`¿Estás seguro de eliminar la venta #${venta.idVenta}?`)) {
      this.router.navigate(['eliminar-venta', venta.idVenta]);
    }
  }

  trackVenta(index: number, venta: Venta): number {
    return venta.idVenta!;
  }

  getNombreProducto(detalle: DetalleVenta): string {
    // @ts-ignore
    return (detalle as any).nombreProducto || 'N/D';
  }

descargarPdfVenta(venta: Venta): void {
  this.sVentas.descargarReportePdf(venta.idVenta!).subscribe({
    next: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `venta_${venta.idVenta}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    error: (err) => {
      console.error('Error al descargar PDF:', err);
      alert('No se pudo descargar el reporte PDF');
    }
  });
}

}
