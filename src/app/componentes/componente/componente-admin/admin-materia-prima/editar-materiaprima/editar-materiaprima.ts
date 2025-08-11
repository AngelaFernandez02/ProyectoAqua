import { Component, OnInit } from '@angular/core';
import { MenuLateral } from "../../menu-lateral/menu-lateral";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SProveedores } from '../../../../../service/service-proveedores/proveedores';
import { CommonModule } from '@angular/common';
import { SInsumo } from '../../../../../service/service-insumo/insumo';
import { IInsumo } from '../../../../../interface/insumos';

@Component({
  selector: 'app-editar-materiaprima',
  standalone: true,
  imports: [MenuLateral, CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './editar-materiaprima.html',
  styleUrls: ['./editar-materiaprima.css']
})
export class EditarMateriaprima implements OnInit {

  insumoForm!: FormGroup;
  proveedores: any[] = [];
  insumoId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sProveedores: SProveedores,
    private serviceInsumo: SInsumo,
  ) {}

  ngOnInit(): void {
    this.insumoId = Number(this.route.snapshot.paramMap.get('id'));
    this.crearFormulario();
    this.cargarProveedores();
    this.cargarInsumo(this.insumoId);
  }

  crearFormulario(): void {
    this.insumoForm = this.fb.group({
      nombre_insumo: ['', Validators.required],
      id_proveedor: ['', Validators.required],
      existencias: ['', [Validators.required, Validators.min(0)]],
      costo_promedio: [{ value: '', disabled: true }], // readonly
      unidad: ['', Validators.required]
    });
  }

  cargarProveedores(): void {
    this.sProveedores.getProveedores().subscribe({
      next: (data) => this.proveedores = data,
      error: (err) => console.error('Error cargando proveedores', err)
    });
  }

  cargarInsumo(id: number): void {
    this.serviceInsumo.ObtenerInsumoPorId(id).subscribe({
      next: (insumo) => {
        this.insumoForm.patchValue({
          nombre_insumo: insumo.nombreInsumo,
          id_proveedor: insumo.idProveedor,
          existencias: insumo.existencias,
          costo_promedio: insumo.costoPromedio,
          unidad: insumo.unidad
        });
      },
      error: () => {
        alert('Error al cargar el insumo');
        this.router.navigate(['/catalogo-materiaprima']);
      }
    });
  }

  onSubmit(): void {
  if (this.insumoForm.invalid) {
    this.insumoForm.markAllAsTouched();
    return;
  }

  const formValue = this.insumoForm.getRawValue();

  const insumoActualizado: IInsumo = {
    idInsumo: this.insumoId,
    nombreInsumo: formValue.nombre_insumo,
    idProveedor: formValue.id_proveedor,
    existencias: formValue.existencias,
    costoPromedio: formValue.costo_promedio,
    unidad: formValue.unidad,
    tbInsumoProductos: [] 
  };

  this.serviceInsumo.updateInsumo(this.insumoId, insumoActualizado).subscribe({
    next: () => {
      alert('Insumo actualizado correctamente');
      this.router.navigate(['/catalogo-materiaprima']);
    },
    error: (err) => {
      console.error('Error al actualizar insumo:', err);
      alert('Error al actualizar el insumo');
    }
  });
}


  goBack(): void {
    this.router.navigate(['/catalogo-materiaprima']);
  }
}
