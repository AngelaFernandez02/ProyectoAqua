import { Component } from '@angular/core';
import { BeneficiosProducto } from "../beneficios-producto/beneficios-producto";
import { ImagenesProducto } from "../imagenes-producto/imagenes-producto";
import { Documentos } from "../documentos/documentos";
import { Imagenespr } from '../imagenespr/imagenespr';


@Component({
  selector: 'app-producto',
  standalone:true,
  imports: [BeneficiosProducto, ImagenesProducto, Documentos,Imagenespr],
  templateUrl: './producto.html',
  styleUrl: './producto.css'
})
export class Producto {

}
