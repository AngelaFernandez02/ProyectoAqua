import { Component, OnInit } from '@angular/core';
import { IInsumo } from '../../../../../interface/insumos';
import { SInsumo } from '../../../../../service/service-insumo/insumo';
import { ActivatedRoute, Router } from '@angular/router';
import { SProveedores } from '../../../../../service/service-proveedores/proveedores';
import { IProveedor } from '../../../../../interface/proveedores';

@Component({
  selector: 'app-eliminar-materiaprima',
  templateUrl: './eliminar-materiaprima.html',
  styleUrls: ['./eliminar-materiaprima.css']
})
export class EliminarMateriaprima implements OnInit {

  insumoId!: number;
  insumo: IInsumo | null = null;
  proveedorNombre: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sInsumo: SInsumo,
    private sProveedores: SProveedores
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.insumoId = +idParam;
      this.obtenerInsumo();
    } else {
      alert('ID de insumo no válido');
      this.router.navigate(['/catalogo-materiaprima']);
    }
  }

  obtenerInsumo(): void {
    this.sInsumo.ObtenerInsumoPorId(this.insumoId).subscribe({
      next: (data) => {
        this.insumo = data;
        if (this.insumo?.idProveedor) {
          this.obtenerProveedor(this.insumo.idProveedor);
        }
      },
      error: (err) => {
        console.error('Error al obtener insumo:', err);
        alert('Error al cargar los datos del insumo');
        this.router.navigate(['/catalogo-materiaprima']);
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
    if (!confirm(`¿Confirmas que deseas eliminar el insumo con ID #${this.insumoId}?`)) return;

    this.sInsumo.eliminarInsumos(this.insumoId).subscribe({
      next: () => {
        alert('Insumo eliminado con éxito');
        this.router.navigate(['/catalogo-materiaprima']);
      },
      error: (err) => {
        console.error('Error al eliminar insumo:', err);
        alert('No se pudo eliminar el insumo');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/catalogo-materiaprima']);
  }
}
