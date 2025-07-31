import { Component } from '@angular/core';
import { FormularioUsuario } from "../formulario-usuario/formulario-usuario";
import { MenuLateralCliente } from "../menu-lateral-cliente/menu-lateral-cliente";

@Component({
  selector: 'app-cliente-actualizar',
  imports: [ MenuLateralCliente],
  templateUrl: './cliente-actualizar.html',
  styleUrl: './cliente-actualizar.css'
})
export class ClienteActualizar {

}
