import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Para ngModel en select múltiple
import { SProveedores } from '../../../../../service/service-proveedores/proveedores';
import { SInsumo } from '../../../../../service/service-insumo/insumo';
import { IProveedor } from '../../../../../interface/proveedores';
import { IInsumo } from '../../../../../interface/insumos';
import { MenuLateral } from "../../menu-lateral/menu-lateral";

export function existenciaValidaSegunUnidad(control: AbstractControl): ValidationErrors | null {
  if (!control || !control.parent) return null;

  const unidad = control.parent.get('unidad')?.value;
  const existencia = control.value;

  if (unidad && existencia != null) {
    const unidadesEnteras = ['pieza'];
    const unidadesDecimales = ['kilogramos', 'gramos', 'litros', 'ml', 'metros', 'centimetros'];

    const unidadLower = unidad.toLowerCase();

    if (unidadesEnteras.includes(unidadLower) && !Number.isInteger(existencia)) {
      return { noEsEntero: true };
    }
    
    if (
      unidadesDecimales.includes(unidadLower) &&
      (typeof existencia !== 'number' || isNaN(existencia) || existencia < 0)
    ) {
      return { decimalInvalido: true };
    }
  }

  return null;
}

@Component({
  selector: 'app-editar-proveedores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MenuLateral],
  templateUrl: './editar-proveedores.html',
  styleUrls: ['./editar-proveedores.css']
})
export class EditarProveedores implements OnInit {
  proveedorForm!: FormGroup;
  proveedorId!: number;
  proveedor!: IProveedor | null;

  idsInsumosAEliminar: number[] = [];

  insumosDisponibles: IInsumo[] = [];
  insumosSeleccionados: number[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sProveedores: SProveedores,
    private sInsumo: SInsumo
  ) {}

  ngOnInit(): void {
    this.proveedorId = +this.route.snapshot.paramMap.get('id')!;
    this.crearFormulario();
    this.cargarProveedor();
    this.cargarInsumosDisponibles();
    if (!this.proveedorForm.get('tbInsumos')) {
      this.proveedorForm.addControl('tbInsumos', this.fb.array([]));
    }
  }

  crearFormulario(): void {
    this.proveedorForm = this.fb.group({
      idProveedor: [{ value: '', disabled: true }],
      nombre: ['', Validators.required],
      contacto: ['', Validators.required],
      tbInsumos: this.fb.array([]),
      insumosSeleccionadosControl: [[]]  // <-- array vacío inicial para selección múltiple
    });
  }

  get tbInsumos(): FormArray {
    return this.proveedorForm.get('tbInsumos') as FormArray;
  }

  cargarProveedor() {
    this.sProveedores.getProveedorById(this.proveedorId).subscribe({
      next: (data) => {
        console.log('Proveedor cargado:', data);
        this.proveedor = data;

        this.proveedorForm.patchValue({
          idProveedor: data.idProveedor,
          nombre: data.nombreProveedor,
          contacto: data.contactoProveedor
        });

        this.tbInsumos.clear();

        (data.tbInsumos || []).forEach((insumo: any) => {
          this.tbInsumos.push(this.nuevoInsumo(insumo));
        });

        console.log('Insumos cargados en formulario:', this.tbInsumos.length);
      },
      error: () => {
        alert('No se pudo cargar el proveedor');
        this.router.navigate(['/proveedores']);
      }
    });
  }

  get insumosSinProveedor() {
    return this.insumosDisponibles.filter(i => i.idProveedor == null);
  }

  insumosSeleccionadosSet = new Set<number>();

  toggleInsumoSeleccionado(id: number, checked: boolean) {
    if (checked) {
      this.insumosSeleccionadosSet.add(id);
    } else {
      this.insumosSeleccionadosSet.delete(id);
    }
  }

  cargarInsumosDisponibles() {
  this.sInsumo.getInsumos().subscribe({
    next: (insumos) => {
      this.insumosDisponibles = insumos.map(insumo => ({
        ...insumo,
        CostoPromedio: insumo.CostoPromedio ?? insumo.costoPromedio ?? insumo.costo_Promedio ?? 0
      }));
    },
    error: () => {
      console.warn('No se pudieron cargar insumos disponibles');
    }
  });
}

  obtenerCostoPromedio(insumo: IInsumo): number {
  return insumo.costo_Promedio ?? insumo.costoPromedio ?? 0;
}


  get insumosDisponiblesFiltrados(): IInsumo[] {
  const asignadosIds = this.tbInsumos.controls
    .map(ctrl => ctrl.get('idInsumo')?.value)
    .filter(id => id != null);

  return this.insumosDisponibles.filter(insumo => 
    !asignadosIds.includes(insumo.idInsumo) && (insumo.idProveedor == null)
  );
}


  nuevoInsumo(insumo?: any): FormGroup {
    const group = this.fb.group({
    idInsumo: [insumo?.idInsumo || 0],
    nombreInsumo: [insumo?.nombreInsumo || '', Validators.required],
    existencias: [insumo?.existencias || 0, [Validators.required, existenciaValidaSegunUnidad]],
    costo_Promedio: [insumo?.costoPromedio ?? insumo?.costo_Promedio ?? 0, Validators.required],
    unidad: [insumo?.unidad || '', Validators.required]
    });

    // Ajuste automático para enteros si la unidad lo requiere
    group.get('existencias')?.valueChanges.subscribe(val => {
      const unidad = group.get('unidad')?.value;
      const unidadesEnteras = ['pieza'];
      if (unidadesEnteras.includes(unidad?.toLowerCase())) {
        if (val != null && val % 1 !== 0) {
          const entero = Math.floor(val);
          group.get('existencias')?.setValue(entero, { emitEvent: false });
        }
      }
    });

    return group;
  }

  soloNumerosYPunto(event: KeyboardEvent, unidad: string) {
    const tecla = event.key;
    const unidadesEnteras = ['pieza'];

    if (unidadesEnteras.includes(unidad.toLowerCase())) {
      if (tecla < '0' || tecla > '9') {
        event.preventDefault();
      }
    } else {
      const input = event.target as HTMLInputElement;
      if (tecla === '.') {
        if (input.value.includes('.')) {
          event.preventDefault();
        }
      } else if ((tecla < '0' || tecla > '9') && tecla !== 'Backspace' && tecla !== 'ArrowLeft' && tecla !== 'ArrowRight') {
        event.preventDefault();
      }
    }
  }

  agregarInsumo(): void {
    this.tbInsumos.push(this.nuevoInsumo());
  }

  eliminarInsumo(index: number): void {
    if (confirm('¿Seguro que deseas eliminar este insumo? Esta acción no se puede deshacer.')) {
      const insumoControl = this.tbInsumos.at(index);
      const idInsumo = insumoControl.get('idInsumo')?.value;

      if (idInsumo && idInsumo !== 0) {
        this.idsInsumosAEliminar.push(idInsumo);
      }

      this.tbInsumos.removeAt(index);
    }
  }

  agregarInsumosExistentes() {
    this.insumosSeleccionados.forEach(idInsumo => {
      const yaExiste = this.tbInsumos.controls.some(ctrl => ctrl.get('idInsumo')?.value === idInsumo);
      if (!yaExiste) {
        const insumo = this.insumosDisponiblesFiltrados.find((i: IInsumo) => i.idInsumo === idInsumo);
        if (insumo) {
          this.tbInsumos.push(this.nuevoInsumo(insumo));
        }
      }
    });
    this.insumosSeleccionados = []; // limpiar selección
  }

  contarNuevos(): number {
    return this.tbInsumos.controls.filter(c => c.get('idInsumo')?.value === 0).length;
  }

  onSubmit(): void {
  if (this.proveedorForm.valid) {
    // Obtienes el valor raw del formulario (incluye controles deshabilitados)
    const rawValue = this.proveedorForm.getRawValue();

    // Mapear el objeto principal
    const proveedorActualizado = {
      idProveedor: this.proveedorId, // o rawValue.idProveedor si lo tienes
      nombreProveedor: rawValue.nombre,
      contactoProveedor: rawValue.contacto,
      tbInsumos: rawValue.tbInsumos.map((insumo: any) => ({
        idInsumo: insumo.idInsumo,
        nombreInsumo: insumo.nombreInsumo,
        idProveedor: this.proveedorId,  // asigna el id del proveedor a cada insumo
        existencias: insumo.existencias,
        costoPromedio: insumo.costoPromedio ?? insumo.costo_Promedio ?? 0, // acomodar nombres distintos
        unidad: insumo.unidad
      }))
    };

    this.sProveedores.updateProveedor(this.proveedorId, proveedorActualizado).subscribe({
      next: () => {
        alert('Proveedor actualizado correctamente');
        this.router.navigate(['/catalogo-proveedores']);
      },
      error: () => alert('Error al actualizar el proveedor')
    });
  } else {
    this.mostrarErroresDetallados();
  }
}


  goBack(): void {
    this.router.navigate(['/catalogo-proveedores']);
  }

  mostrarErroresDetallados(): void {
    const recorrerControles = (formGroup: FormGroup | FormArray, path: string = '') => {
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.get(key);

        if (control instanceof FormGroup || control instanceof FormArray) {
          recorrerControles(control, path ? `${path}.${key}` : key);
        } else {
          if (control && control.invalid) {
            console.error(`Campo "${path ? path + '.' : ''}${key}" inválido:`, control.errors);
          }
        }
      });
    };

    recorrerControles(this.proveedorForm);
    alert('Por favor complete todos los campos requeridos correctamente.');
  }
}
