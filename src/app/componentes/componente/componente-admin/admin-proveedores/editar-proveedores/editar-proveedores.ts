import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SProveedores } from '../../../../../service/service-proveedores/proveedores';
import { IProveedor } from '../../../../../interface/proveedores';
import { IInsumo } from '../../../../../interface/insumos';
import { MenuLateral } from "../../menu-lateral/menu-lateral";

@Component({
  selector: 'app-editar-proveedores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MenuLateral],
  templateUrl: './editar-proveedores.html',
  styleUrls: ['./editar-proveedores.css']
})
export class EditarProveedores implements OnInit {
  proveedorForm!: FormGroup;
  proveedorId!: number;
  proveedor!: IProveedor | null;
  insumos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sProveedores: SProveedores, // Inyectamos el servicio
  ) {}

 ngOnInit(): void {

  const id = Number(this.route.snapshot.paramMap.get('id'));

  this.sProveedores.getProveedorById(id).subscribe({
    next: (data: any) => {  // usar any para evitar problemas temporales
      this.proveedor = data;

      this.insumos = Array.isArray(data.tbInsumos)
        ? data.tbInsumos
        : data.tbInsumos?.$values || [];
    },
    error: (error) => {
      console.error('Error al obtener proveedor:', error);
    }
  });
  
    this.proveedorId = +this.route.snapshot.paramMap.get('id')!;
    this.crearFormulario();

    this.sProveedores.getProveedorById(this.proveedorId).subscribe({
      next: (data) => {
        this.proveedor = data;
        this.proveedorForm.patchValue({
          idProveedor: data.idProveedor,
          nombre: data.nombreProveedor,
          contacto: data.contactoProveedor
        });
        this.insumos = data.tbInsumos || [];
      },
      error: () => {
        alert('No se pudo cargar el proveedor');
        this.router.navigate(['/proveedores']);
      }
    });
  }

  crearFormulario(): void {
    this.proveedorForm = this.fb.group({
      idProveedor: [{ value: '', disabled: true }],
      nombre: ['', Validators.required],
      contacto: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.proveedorForm.valid) {
      const proveedorActualizado = {
        idProveedor: this.proveedorId,
        nombreProveedor: this.proveedorForm.value.nombre,
        contactoProveedor: this.proveedorForm.value.contacto,
                tbInsumos: this.insumos // ✅ requerido por la interfaz
      };

      this.sProveedores.updateProveedor(this.proveedorId, proveedorActualizado).subscribe({
        next: () => {
          alert('Proveedor actualizado correctamente');
          this.router.navigate(['/catalogo-proveedores']);
        },
        error: () => alert('Error al actualizar el proveedor')
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/catalogo-proveedores']);
  }
}