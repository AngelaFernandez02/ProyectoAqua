import { Component } from '@angular/core';
import { IContacto } from '../../../../interface/contacto';
import { ServiceContacto } from '../../../../service/service-contacto/service-contacto';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contactanos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './contactanos.html',
  styleUrl: './contactanos.css'
})
export class Contactanos {
  listaContactanos: IContacto[] = [];
  isResultLoading: boolean = false;
  isUpdateFormActive: boolean = false;

  idContacto: number = 0;
  nombreContacto: string = '';
  telefono: string = '';
  correoContacto: string = '';

  constructor(private _contactoService: ServiceContacto) {
    this.obtenerContactos();
  }

  obtenerContactos() {
    this.isResultLoading = true;
    this._contactoService.getList().subscribe({
      next: (data) => {
        this.listaContactanos = data;
        this.isResultLoading = false;
      },
      error: (e) => {
        console.error("Error al obtener contactos:", e);
        this.isResultLoading = false;
      }
    });
  }

  agregarContacto() {
    const nuevoContacto: IContacto = {
      idContacto: 0,
      nombreContacto: this.nombreContacto,
      telefono: this.telefono,
      correoContacto: this.correoContacto,
    };

    this._contactoService.add(nuevoContacto).subscribe({
      next: () => {
        alert('Gracias por contactarnos. Te hemos enviado un correo con más información.');
        this.limpiarFormulario();
        this.obtenerContactos();
      },
      error: (e) => {
        console.error('Error al agregar contacto:', e);
        alert('Ocurrió un error al enviar tu información. Intenta de nuevo.');
      }
    });
  }

  limpiarFormulario() {
    this.idContacto = 0;
    this.nombreContacto = '';
    this.telefono = '';
    this.correoContacto = '';
    this.isUpdateFormActive = false;
  }
}
