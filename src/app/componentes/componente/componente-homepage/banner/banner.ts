import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.html',
  styleUrl: './banner.css'
})
export class Banner {

  constructor(private router: Router) {}

  comenzarCotizacion() {
    this.router.navigate(['/solicitar-cotizacion']);
  }
}
