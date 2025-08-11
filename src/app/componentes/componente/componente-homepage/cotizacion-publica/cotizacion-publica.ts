import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SCotizacion } from '../../../../service/service-cotizacion/cotizacion';
import { SProducto } from '../../../../service/service-producto/productos';
import { SInsumo } from '../../../../service/service-insumo/insumo';
import { 
  ICotizacionPublica, 
  IProductoConInsumos, 
  IInsumoDetalle,
  IInsumoProductoDetalle 
} from '../../../../interface/cotizacion-publica';
import { IProducto } from '../../../../interface/producto';
import { IInsumo } from '../../../../interface/insumos';
import { IInsumoProducto } from '../../../../interface/insumosProducto';

@Component({
  selector: 'app-cotizacion-publica',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cotizacion-publica.html',
  styleUrls: ['./cotizacion-publica.css']
})
export class CotizacionPublica implements OnInit {

  cotizacionForm!: FormGroup;
  paso: number = 1; // Control de pasos del formulario
  
  // Datos para el formulario
  productos: IProducto[] = [];
  productosSeleccionados: IProductoConInsumos[] = [];
  
  // Estados del componente
  cargando = false;
  enviando = false;
  error = '';
  cotizacionCreada = false;
  numeroCotizacion = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cotizacionService: SCotizacion,
    private productoService: SProducto,
    private insumoService: SInsumo
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  private initForm() {
    this.cotizacionForm = this.fb.group({
      // Datos del cliente
      nombreCliente: ['', [Validators.required, Validators.minLength(3)]],
      emailCliente: ['', [Validators.required, Validators.email]],
      telefonoCliente: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      observaciones: ['']
    });
  }

  cargarProductos(): void {
    this.cargando = true;
    
    // Usar endpoint público para productos
    this.productoService.getProductosPublicos().subscribe({
      next: (productos) => {
        this.productos = productos.map(p => ({
          ...p,
          precio: Number(p.precio)
        }));
        this.cargando = false;
      },
      error: (err) => {
        // Intentar fallback al endpoint privado si el público falla
        this.productoService.getProductos().subscribe({
          next: (productos) => {
            this.productos = productos.map(p => ({
              ...p,
              precio: Number(p.precio)
            }));
            this.cargando = false;
          },
          error: (fallbackErr) => {
            // Mostrar error específico al usuario
            if (err.status === 0) {
              this.error = 'Error de conexión con el servidor';
            } else if (err.status === 404) {
              this.error = 'Productos no disponibles temporalmente';
            } else if (err.status === 401 || err.status === 403) {
              this.error = 'Error de autorización';
            } else {
              this.error = 'Error al cargar productos';
            }
            
            this.cargando = false;
          }
        });
      }
    });
  }

  agregarProducto(producto: IProducto): void {
    // Verificar si ya está seleccionado
    const yaSeleccionado = this.productosSeleccionados.find(p => p.idProducto === producto.idProducto);
    if (yaSeleccionado) {
      yaSeleccionado.cantidadSeleccionada++;
      return;
    }

    // Crear nuevo producto con insumos
    const productoConInsumos: IProductoConInsumos = {
      idProducto: producto.idProducto,
      nombreProducto: producto.nombreProducto || '',
      descripcion: producto.descripcion,
      precio: Number(producto.precio || 0),
      cantidadSeleccionada: 1,
      precioPersonalizado: Number(producto.precio || 0),
      insumos: [],
      insumosPersonalizados: []
    };

    this.productosSeleccionados.push(productoConInsumos);
    this.cargarInsumosProducto(productoConInsumos);
  }

  private cargarInsumosProducto(producto: IProductoConInsumos): void {
    // Cargar insumos desde la API
    this.insumoService.getInsumosPublicos().subscribe({
      next: (insumos) => {
        // Simular que algunos insumos pertenecen a este producto
        const insumosProducto = insumos.slice(0, 3).map((insumo, index) => ({
          idInsumo: insumo.idInsumo,
          nombreInsumo: insumo.nombreInsumo || '',
          cantidadBase: 1 + index,
          costoPromedio: Number(insumo.costoPromedio || 10),
          unidad: insumo.unidad || 'unidad',
          cantidadPersonalizada: 1 + index,
          precioPersonalizado: Number(insumo.costoPromedio || 10)
        }));
        
        producto.insumos = insumosProducto;
        this.actualizarInsumosPersonalizados(producto);
      },
      error: (err) => {
        // Si no se pueden cargar insumos, continuar sin ellos
        producto.insumos = [];
        producto.insumosPersonalizados = [];
      }
    });
  }

  actualizarInsumosPersonalizados(producto: IProductoConInsumos): void {
    producto.insumosPersonalizados = producto.insumos.map(insumo => ({
      nombreInsumo: insumo.nombreInsumo,
      cantidad: insumo.cantidadPersonalizada || insumo.cantidadBase,
      precioUnitario: insumo.precioPersonalizado || insumo.costoPromedio,
      subtotal: (insumo.cantidadPersonalizada || insumo.cantidadBase) * 
                (insumo.precioPersonalizado || insumo.costoPromedio),
      unidad: insumo.unidad
    }));

    // Actualizar precio personalizado del producto
    producto.precioPersonalizado = producto.insumosPersonalizados.reduce(
      (total, insumo) => total + insumo.subtotal, 0
    );
  }

  eliminarProducto(index: number): void {
    this.productosSeleccionados.splice(index, 1);
  }

  actualizarCantidadInsumo(productoIndex: number, insumoIndex: number, nuevaCantidad: string): void {
    const producto = this.productosSeleccionados[productoIndex];
    if (producto.insumos[insumoIndex]) {
      producto.insumos[insumoIndex].cantidadPersonalizada = Number(nuevaCantidad);
      this.actualizarInsumosPersonalizados(producto);
    }
  }

  siguientePaso(): void {
    if (this.paso === 1 && this.cotizacionForm.valid) {
      this.paso = 2;
    } else if (this.paso === 2 && this.productosSeleccionados.length > 0) {
      this.paso = 3;
    }
  }

  pasoAnterior(): void {
    if (this.paso > 1) {
      this.paso--;
    }
  }

  calcularTotal(): number {
    return this.productosSeleccionados.reduce((total, producto) => 
      total + (producto.precioPersonalizado * producto.cantidadSeleccionada), 0
    );
  }

  calcularIVA(): number {
    return this.calcularTotal() * 0.16;
  }

  calcularTotalConIVA(): number {
    return this.calcularTotal() + this.calcularIVA();
  }

  enviarCotizacion(): void {
    if (this.cotizacionForm.invalid || this.productosSeleccionados.length === 0) {
      this.error = 'Por favor complete todos los campos requeridos y seleccione al menos un producto';
      return;
    }

    this.enviando = true;
    this.error = '';

    const cotizacionData: any = {
      NombreCliente: this.cotizacionForm.value.nombreCliente,
      EmailCliente: this.cotizacionForm.value.emailCliente,
      TelefonoCliente: this.cotizacionForm.value.telefonoCliente,
      Observaciones: this.cotizacionForm.value.observaciones,
      ValidezDias: 30,
      Items: this.productosSeleccionados.map(producto => ({
        IdProducto: producto.idProducto,
        Cantidad: producto.cantidadSeleccionada,
        PrecioUnitario: producto.precioPersonalizado,
        InsumosDetalle: producto.insumosPersonalizados.map(insumo => ({
          NombreInsumo: insumo.nombreInsumo,
          Cantidad: insumo.cantidad,
          PrecioUnitario: insumo.precioUnitario,
          Subtotal: insumo.subtotal,
          Unidad: insumo.unidad
        }))
      }))
    };

    this.cotizacionService.crearCotizacionPublica(cotizacionData).subscribe({
      next: (response) => {
        this.cotizacionCreada = true;
        this.numeroCotizacion = response.cotizacion.numeroCotizacion;
        this.enviando = false;
        this.paso = 4; // Paso de confirmación
      },
      error: (err) => {
        // Mostrar error específico
        if (err.status === 400) {
          this.error = `Error de validación: ${err.error?.message || 'Datos inválidos'}`;
        } else if (err.status === 500) {
          this.error = 'Error interno del servidor';
        } else {
          this.error = 'Error al procesar la cotización';
        }
        
        this.enviando = false;
      }
    });
  }

  nuevaCotizacion(): void {
    this.cotizacionForm.reset();
    this.productosSeleccionados = [];
    this.paso = 1;
    this.cotizacionCreada = false;
    this.numeroCotizacion = '';
    this.error = '';
  }

  volverInicio(): void {
    this.router.navigate(['/inicio']);
  }


}
