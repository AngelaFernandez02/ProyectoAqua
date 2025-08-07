import { Component, OnInit } from '@angular/core';
import { Venta } from '../../../../../interface/Venta';
import { DetalleVenta } from '../../../../../interface/DetalleVenta';
import { ServiceVenta } from '../../../../../service/service-venta/service-venta';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-ventas.html',
  styleUrls: ['./formulario-ventas.css']
})
export class FormularioVentas implements OnInit {

  ventas: Venta[] = [];
  nuevaVenta: Venta = { idCliente: null, detalles: [] };
  nuevoDetalle: DetalleVenta = { idProducto: 0, cantidad: 1, precioUnitario: 0 };

  constructor(private ventaService: ServiceVenta) {}

  ngOnInit() {
    this.cargarVentas();
  }

  cargarVentas() {
    this.ventaService.obtenerVentas().subscribe(data => {
      this.ventas = data;
    });
  }

  agregarDetalle() {
    if (this.nuevoDetalle.idProducto && this.nuevoDetalle.cantidad > 0 && this.nuevoDetalle.precioUnitario >= 0) {
      this.nuevaVenta.detalles.push({ ...this.nuevoDetalle });
      this.nuevoDetalle = { idProducto: 0, cantidad: 1, precioUnitario: 0 };
    }
  }

  eliminarDetalle(index: number) {
    this.nuevaVenta.detalles.splice(index, 1);
  }

 registrarVenta() {
  if (!this.nuevaVenta.detalles || this.nuevaVenta.detalles.length === 0) {
    alert('Debe agregar al menos un producto');
    return;
  }
  this.nuevaVenta.total = this.nuevaVenta.detalles.reduce((acc, d) =>
    acc + d.cantidad * d.precioUnitario, 0
  );

  this.ventaService.registrarVenta(this.nuevaVenta).subscribe(() => {
    alert('Venta registrada correctamente');
    this.nuevaVenta = { idCliente: null, detalles: [] };
    this.cargarVentas();
  }, error => {
    alert('Error al registrar venta');
  });
}

  eliminarVenta(idVenta: number) {
    if (confirm('¿Está seguro de eliminar esta venta?')) {
      this.ventaService.eliminarVenta(idVenta).subscribe(() => {
        alert('Venta eliminada');
        this.cargarVentas();
      });
    }
  }

}
