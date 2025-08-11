import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServiceUsuario } from '../../../../../service/service-usuario/service-usuario';
import { IUsuario } from '../../../../../interface/usuario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reporte-usuarioss',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './reporte-usuarioss.html',
  styleUrls: ['./reporte-usuarioss.css']
})
export class ReporteUsuarioss {

  listaUsuarios: IUsuario[] = [];
  isResultLoading: boolean = false;

  idCliente: number = 0;
  nombreContacto: string = '';
  telefono: string = '';
  correoContacto: string = '';

  idUsuario: number = 0;
  login: string = '';
  correo: string = '';
  password: string = '';
  tipoUsuario: number = 0;

  isUpdateFormActive: boolean = false;

  usuarios: any[] = []; 

  constructor(
    private ServiceUsuario: ServiceUsuario
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.isResultLoading = true;
    this.ServiceUsuario.getList().subscribe({
      next: (data: IUsuario[]) => {
        this.listaUsuarios = data;
        this.isResultLoading = false;
      },
      error: (e) => {
        console.error('Error al obtener los usuarios:', e);
        this.isResultLoading = false;
      }
    });
  }
  seleccionarParaEditar(usu: IUsuario) {
    this.idUsuario = usu.idUsuario;
    this.login = usu.login;
    this.password = usu.password;
    this.correo = usu.correo;
    this.tipoUsuario = usu.tipoUsuario; 


    this.isUpdateFormActive = true;
  }

  modificarUsuario() {
    if (!this.idUsuario) return;

    const usuarioActualizado: IUsuario = {
      idUsuario: this.idUsuario,
      correo: this.correo,
      login: this.login,
      password: this.password,
      tipoUsuario: this.tipoUsuario,
    };

    this.ServiceUsuario.update(usuarioActualizado).subscribe({
      next: () => {
        this.limpiarFormulario();
        this.obtenerUsuarios();
      },
      error: (e) => console.log('Error al actualizar:', e)
    });
  }

  eliminarEmpleado(usu: IUsuario) {
    this.ServiceUsuario.delete(usu.idUsuario).subscribe({
      next: () => this.obtenerUsuarios(),
      error: (e) => console.log(e)
    });
  }

  limpiarFormulario() {
    this.idUsuario = 0;
    this.correo = '';
    this.login = '';
    this.password = '';
    this.tipoUsuario = 0;
    this.isUpdateFormActive = false;
  }

}
