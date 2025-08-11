import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceAuth } from '../../../../service/service-auth/service-auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, OnDestroy {
  isAuthenticated = false;
  userRole: number | null = null;
  private authSubscription: Subscription | undefined;

  constructor(private authService: ServiceAuth) {}

  ngOnInit() {
    // Verificar estado inicial de autenticación
    this.checkAuthStatus();
    
    // Suscribirse a cambios en el estado de autenticación
    this.authSubscription = this.authService.authStatus$.subscribe(
      (isAuth: boolean) => {
        this.isAuthenticated = isAuth;
        this.userRole = this.authService.getUserRole();
        console.log('🔄 [Header] Estado de autenticación actualizado:', isAuth);
      }
    );
  }

  ngOnDestroy() {
    // Limpiar la suscripción cuando el componente se destruya
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  checkAuthStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userRole = this.authService.getUserRole();
  }

  logout() {
    this.authService.logout();
  }

  // Método para obtener el nombre del usuario según su rol
  getUserDisplayName(): string {
    if (this.userRole === 1) {
      return 'Administrador';
    } else if (this.userRole === 2) {
      return 'Cliente';
    }
    return 'Usuario';
  }
}
