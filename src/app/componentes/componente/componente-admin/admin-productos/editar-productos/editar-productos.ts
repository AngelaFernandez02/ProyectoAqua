import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SProducto } from '../../../../../service/service-producto/productos';
import { SInsumo } from '../../../../../service/service-insumo/insumo';
import { IInsumo } from '../../../../../interface/insumos';
import { IProducto } from '../../../../../interface/producto';


@Component({
  selector: 'app-editar-producto',
  standalone: true,
  templateUrl: './editar-productos.html',
  styleUrls: ['./editar-productos.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class EditarProductos implements OnInit {
  productoForm!: FormGroup;
  productoId!: number;
  insumosRegistrados: IInsumo[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sProducto: SProducto,
    private sInsumo: SInsumo
  ) {}

  ngOnInit(): void {
    // Inicializa el formulario
    this.productoForm = this.fb.group({
      nombreProducto: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      insumos: this.fb.array([]),
    });

    // Carga los insumos disponibles
    this.sInsumo.getInsumos().subscribe({
      next: (data) => (this.insumosRegistrados = data),
    });

    // Obtiene el id desde la ruta y carga los datos del producto
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));
    this.sProducto.getProductoById(this.productoId).subscribe({
      next: (producto) => this.cargarDatos(producto),
      error: () => alert('Error al cargar el producto'),
    });
  }

  get insumos(): FormArray {
    return this.productoForm.get('insumos') as FormArray;
  }

  agregarInsumo(insumo?: any): void {
    this.insumos.push(
      this.fb.group({
        idInsumo: [insumo?.idInsumoNavigation?.idInsumo ?? null],
        nombreInsumo: [insumo?.nombreInsumo || '', Validators.required],
        cantidad: [insumo?.cantidad ?? 1, [Validators.required, Validators.min(1)]],
        unidad: [insumo?.unidad || '', Validators.required], // Unidad con validación requerida
      })
    );
  }

  eliminarInsumo(index: number): void {
    this.insumos.removeAt(index);
  }

  cargarDatos(producto: any): void {
    this.productoForm.patchValue({
      nombreProducto: producto.nombreProducto,
      descripcion: producto.descripcion,
      precio: producto.precio,
    });

    // Limpiar insumos antes de cargar nuevos
    this.insumos.clear();

    // Cargar insumos
    if (producto.tbInsumoProductos?.length > 0) {
      producto.tbInsumoProductos.forEach((i: any) => {
        this.agregarInsumo({
          idInsumoNavigation: { idInsumo: i.idInsumo }, // Para que se pase el id correctamente
          nombreInsumo: i.idInsumoNavigation?.nombreInsumo || '',
          cantidad: i.cantidad,
          unidad: i.unidad || '', // Asegura unidad no vacía
        });
      });
    }
  }

  actualizarProducto(): void {
  this.productoForm.markAllAsTouched();
  if (this.productoForm.invalid) {
    alert('Completa todos los campos requeridos');
    return;
  }

  const formValue = this.productoForm.value;

  const tbInsumoProductos = formValue.insumos.map((insumo: any) => {
    const insumoEncontrado = this.insumosRegistrados.find(
      i => i.nombreInsumo?.toLowerCase() === insumo.nombreInsumo.toLowerCase()
    );

    return {
      idInsumo: insumoEncontrado?.idInsumo ?? insumo.idInsumo ?? null,
      cantidad: insumo.cantidad,
      unidad: insumo.unidad
    };
  });

  // Omitida la validación de insumosInvalidos para permitir guardar sin idInsumo válido

  const productoActualizado = {
    idProducto: this.productoId,
    nombreProducto: formValue.nombreProducto,
    descripcion: formValue.descripcion,
    precio: formValue.precio,
    imagen: '', // o la que uses
    tbInsumoProductos
  };

  this.sProducto.actualizarProducto(this.productoId, productoActualizado).subscribe({
    next: () => {
      alert('Producto actualizado correctamente');
      this.router.navigate(['/catalogo-productos']);
    },
    error: (err) => {
      console.error(err);
      alert('Error al actualizar el producto');
    }
  });
}
}
