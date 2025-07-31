import { Component } from '@angular/core';
import { ICliente } from '../../../../../interface/cliente';
import { ClienteService } from '../../../../../service/service-cliente/service-cliente';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuLateral } from "../../menu-lateral/menu-lateral";

@Component({
  selector: 'app-formulario-usuario-cliente',
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule, MenuLateral],
  templateUrl: './formulario-usuario-cliente.html',
  styleUrl: './formulario-usuario-cliente.css'
})
export class FormularioUsuarioCliente {
  constructor(private _clienteService: ClienteService,private http: HttpClient) {}


 cliente = {
  nombreContacto: '',
  telefono: '',
  correoContacto: '',
  usuario: {
    correo: ''
  }
};

registrarCliente() {
 if (!this.cliente.usuario.correo) {
    this.cliente.usuario.correo = this.cliente.correoContacto;
  }

  this.http.post('https://localhost:7186/api/Clientes', this.cliente).subscribe({
    next: () => {
      alert('Cliente registrado correctamente. Las credenciales han sido enviadas por correo.');
    },
    error: (err) => {
      console.error(err);
      alert('Ocurrió un error al registrar el cliente.');
    }
  });
}


}
