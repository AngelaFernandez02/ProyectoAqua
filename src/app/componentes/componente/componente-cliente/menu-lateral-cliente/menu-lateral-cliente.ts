import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu-lateral-cliente',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './menu-lateral-cliente.html',
  styleUrl: './menu-lateral-cliente.css'
})
export class MenuLateralCliente {

  constructor(private router: Router) {}

//FUNCION PARA CERRAR SESION Y BORRAR TOKEN DE LOCALSTORAGE
  cerrarSesion(): void {
    console.log('🚪 Cliente cerrando sesión');
    // Limpiar localStorage completamente
    localStorage.removeItem('token');     
    localStorage.removeItem('userRole');
    sessionStorage.removeItem('token');    
    this.router.navigate(['/login']);
  }
}
