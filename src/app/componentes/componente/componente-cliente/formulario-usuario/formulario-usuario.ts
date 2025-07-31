import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICliente } from '../../../../interface/cliente';
import { IUsuario } from '../../../../interface/usuario';
import { ClienteService } from '../../../../service/service-cliente/service-cliente';
import { MenuLateralCliente } from "../menu-lateral-cliente/menu-lateral-cliente";
 

@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule, MenuLateralCliente],
  templateUrl: './formulario-usuario.html',
  styleUrls: ['./formulario-usuario.css']
})
export class FormularioUsuario implements OnInit {
  listaClientes: ICliente[] = [];

  idCliente: number = 0;
  nombreContacto: string = '';
  telefono: string = '';
  correoContacto: string = '';

  idUsuario: number = 0;
  login: string = '';
  correo: string = '';
  password: string = '';
  tipoUsuario: number = 0;

  isResultLoading: boolean = false;
  isUpdateFormActive: boolean = false;

  constructor(private _clienteService: ClienteService) {}

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
        this.cargarCliente(+idUsuario);
      } else {
        console.error('No se encontró idUsuario en el token');
      }
    } else {
      console.error('No hay token almacenado');
    }
  }

  obtenerClientes(): void {
    this.isResultLoading = true;
    this._clienteService.getList().subscribe({
      next: (data: ICliente[]) => {
        this.listaClientes = data;
        this.isResultLoading = false;
      },
      error: (e) => {
        console.error('Error al obtener los clientes:', e);
        this.isResultLoading = false;
      }
    });
  }

  modificarCliente(): void {
  if (!this.idCliente || !this.idUsuario) return;

  const clienteParaEnviar: ICliente = {
    idCliente: this.idCliente,
    nombreContacto: this.nombreContacto,
    telefono: this.telefono,
    correoContacto: this.correoContacto,
    idUsuario: this.idUsuario,
    usuario: {
      idUsuario: this.idUsuario,
      login: this.login,
      correo: this.correo,
      password: this.password,
      tipoUsuario: this.tipoUsuario
    }
  };

  this._clienteService.update(this.idCliente, clienteParaEnviar).subscribe({
    next: () => {
      alert('Datos actualizados correctamente');
      this.obtenerClientes();
    },
    error: (e) => console.error('Error al actualizar cliente y usuario:', e)
  });
}

  limpiarFormulario(): void {
    this.idCliente = 0;
    this.nombreContacto = '';
    this.telefono = '';
    this.correoContacto = '';
    this.idUsuario = 0;
    this.login = '';
    this.correo = '';
    this.password = '';
    this.tipoUsuario = 0;
    this.isUpdateFormActive = false;
  }

  cargarCliente(id: number): void {
    this.isResultLoading = true;
    this._clienteService.getById(id).subscribe({
      next: (cliente: ICliente) => {
        this.idCliente = cliente.idCliente;
        this.nombreContacto = cliente.nombreContacto;
        this.telefono = cliente.telefono;
        this.correoContacto = cliente.correoContacto;

        if (cliente.usuario) {
          this.idUsuario = cliente.usuario.idUsuario;
          this.login = cliente.usuario.login;
          this.correo = cliente.usuario.correo;
          this.password = cliente.usuario.password;
          this.tipoUsuario = cliente.usuario.tipoUsuario;
        }

        this.isUpdateFormActive = true;
        this.isResultLoading = false;
      },
      error: (e) => {
        console.error('Error al cargar cliente:', e);
        this.isResultLoading = false;
      }
    });
  }
}
