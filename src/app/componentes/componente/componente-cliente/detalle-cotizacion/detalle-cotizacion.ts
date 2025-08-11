import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { MenuLateral } from "../../componente-admin/menu-lateral/menu-lateral";
import { SCotizacion } from '../../../../service/service-cotizacion/cotizacion';
import { IProducto } from '../../../../interface/producto';
import { IInsumoProducto } from '../../../../interface/insumosProducto';
import { ICotizacionDetalle } from '../../../../interface/cotizaciondetalle';
import { ICotizacion } from '../../../../interface/cotizacion';
import { IInsumo } from '../../../../interface/insumos';

@Component({
  selector: 'app-detalle-cotizacion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MenuLateral],
  templateUrl: './detalle-cotizacion.html',
  styleUrls: ['./detalle-cotizacion.css']
})
export class DetalleCotizacion implements OnInit {

  cotizacion?: ICotizacion | null = null;
  cotizacionId!: number;
  cotizacionForm!: FormGroup;
  cargando = true;
  error = '';

  productosDisponibles: IProducto[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private SCotizacion: SCotizacion
  ) {}

  ngOnInit(): void {
    this.cotizacionId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.cotizacionId) {
      this.error = 'ID de cotización inválido.';
      this.cargando = false;
      return;
    }

    this.initForm();
    this.cargarProductosDisponibles();
    this.cargarCotizacion();
  }

  private initForm() {
    this.cotizacionForm = this.fb.group({
      numeroCotizacion: [''],
      fechaCotizacion: [''],
      fechaVencimiento: ['', Validators.required],
      estado: ['Pendiente', Validators.required],
      nombreCliente: [''],
      emailCliente: [''],
      telefonoCliente: [''],
      observaciones: [''],
      detalles: this.fb.array([])
    });
  }

  get detalles(): FormArray {
    return this.cotizacionForm.get('detalles') as FormArray;
  }

  cargarProductosDisponibles(): void {
    // TODO: cargar productos reales desde servicio
    this.productosDisponibles = [];
  }

  cargarCotizacion(): void {
    this.SCotizacion.getCotizacionByIdWithDetails(this.cotizacionId).subscribe({
      next: (data) => {
        this.cargando = false;
        this.cotizacion = data;

        this.cotizacionForm.patchValue({
          numeroCotizacion: data.numeroCotizacion,
          fechaCotizacion: data.fechaCotizacion,
          fechaVencimiento: data.fechaVencimiento,
          estado: data.estado,
          nombreCliente: data.nombreCliente,
          emailCliente: data.emailCliente,
          telefonoCliente: data.telefonoCliente,
          observaciones: data.observaciones
        });

        this.detalles.clear();
        data.detalles?.forEach(detalle => {
          this.detalles.push(this.crearDetalleFormGroup(detalle));
        });
      },
      error: () => {
        this.error = 'Error al cargar la cotización.';
        this.cargando = false;
      }
    });
  }

  crearDetalleFormGroup(detalle?: ICotizacionDetalle): FormGroup {
    // Asegurar que insumos sea del tipo correcto según la interfaz ICotizacionDetalle
    const insumos: IInsumo[] = Array.isArray(detalle?.insumos) 
      ? detalle.insumos.filter(insumo => insumo && typeof insumo === 'object')
      : [];
    
    return this.fb.group({
      idCotizacionDetalle: [detalle?.idCotizacionDetalle ?? null],
      idProducto: [detalle?.idProducto ?? null, Validators.required],
      cantidad: [detalle?.cantidad ?? 1, [Validators.required, Validators.min(1)]],
      precioUnitario: [detalle?.precioUnitario ?? 0, [Validators.required, Validators.min(0)]],
      subtotal: [{ value: detalle?.subtotal ?? 0, disabled: true }],
      descripcion: [detalle?.descripcion ?? ''],
      insumos: this.fb.array(
        insumos.map(insumo =>
          this.fb.group({
            idInsumo: [insumo.idInsumo ?? null],
            nombreInsumo: [insumo.nombreInsumo ?? '', Validators.required],
            cantidad: [1, [Validators.required, Validators.min(1)]], // Valor por defecto
            unidad: [insumo.unidad ?? '', Validators.required]
          })
        )
      )
    });
  }

  getInsumos(detalleIndex: number): FormArray {
    return this.detalles.at(detalleIndex).get('insumos') as FormArray;
  }

  agregarDetalle(): void {
    this.detalles.push(this.crearDetalleFormGroup());
  }

  eliminarDetalle(index: number): void {
    this.detalles.removeAt(index);
  }

  agregarInsumo(detalleIndex: number): void {
    this.getInsumos(detalleIndex).push(this.fb.group({
      idInsumo: [null],
      nombreInsumo: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      unidad: ['', Validators.required]
    }));
  }

  eliminarInsumo(detalleIndex: number, insumoIndex: number): void {
    this.getInsumos(detalleIndex).removeAt(insumoIndex);
  }

  calcularSubtotal(): number {
    return this.detalles.controls.reduce((acc, detalleCtrl) => {
      const cantidad = detalleCtrl.get('cantidad')?.value || 0;
      const precio = detalleCtrl.get('precioUnitario')?.value || 0;
      return acc + (cantidad * precio);
    }, 0);
  }

  calcularIVA(): number {
    return this.calcularSubtotal() * 0.16;
  }

  calcularTotal(): number {
    return this.calcularSubtotal() + this.calcularIVA();
  }

  guardarCambios(): void {
    if (this.cotizacionForm.invalid) {
      this.cotizacionForm.markAllAsTouched();
      alert('Completa todos los campos requeridos.');
      return;
    }

    const formValue = this.cotizacionForm.getRawValue();
    const subtotal = this.calcularSubtotal();
    const iva = this.calcularIVA();
    const total = this.calcularTotal();

    const cotizacionActualizada: ICotizacion = {
      idCotizacion: this.cotizacionId, // Asegurar que siempre sea un número
      fechaCotizacion: this.cotizacion?.fechaCotizacion || new Date().toISOString(), // Asegurar que tenga valor
      subtotal: subtotal, // Agregar subtotal calculado
      iva: iva, // Agregar IVA calculado
      total: total, // Agregar total calculado
      ...(this.cotizacion ?? {}),
      fechaVencimiento: formValue.fechaVencimiento,
      estado: formValue.estado,
      nombreCliente: formValue.nombreCliente,
      emailCliente: formValue.emailCliente,
      telefonoCliente: formValue.telefonoCliente,
      observaciones: formValue.observaciones,
      detalles: formValue.detalles.map((d: any) => ({
        idCotizacionDetalle: d.idCotizacionDetalle,
        idProducto: d.idProducto,
        cantidad: d.cantidad,
        precioUnitario: d.precioUnitario,
        subtotal: d.cantidad * d.precioUnitario,
        descripcion: d.descripcion,
        insumos: d.insumos ?? []
      }))
    };

    this.SCotizacion.actualizarCotizacion(this.cotizacionId, cotizacionActualizada).subscribe({
      next: () => {
        alert('Cotización actualizada correctamente.');
        this.router.navigate(['/cotizacion']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar la cotización.');
      }
    });
  }

  volverListado(): void {
    this.router.navigate(['/cotizacion']);
  }
}
