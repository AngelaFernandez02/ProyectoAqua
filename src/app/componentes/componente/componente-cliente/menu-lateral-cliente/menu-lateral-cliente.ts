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
    localStorage.removeItem('token');     
    sessionStorage.removeItem('token');    
    this.router.navigate(['/login']);      
  }
}
