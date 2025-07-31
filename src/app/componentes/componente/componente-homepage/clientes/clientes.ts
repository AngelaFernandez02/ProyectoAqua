import { Component, OnInit } from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';
import { NgModel } from '@angular/forms';
import { ServiceOpinion } from '../../../../service/service-opinion/service-opinion';

interface IOpinionDetalle {
  clienteNombre: string;
  productoNombre: string;
  mensaje: string;
  calificacion: number;
  fecha: string | Date;
  estado: string;
  respuestaAdmin?: string;
}

@Component({
  selector: 'app-opiniones-clientes',
  imports: [CommonModule,DatePipe],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.css']
})
export class Clientes implements OnInit {
  opiniones: IOpinionDetalle[] = [];

  constructor(private _opinionService: ServiceOpinion) {}

  ngOnInit(): void {
    this._opinionService.listarOpinioness().subscribe({
      next: (data) => {
       
        this.opiniones = data;
      },
      error: (err) => console.error('Error cargando opiniones:', err)
    });
  }
}
