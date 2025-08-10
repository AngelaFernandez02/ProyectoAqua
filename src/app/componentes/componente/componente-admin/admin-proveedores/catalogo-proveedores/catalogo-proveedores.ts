import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';
import { SearchProveedoresComponent } from '../search-proveedores/search-proveedores';
import { MenuLateral } from "../../menu-lateral/menu-lateral";
import { Router, RouterModule } from '@angular/router';
import { SProveedores } from '../../../../../service/service-proveedores/proveedores';
import { IProveedor } from '../../../../../interface/proveedores';

@Component({
  selector: 'app-catalogo-proveedores',
  standalone: true,
  imports: [CurrencyPipe, NgFor, SearchProveedoresComponent, RouterModule,MenuLateral],
  templateUrl: './catalogo-proveedores.html',
  styleUrls: ['./catalogo-proveedores.css']
})
export class CatalogoProveedores implements OnInit {

  proveedores: IProveedor[] = [];
  filteredProveedores: IProveedor[] = [];

  constructor(
    private router: Router,
    private sProveedores: SProveedores
  ) {}

  ngOnInit(): void {
  this.sProveedores.getProveedores().subscribe({
    next: (data: any) => {
        console.log('Respuesta del API:', data);
  const valores = data?.$values || data; // Extrae $values si viene así
  this.proveedores = valores;
  this.filteredProveedores = [...valores];
},
    error: (error) => {
      console.error('Error al obtener proveedores:', error);
    }
  });
}

  cargarProveedores(): void {
    this.sProveedores.getProveedores().subscribe({
      next: (data) => {
        this.proveedores = data;
        this.filteredProveedores = [...data];
      },
      error: (err) => {
        console.error('Error al cargar proveedores', err);
      }
    });
  }

  onSearchChange(searchText: string): void {
    if (!searchText) {
      this.filteredProveedores = [...this.proveedores];
      return;
    }

    this.filteredProveedores = this.proveedores.filter(proveedor => 
      Object.values(proveedor).some(value =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }

  abrirAgregarProveedor(): void {
    this.router.navigate(['/proveedores/agregar-proveedor']);
  }

  abrirEditarProveedor(proveedor: IProveedor): void {
    this.router.navigate(['/proveedores/editar-proveedor', proveedor.idProveedor]);
  }

  abrirEliminarProveedor(proveedor: IProveedor): void {
    if (confirm(`¿Estás seguro de eliminar a ${proveedor.nombreProveedor}?`)) {
      this.router.navigate(['/proveedores/eliminar-proveedor', proveedor.idProveedor]);
    }
  }

  abrirDetallesProveedor(proveedor: IProveedor): void {
    this.router.navigate(['/detalle-proveedor', proveedor.idProveedor]);
  }

  trackProveedor(index: number, proveedor: IProveedor): number {
    return proveedor.idProveedor;
  }

 

}
