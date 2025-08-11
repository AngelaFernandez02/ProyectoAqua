import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, NgFor } from '@angular/common';
import { MenuLateral } from "../../menu-lateral/menu-lateral";
import { Router, RouterModule } from '@angular/router';
import { Compra } from '../../../../../interface/compra';
import { ServiceCompra } from '../../../../../service/service-compra/service-compra';
import { IProveedor } from '../../../../../interface/proveedores';

import { FormsModule } from '@angular/forms';
import { SearchCompras } from '../search-compras/search-compras';


@Component({
  selector: 'app-catalogo-compras',
  standalone: true,
 imports: [CurrencyPipe, RouterModule, MenuLateral, SearchCompras, CommonModule, FormsModule],
 templateUrl: './catalogo-compras.html',
  styleUrls: ['./catalogo-compras.css']
})
export class CatalogoCompras implements OnInit {

  compras: Compra[] = [];
  filteredCompras: Compra[] = [];

  proveedores: IProveedor[] = [];  // lista de proveedores

  constructor(
    private router: Router,
    private serviceCompra: ServiceCompra
  ) {}

  ngOnInit(): void {
    this.cargarProveedores();
    this.cargarCompras();
  }

  cargarProveedores(): void {
    this.serviceCompra.getProveedores().subscribe({
      next: (data: any) => {
        this.proveedores = data?.$values || data;
      },
      error: (err) => console.error('Error cargando proveedores', err)
    });
  }

  cargarCompras(): void {
    this.serviceCompra.getCompras().subscribe({
      next: (data: any) => {
        console.log('Respuesta del API:', data);
        const valores = data?.$values || data;
        this.compras = valores;
        this.filteredCompras = [...valores];
      },
      error: (error) => {
        console.error('Error al obtener compras:', error);
      }
    });
  }

  onSearchChange(searchText: string): void {
    if (!searchText) {
      this.filteredCompras = [...this.compras];
      return;
    }

    this.filteredCompras = this.compras.filter(compra =>
      Object.values(compra).some(value =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }

  abrirAgregarCompra(): void {
    this.router.navigate(['/compras/agregar-compra']);
  }

  abrirEditarCompra(compra: Compra): void {
    this.router.navigate(['/compras/editar-compra', compra.idCompra]);
  }

  abrirEliminarCompra(compra: Compra): void {
    const proveedor = this.proveedores.find(p => p.idProveedor === compra.idProveedor);
    const nombreProv = proveedor ? proveedor.nombreProveedor : 'este proveedor';

    if (confirm(`¿Estás seguro de eliminar la compra del proveedor ${nombreProv}?`)) {
      this.router.navigate(['/eliminar-compras', compra.idCompra]);
    }
  }

  abrirDetallesCompra(compra: Compra): void {
    this.router.navigate(['/detalle-compra', compra.idCompra]);
  }

  trackCompra(index: number, compra: Compra): number {
    return compra.idCompra ?? index;
  }

  getNombreProveedor(idProveedor: number): string {
  const proveedor = this.proveedores.find(p => p.idProveedor === idProveedor);
  return proveedor?.nombreProveedor ?? 'Desconocido'; 

}
}
