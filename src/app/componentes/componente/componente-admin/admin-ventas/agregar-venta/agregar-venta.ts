import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../../../../service/service-cliente/service-cliente';
import { SProducto } from '../../../../../service/service-producto/productos';
import { ServiceVenta } from '../../../../../service/service-venta/service-venta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-venta',
  templateUrl: './agregar-venta.html',
  styleUrls: ['./agregar-venta.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AgregarVenta implements OnInit {
  ventaForm!: FormGroup;
  pagoForm!: FormGroup;
  clientes: any[] = [];
  productos: any[] = [];
  modalAbierto = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clienteService: ClienteService,
    private productoService: SProducto,
    private ventaService: ServiceVenta
  ) {}

  ngOnInit(): void {
    this.ventaForm = this.fb.group({
      idCliente: ['', Validators.required],
      fechaVenta: [new Date().toISOString().split('T')[0], Validators.required],
      detalles: this.fb.array([this.crearDetalle()])
    });

    this.pagoForm = this.fb.group({
      metodoPago: ['', Validators.required],
      montoEntregado: [''],
      numeroTarjeta: [''],
      titularTarjeta: [''],
      fechaExpiracion: [''],
      cvv: ['']
    });

    this.pagoForm.get('metodoPago')?.valueChanges.subscribe(metodo => {
      this.actualizarValidacionesMetodo(metodo);
    });

    this.cargarClientes();
    this.cargarProductos();
  }

  crearDetalle(): FormGroup {
    return this.fb.group({
      idProducto: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precioUnitario: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  get detalles(): FormArray {
    return this.ventaForm.get('detalles') as FormArray;
  }

  cargarClientes(): void {
    this.clienteService.getList().subscribe({
      next: data => this.clientes = data,
      error: err => console.error('Error al cargar clientes:', err)
    });
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: data => this.productos = data,
      error: err => console.error('Error al cargar productos:', err)
    });
  }

  agregarDetalle(): void {
    this.detalles.push(this.crearDetalle());
  }

  eliminarDetalle(index: number): void {
    this.detalles.removeAt(index);
  }

  onProductoChange(event: Event, index: number): void {
    const target = event.target as HTMLSelectElement;
    const idProducto = target.value;

    const detalle = this.detalles.at(index);
    const productoSeleccionado = this.productos.find(p => p.idProducto.toString() === idProducto);

    if (productoSeleccionado) {
      detalle.get('precioUnitario')?.setValue(productoSeleccionado.precioUnitario || productoSeleccionado.precio || 0);
    } else {
      detalle.get('precioUnitario')?.setValue(null);
    }
  }

  actualizarValidacionesMetodo(metodo: string) {
    if (metodo === 'efectivo') {
      this.pagoForm.get('montoEntregado')?.setValidators([Validators.required, Validators.min(0.01)]);
      ['numeroTarjeta', 'titularTarjeta', 'fechaExpiracion', 'cvv'].forEach(campo => {
        this.pagoForm.get(campo)?.clearValidators();
        this.pagoForm.get(campo)?.setValue('');
      });
    } else if (metodo === 'tarjeta') {
      this.pagoForm.get('montoEntregado')?.clearValidators();
      this.pagoForm.get('montoEntregado')?.setValue('');
      this.pagoForm.get('numeroTarjeta')?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
      this.pagoForm.get('titularTarjeta')?.setValidators([Validators.required]);
      this.pagoForm.get('fechaExpiracion')?.setValidators([Validators.required]);
      this.pagoForm.get('cvv')?.setValidators([Validators.required, Validators.pattern(/^\d{3}$/)]);
    } else {
      this.pagoForm.get('montoEntregado')?.clearValidators();
      ['numeroTarjeta', 'titularTarjeta', 'fechaExpiracion', 'cvv'].forEach(campo => {
        this.pagoForm.get(campo)?.clearValidators();
      });
    }

    ['montoEntregado', 'numeroTarjeta', 'titularTarjeta', 'fechaExpiracion', 'cvv'].forEach(campo => {
      this.pagoForm.get(campo)?.updateValueAndValidity();
    });
  }

  onMetodoPagoChange(): void {
    const metodo = this.pagoForm.get('metodoPago')?.value;
    this.actualizarValidacionesMetodo(metodo);
  }

  onSubmit(): void {
    if (this.ventaForm.invalid) {
      this.ventaForm.markAllAsTouched();
      return;
    }
    this.abrirModalMetodoPago();
  }

  abrirModalMetodoPago() {
    this.pagoForm.reset();
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  confirmarPago() {
    if (this.pagoForm.invalid) {
      this.pagoForm.markAllAsTouched();
      return;
    }

    const metodoPago = this.pagoForm.get('metodoPago')?.value;
    const datosPago = this.pagoForm.value;

    const datosVenta = {
      ...this.ventaForm.value,
      metodoPagoSeleccionado: metodoPago,
      datosPago: datosPago
    };

    this.ventaService.registrarVenta(datosVenta).subscribe({
      next: () => {
        alert('Venta registrada correctamente');
        this.cerrarModal();
        this.router.navigate(['/admin/catalogo-venta']);
      },
      error: err => {
        console.error('Error al registrar venta:', err);
        alert('Ocurrió un error al registrar la venta');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/catalogo-venta']);
  }
}
