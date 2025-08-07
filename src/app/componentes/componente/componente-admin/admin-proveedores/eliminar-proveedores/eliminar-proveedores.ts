import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SProveedores } from '../../../../../service/service-proveedores/proveedores';
import { IProveedor } from '../../../../../interface/proveedores';
@Component({
  selector: 'app-eliminar-proveedores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar-proveedores.html',
  styleUrls: ['./eliminar-proveedores.css']
})
export class EliminarProveedores implements OnInit {
  proveedorId!: number;
  proveedor: IProveedor | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sProveedores: SProveedores
  ) {}

  ngOnInit(): void {
    this.proveedorId = +this.route.snapshot.paramMap.get('id')!;
    this.obtenerProveedor();
  }

  obtenerProveedor(): void {
    this.sProveedores.getProveedorById(this.proveedorId).subscribe({
      next: (data) => this.proveedor = data,
      error: (err) => {
        console.error('Error al obtener proveedor:', err);
        alert('Error al cargar los datos del proveedor');
        this.router.navigate(['/catalogo-proveedores']);
      }
    });
  }

  confirmarEliminacion(): void {
    if (!confirm('¿Confirmas que deseas eliminar este proveedor?')) return;

    this.sProveedores.eliminarProveedor(this.proveedorId).subscribe({
      next: () => {
        alert('Proveedor eliminado con éxito');
        this.router.navigate(['/catalogo-proveedores']);
      },
      error: (err) => {
        console.error('Error al eliminar proveedor:', err);
        alert('No se pudo eliminar el proveedor');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/catalogo-proveedores']);
  }
  cancelar(): void {
    this.router.navigate(['/catalogo-proveedores']);
  }
}