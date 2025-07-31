import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MenuLateral } from "../menu-lateral/menu-lateral";
import { IOpinionDetalle } from '../../../../interface/opiniondetalle';
import { ServiceOpinion } from '../../../../service/service-opinion/service-opinion';

@Component({
  selector: 'app-comentarios-admin',
  imports: [CommonModule,
    FormsModule, MenuLateral,],
  templateUrl: './comentarios-admin.html',
  styleUrl: './comentarios-admin.css'
})
export class ComentariosAdmin {
opiniones: IOpinionDetalle[] = [];

constructor(private _opinionService: ServiceOpinion) {}


ngOnInit() {
  this._opinionService.listarOpinionesAdmin().subscribe(data => {
    this.opiniones = data;
  });
}

 actualizarSeguimiento(o: IOpinionDetalle) {
  this._opinionService.actualizarOpinion(o.idOpinion, o).subscribe({
    next: () => alert('Seguimiento actualizado'),
    error: (e) => console.error('Error al actualizar opinión:', e)
  });
}
}
