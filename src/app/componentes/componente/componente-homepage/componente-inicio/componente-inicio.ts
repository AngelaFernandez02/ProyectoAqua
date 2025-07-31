import { Component } from '@angular/core';
import { Banner } from '../banner/banner';
import { BotonesInicioRapido } from '../botones-inicio-rapido/botones-inicio-rapido';
import { ComponentesSistema } from '../componentes-sistema/componentes-sistema';
import { SobreNosotros } from '../sobre-nosotros/sobre-nosotros';
import { PreguntasFrecuentes } from "../preguntas-frecuentes/preguntas-frecuentes";


@Component({
  selector: 'app-componente-inicio',
  standalone:true,
  imports: [Banner, BotonesInicioRapido, ComponentesSistema, SobreNosotros, PreguntasFrecuentes],
  templateUrl: './componente-inicio.html',
  styleUrl: './componente-inicio.css'
})
export class ComponenteInicio {

}
