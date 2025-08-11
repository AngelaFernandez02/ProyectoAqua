import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SProveedores } from '../../../../../service/service-proveedores/proveedores';
import { IProveedor } from '../../../../../interface/proveedores';

@Component({
  selector: 'app-agregar-proveedores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './agregar-proveedores.html',
  styleUrl: './agregar-proveedores.css'
})

export class AgregarProveedores implements OnInit {
  
  proveedorForm!: FormGroup;

  constructor(  
  private fb: FormBuilder,
  private router: Router,
  private sProveedores: SProveedores
  ) {}

  ngOnInit(): void {
    this.proveedorForm = this.fb.group({
      nombreProveedor: ['', Validators.required],
      contactoProveedor: ['', Validators.required],
      tbInsumos: this.fb.array([])
    });

    // Inicializar con un insumo vacío por ejemplo
    this.agregarInsumo();
  }

  get tbInsumos(): FormArray {
    return this.proveedorForm.get('tbInsumos') as FormArray;
  }

  nuevoInsumo(): FormGroup {
  return this.fb.group({
    nombreInsumo: ['', Validators.required],
    existencias: [0, [Validators.required, Validators.min(0)]],
    costoPromedio: [0, [Validators.required, Validators.min(0)]],
    unidad: ['', Validators.required]
  });
}


  agregarInsumo(): void {
    this.tbInsumos.push(this.nuevoInsumo());
  }

  eliminarInsumo(index: number): void {
    this.tbInsumos.removeAt(index);
  }
  onSubmit(): void {
    if (this.proveedorForm.valid) {
      const proveedor = this.proveedorForm.value;
      this.sProveedores.agregarProveedor(proveedor).subscribe({
        next: () => {
          alert('Proveedor agregado con insumos y productos correctamente');
          this.router.navigate(['/catalogo-proveedores']);
        },
        error: () => alert('Error al agregar proveedor')
      });
    } else {
      alert('Formulario inválido');
    }
  }

  goBack(): void {
    this.router.navigate(['/catalogo-proveedores']);
  }
}
