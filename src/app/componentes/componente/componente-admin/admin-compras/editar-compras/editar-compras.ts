import { Component, OnInit } from '@angular/core';
import { MenuLateral } from "../../menu-lateral/menu-lateral";
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCompra } from '../../../../../service/service-compra/service-compra';
import { SProveedores } from '../../../../../service/service-proveedores/proveedores';
import { SInsumo } from '../../../../../service/service-insumo/insumo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-compras',
  imports: [MenuLateral, CommonModule, ReactiveFormsModule],
templateUrl: './editar-compras.html',
  styleUrls: ['./editar-compras.css']
})
export class EditarCompras implements OnInit {

  compraForm!: FormGroup;
  proveedores: any[] = [];
  insumos: any[] = [];
  compraId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sProveedores: SProveedores,
    private sInsumo: SInsumo,
    private serviceCompra: ServiceCompra,
  ) {}

  ngOnInit(): void {
    this.compraId = Number(this.route.snapshot.paramMap.get('id'));
    this.crearFormulario();
    this.cargarProveedores();
    this.cargarInsumos();
    this.cargarCompra(this.compraId);
  }

  crearFormulario(): void {
    this.compraForm = this.fb.group({
      idProveedor: ['', Validators.required],
      fechaCompra: ['', Validators.required],
      detalles: this.fb.array([])
    });
  }

  get detalles(): FormArray {
    return this.compraForm.get('detalles') as FormArray;
  }

  agregarDetalle(detalle?: any): void {
    this.detalles.push(this.fb.group({
      idInsumo: [detalle ? detalle.idInsumo : '', Validators.required],
      cantidad: [detalle ? detalle.cantidad : '', [Validators.required, Validators.min(0.01)]],
      precioUnitario: [detalle ? detalle.precioUnitario : '', [Validators.required, Validators.min(0.01)]],
    }));
  }

  eliminarDetalle(index: number): void {
    this.detalles.removeAt(index);
  }

  cargarProveedores(): void {
    this.sProveedores.getProveedores().subscribe({
      next: (data) => this.proveedores = data,
      error: (err) => console.error('Error cargando proveedores', err)
    });
  }

  cargarInsumos(): void {
    this.sInsumo.getInsumos().subscribe({
      next: (data) => this.insumos = data,
      error: (err) => console.error('Error cargando insumos', err)
    });
  }

  cargarCompra(id: number): void {
    this.serviceCompra.getCompraById(id).subscribe({
      next: (compra) => {
        this.compraForm.patchValue({
          idProveedor: compra.idProveedor,
          fechaCompra: compra.fechaCompra,
        });

        // Limpiamos detalles actuales
        this.detalles.clear();

        // Agregamos detalles de la compra
        if (compra.detalles && compra.detalles.length > 0) {
          compra.detalles.forEach((det: any) => {
            this.agregarDetalle(det);
          });
        }
      },
      error: () => {
        alert('Error al cargar la compra');
        this.router.navigate(['/catalogo-compras']);
      }
    });
  }

  onSubmit(): void {
    if (this.compraForm.invalid) {
      this.compraForm.markAllAsTouched(); // para que se muestren errores
      return;
    }

    const compraActualizada = {
      idCompra: this.compraId,  
      idProveedor: this.compraForm.value.idProveedor,
      fechaCompra: this.compraForm.value.fechaCompra,
      detalles: this.compraForm.value.detalles
    };

    this.serviceCompra.updateCompra(this.compraId, compraActualizada).subscribe({
      next: () => {
        alert('Compra actualizada correctamente');
        this.router.navigate(['/catalogo-compras']);
      },
      error: (err) => {
        console.error('Error al actualizar compra:', err);
        alert('Error al actualizar la compra');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/catalogo-compras']);
  }
}
