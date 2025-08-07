import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuLateral } from '../../menu-lateral/menu-lateral';
import { SProducto } from '../../../../../service/service-producto/productos';
import { SInsumo } from '../../../../../service/service-insumo/insumo';  // <- Importa el servicio insumo
import { IInsumo } from '../../../../../interface/insumos';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MenuLateral],
  templateUrl: './agregar-producto.html',
  styleUrls: ['./agregar-producto.css']
})
export class AgregarProducto implements OnInit {
  
  productoForm!: FormGroup;
  insumosRegistrados: IInsumo[] = []; // Aquí cargamos los insumos del backend

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sProducto: SProducto,
    private sInsumo: SInsumo  // <- Inyecta el servicio
  ) {}

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      nombreProducto: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      insumos: this.fb.array([])
    });

    // Obtener insumos registrados para autocompletar
    this.sInsumo.getInsumos().subscribe(data => {
      this.insumosRegistrados = data;
    });
  }

  get insumos(): FormArray {
    return this.productoForm.get('insumos') as FormArray;
  }

  agregarInsumo(): void {
    this.insumos.push(this.fb.group({
      nombreInsumo: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]]
    }));
  }

  eliminarInsumo(index: number): void {
    this.insumos.removeAt(index);
  }

  agregarProducto(): void {
    if (this.productoForm.valid) {
      const nuevoProducto = this.productoForm.value;
      this.sProducto.crearProducto(nuevoProducto).subscribe({
        next: () => {
          alert('Producto agregado exitosamente');
          this.router.navigate(['/catalogo-productos']);
        },
        error: (err) => {
          console.error('Error al agregar producto', err);
          alert('Error al agregar producto');
        }
      });
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
  volverAlCatalogo(): void {
  this.router.navigate(['/catalogo-productos']);
}
}
