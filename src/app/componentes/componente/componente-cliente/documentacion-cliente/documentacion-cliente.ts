import { Component } from '@angular/core';
import { Documentos } from "../../componente-homepage/documentos/documentos";
import { MenuLateralCliente } from "../menu-lateral-cliente/menu-lateral-cliente";

@Component({
  selector: 'app-documentacion-cliente',
  imports: [Documentos, MenuLateralCliente],
  templateUrl: './documentacion-cliente.html',
  styleUrl: './documentacion-cliente.css'
})
export class DocumentacionCliente {

}
