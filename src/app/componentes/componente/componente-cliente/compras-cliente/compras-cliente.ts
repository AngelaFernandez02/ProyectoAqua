import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuLateralCliente } from '../menu-lateral-cliente/menu-lateral-cliente';
import { ServiceOpinion } from '../../../../service/service-opinion/service-opinion';
import { IOpinion } from '../../../../interface/opinion';

@Component({
  selector: 'app-compras-cliente',
  standalone: true,
  imports: [
    CommonModule,
    MenuLateralCliente,
    FormsModule
  ],
  templateUrl: './compras-cliente.html',
  styleUrls: ['./compras-cliente.css']
})
export class ComprasCliente implements OnInit {

  compras: any[] = [];
  idCliente: number = 0;

  constructor(private _opinionService: ServiceOpinion) {}

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (err) {
      console.error('Error al decodificar el token:', err);
      return null;
    }
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = this.parseJwt(token);
      const idUsuario = decoded?.idUsuario || decoded?.sub;
      if (idUsuario) {
        this.idCliente = +idUsuario;
        this.cargarCompras(this.idCliente);
      } else {
        console.error('No se encontró idUsuario en el token');
      }
    } else {
      console.error('No hay token almacenado');
    }
  }

  cargarCompras(idCliente: number): void {
    this._opinionService.obtenerComprasPorCliente(idCliente).subscribe({
      next: (data) => {
        this.compras = data.map(c => ({
          ...c,
          opinion: '',
          calificacion: 5,
          mostrarFormulario: false
        }));
      },
      error: (err) => {
        console.error('Error al cargar compras:', err);
      }
    });
  }

  enviarOpinion(producto: any) {
    const opinion: IOpinion = {
      idVenta: producto.idVenta,
      idProducto: producto.idProducto,
      idCliente: this.idCliente,
      mensaje: producto.opinion,
      calificacion: producto.calificacion
    };

    this._opinionService.enviarOpinion(opinion).subscribe(() => {
      alert("Gracias por tu opinión!");
      producto.mostrarFormulario = false;
    });
  }

  mostrarFormulario(compra: any) {
    this.compras.forEach(c => c.mostrarFormulario = false);
    compra.mostrarFormulario = true;
  }
}
