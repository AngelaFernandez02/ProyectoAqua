import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MenuLateral } from '../../menu-lateral/menu-lateral';

import { IProveedor } from '../../../../../interface/proveedores';
import { SearchMateriaprima } from "../search-materiaprima/search-materiaprima";
import { IInsumo } from '../../../../../interface/insumos';
import { SInsumo } from '../../../../../service/service-insumo/insumo';

@Component({
  selector: 'app-catalogo-materia-prima',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MenuLateral,
    SearchMateriaprima
],
  templateUrl: './catalogo-materiaprima.html',
  styleUrls: ['./catalogo-materiaprima.css']
})
export class CatalogoMateriaPrima implements OnInit {

  insumos: IInsumo[] = [];
    filteredInsumos: IInsumo[] = [];
  
    proveedores: IProveedor[] = [];  // lista de proveedores
  
    constructor(
      private router: Router,
      private SImo: SInsumo
    ) {}
  
    ngOnInit(): void {
      this.cargarProveedores();
      this.cargarInsumos();
    }
  
    cargarProveedores(): void {
      this.SImo.getProveedores().subscribe({
        next: (data: any) => {
          this.proveedores = data?.$values || data;
        },
        error: (err) => console.error('Error cargando proveedores', err)
      });
    }
  
    cargarInsumos(): void {
      this.SImo.getInsumos().subscribe({
        next: (data: any) => {
          console.log('Respuesta del API:', data);
          const valores = data?.$values || data;
          this.insumos = valores;
          this.filteredInsumos = [...valores];
        },
        error: (error) => {
          console.error('Error al obtener compras:', error);
        }
      });
    }
  
    onSearchChange(searchText: string): void {
      if (!searchText) {
        this.filteredInsumos = [...this.insumos];
        return;
      }
  
      this.filteredInsumos = this.insumos.filter(insumos =>
        Object.values(insumos).some(value =>
          String(value).toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  
    abrirAgregarInsumo(): void {
      this.router.navigate(['/agregar-materiaprima']);
    }
  
    abrirEditarInsumo(insumo: IInsumo): void {
      this.router.navigate(['editar-materiaprima', insumo.idInsumo]);
    }
  
    abrirEliminarInsumo(insumo: IInsumo): void {
      const proveedor = this.proveedores.find(p => p.idProveedor === insumo.idProveedor);
      const nombreProv = proveedor ? proveedor.nombreProveedor : 'este proveedor';
  
      if (confirm(`¿Estás seguro de eliminar la compra del proveedor ${nombreProv}?`)) {
        this.router.navigate(['/eliminar-materiaprima', insumo.idInsumo]);
      }
    }
  
    abrirDetallesInsumo(insumo: IInsumo): void {
      this.router.navigate(['/detalle-materiaprima', insumo.idInsumo]);
    }
  
    trackInsumo(index: number, insumo: IInsumo): number {
      return insumo.idInsumo ?? index;
    }
  
    getNombreProveedor(idProveedor: number): string {
    const proveedor = this.proveedores.find(p => p.idProveedor === idProveedor);
    return proveedor?.nombreProveedor ?? 'Desconocido'; 
  
  }

}
