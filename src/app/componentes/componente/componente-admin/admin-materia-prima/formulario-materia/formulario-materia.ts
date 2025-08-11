import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { IProveedor } from '../../../../../interface/proveedores';
import { IInsumo } from '../../../../../interface/insumos'; // Ajusta ruta
import { SProveedores } from '../../../../../service/service-proveedores/proveedores'; // Servicio para proveedores
import { SInsumo } from '../../../../../service/service-insumo/insumo';
import { MenuLateral } from "../../menu-lateral/menu-lateral"; // Servicio para insumos
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-materia',
  templateUrl: './formulario-materia.html',
  styleUrls: ['./formulario-materia.css'],
  imports: [MenuLateral,CommonModule,FormsModule,ReactiveFormsModule]
})
export class FormularioMateria implements OnInit {

  insumoForm: FormGroup;
  proveedores: IProveedor[] = [];

  constructor(
    private fb: FormBuilder,
    private proveedoresService: SProveedores,
    private insumoService: SInsumo,
    private router: Router
  ) {
    this.insumoForm = this.fb.group({
      nombreInsumo: ['', Validators.required],
      idProveedor: [null, Validators.required],
      existencias: [0, [Validators.required, Validators.min(0)]],
      unidad: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores(): void {
    this.proveedoresService.getProveedores().subscribe({
      next: (data) => this.proveedores = data,
      error: (err) => console.error('Error cargando proveedores', err)
    });
  }

  onSubmit(): void {
    if (this.insumoForm.invalid) {
      this.insumoForm.markAllAsTouched();
      return;
    }

    const nuevoInsumo: IInsumo = {
      idInsumo: 0, 
      nombreInsumo: this.insumoForm.value.nombreInsumo,
      idProveedor: this.insumoForm.value.idProveedor,
      existencias: this.insumoForm.value.existencias,
      costoPromedio: 0,
      unidad: this.insumoForm.value.unidad,
      tbInsumoProductos: [] 
    };

    this.insumoService.registrarInsumo(nuevoInsumo).subscribe({
      next: () => {
        alert('Insumo registrado correctamente');
        this.insumoForm.reset();
        this.router.navigate(['/catalogo-materiaprima']); 
      },
      error: (err) => {
        console.error('Error al registrar insumo', err);
        alert('Error al registrar insumo');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/catalogo-materiaprima']); 
  }
}
