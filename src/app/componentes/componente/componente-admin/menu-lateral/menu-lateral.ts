import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './menu-lateral.html',
  styleUrl: './menu-lateral.css'
})
export class MenuLateral {

  constructor(private router: Router) {}

  logout() {
    console.log('🚪 Botón de logout clickeado');
    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    // Redirigir al login
    this.router.navigate(['/login']);
  }
}
