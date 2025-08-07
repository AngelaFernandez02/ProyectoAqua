import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 👈 Importa esto
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-buscar-producto',
  imports: [FormsModule, CommonModule],
  templateUrl: './buscar-producto.html',
  styleUrl: './buscar-producto.css'
})
export class BuscarProducto {
filtroNombre: string = '';
  filtroPrecio: number | null = null;

  @Output() onFiltrar = new EventEmitter<{ nombre: string, precio: number | null }>();

  filtrar() {
    this.onFiltrar.emit({
      nombre: this.filtroNombre.toLowerCase(),
      precio: this.filtroPrecio
    });
  }
}
