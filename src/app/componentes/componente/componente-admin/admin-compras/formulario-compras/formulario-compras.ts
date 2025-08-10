import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuLateral } from '../../menu-lateral/menu-lateral';
import { ServiceCompra } from '../../../../../service/service-compra/service-compra';
import { Compra } from '../../../../../interface/compra';
import { DetalleCompra } from '../../../../../interface/DetalleCompra';
import { IInsumo } from '../../../../../interface/insumos';
import { IProveedor } from '../../../../../interface/proveedores';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';




@Component({
  selector: 'app-formulario-compras',
  imports: [MenuLateral,ReactiveFormsModule,CommonModule],
  templateUrl: './formulario-compras.html',
  styleUrl: './formulario-compras.css'
})
export class FormularioCompras implements OnInit {
  compraForm: FormGroup;
  proveedores: IProveedor[] = [];
  insumos: IInsumo[] = [];

  constructor(
    private fb: FormBuilder,
    private serviceCompra: ServiceCompra,
    private router: Router,
  ) {
    this.compraForm = this.fb.group({
      idProveedor: ['', Validators.required],
      fechaCompra: [new Date().toISOString().substring(0, 10), Validators.required],
      detalles: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.cargarProveedores();
    this.cargarInsumos();
    this.agregarDetalle(); // Inicia con un detalle vacío
  }

  get detalles(): FormArray {
    return this.compraForm.get('detalles') as FormArray;
  }

  agregarDetalle(): void {
    const detalleFG = this.fb.group({
      idInsumo: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(0.01)]],
      precioUnitario: [0, [Validators.required, Validators.min(0.01)]]
    });
    this.detalles.push(detalleFG);
  }

  eliminarDetalle(index: number): void {
    this.detalles.removeAt(index);
  }

  cargarProveedores(): void {
    this.serviceCompra.getProveedores().subscribe({
      next: (data) => this.proveedores = data,
      error: (err) => console.error('Error cargando proveedores', err)
    });
  }

  cargarInsumos(): void {
    this.serviceCompra.getInsumos().subscribe({
      next: (data) => this.insumos = data,
      error: (err) => console.error('Error cargando insumos', err)
    });
  }

  onSubmit(): void {
    if (this.compraForm.invalid) {
      this.compraForm.markAllAsTouched();
      return;
    }

    const compra: Compra = {
      idProveedor: this.compraForm.value.idProveedor,
      fechaCompra: new Date(this.compraForm.value.fechaCompra),
      detalles: this.compraForm.value.detalles.map((d: any) => ({
        idInsumo: d.idInsumo,
        cantidad: d.cantidad,
        precioUnitario: d.precioUnitario
      })) as DetalleCompra[]
    };

    this.serviceCompra.registrarCompra(compra).subscribe({
      next: (res) => {
        alert('Compra registrada correctamente');
        this.compraForm.reset();
        this.detalles.clear();
        this.agregarDetalle();
      },
      error: (err) => {
        console.error('Error al registrar compra', err);
        alert('Error al registrar compra');
      }
    });
  }

 goBack(): void {
    this.router.navigate(['/catalogo-compras']);
  }
}

