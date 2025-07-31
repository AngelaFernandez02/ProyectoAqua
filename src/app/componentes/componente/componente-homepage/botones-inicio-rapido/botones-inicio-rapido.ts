import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-botones-inicio-rapido',
  standalone:true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './botones-inicio-rapido.html',
  styleUrl: './botones-inicio-rapido.css'
})
export class BotonesInicioRapido {

}
