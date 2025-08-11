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
        
        // Mostrar mensaje de error más descriptivo según el tipo de error
        if (e.status === 401) {
          alert('Error de autenticación: No tienes permisos para acceder a esta información. Por favor, inicia sesión nuevamente.');
        } else if (e.status === 403) {
          alert('Error de autorización: No tienes permisos de administrador para ver los usuarios.');
        } else if (e.status === 0) {
          alert('Error de conexión: No se pudo conectar con el servidor. Verifica tu conexión a internet.');
        } else {
          alert(`Error al cargar usuarios: ${e.error?.message || e.message || 'Error desconocido'}`);
        }
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
    if (!this.idUsuario) {
      alert('No hay usuario seleccionado para actualizar.');
      return;
    }

    if (!this.login || !this.correo || !this.password) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const usuarioActualizado: IUsuario = {
      idUsuario: this.idUsuario,
      correo: this.correo,
      login: this.login,
      password: this.password,
      tipoUsuario: this.tipoUsuario,
    };

    this.ServiceUsuario.update(usuarioActualizado).subscribe({
      next: () => {
        alert('Usuario actualizado exitosamente.');
        this.limpiarFormulario();
        this.obtenerUsuarios();
      },
      error: (e) => {
        console.error('Error al actualizar usuario:', e);
        if (e.status === 401) {
          alert('Error de autenticación: No tienes permisos para actualizar usuarios.');
        } else if (e.status === 403) {
          alert('Error de autorización: No tienes permisos de administrador.');
        } else if (e.status === 404) {
          alert('Usuario no encontrado.');
        } else {
          alert(`Error al actualizar usuario: ${e.error?.message || e.message || 'Error desconocido'}`);
        }
      }
    });
  }

  eliminarEmpleado(usu: IUsuario) {
    const confirmar = confirm(`¿Estás seguro de que deseas eliminar al usuario "${usu.login}"?`);
    if (!confirmar) return;

    this.ServiceUsuario.delete(usu.idUsuario).subscribe({
      next: () => {
        alert('Usuario eliminado exitosamente.');
        this.obtenerUsuarios();
      },
      error: (e) => {
        console.error('Error al eliminar usuario:', e);
        if (e.status === 401) {
          alert('Error de autenticación: No tienes permisos para eliminar usuarios.');
        } else if (e.status === 403) {
          alert('Error de autorización: No tienes permisos de administrador.');
        } else if (e.status === 404) {
          alert('Usuario no encontrado.');
        } else {
          alert(`Error al eliminar usuario: ${e.error?.message || e.message || 'Error desconocido'}`);
        }
      }
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
