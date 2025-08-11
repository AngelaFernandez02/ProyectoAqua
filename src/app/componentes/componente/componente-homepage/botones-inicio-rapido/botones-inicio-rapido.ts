import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-botones-inicio-rapido',
  standalone:true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './botones-inicio-rapido.html',
  styleUrl: './botones-inicio-rapido.css'
})
export class BotonesInicioRapido {

  constructor(private router: Router) {}

  // Método para ir a cotización
  irACotizacion() {
    this.router.navigate(['/solicitar-cotizacion']);
  }
}
