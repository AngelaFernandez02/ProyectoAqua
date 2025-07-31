import { Component } from '@angular/core';
import { ClienteService } from '../../../../../service/service-cliente/service-cliente';
import { ServiceUsuario } from '../../../../../service/service-usuario/service-usuario';
import { IUsuario } from '../../../../../interface/usuario';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuLateral } from '../../menu-lateral/menu-lateral';

@Component({
  selector: 'app-formulario-usuario-admin',
  imports: [RouterOutlet, RouterLink, FormsModule, MenuLateral, CommonModule],
  templateUrl: './formulario-usuario-admin.html',
  styleUrls: ['./formulario-usuario-admin.css']  // <- corregido de "styleUrl" a "styleUrls"
})
export class FormularioUsuarioAdmin {
  listaUsuarios: IUsuario[] = [];

  usuario: IUsuario = {
    idUsuario: 0,
    login: '',
    correo: '',
    password: '',
    tipoUsuario: 1
  };

  isResultLoading: boolean = false;
  isUpdateFormActive: boolean = false;

  constructor(
    private _clienteService: ClienteService,
    private _usuarioService: ServiceUsuario
  ) {}

  agregarUsuario(): void {
    this._usuarioService.add(this.usuario).subscribe({
      next: (usuarioCreado) => {
        alert('Usuario agregado correctamente');
        this.usuario.idUsuario = usuarioCreado.idUsuario;
        this.limpiarFormulario();
      },
      error: (e) => {
        console.error('Error al agregar usuario:', e);
        alert('No se pudo agregar el usuario.');
      }
    });
  }

  eliminarUsuario(): void {
    if (!this.usuario.idUsuario) {
      alert('No hay usuario cargado para eliminar.');
      return;
    }

    const confirmar = confirm('¿Seguro que deseas eliminar este usuario?');
    if (!confirmar) return;

    this._usuarioService.delete(this.usuario.idUsuario).subscribe({
      next: () => {
        alert('Usuario eliminado correctamente');
        this.limpiarFormulario();
      },
      error: (e) => {
        console.error('Error al eliminar usuario:', e);
        alert('No se pudo eliminar el usuario.');
      }
    });
  }

  limpiarFormulario(): void {
    this.usuario = {
      idUsuario: 0,
      login: '',
      correo: '',
      password: '',
      tipoUsuario: 1
    };
    this.isUpdateFormActive = false;
  }
}
