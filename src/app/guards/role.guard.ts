import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ServiceAuth } from '../service/service-auth/service-auth';

// Guard funcional para Angular 18+
export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(ServiceAuth);
  const router = inject(Router);

  const requiredRole = route.data['role'];
  const userRole = authService.getUserRole();
  const isAuthenticated = authService.isAuthenticated();

  console.log('🛡️ RoleGuard ejecutándose para:', state.url);
  console.log('🎭 Rol requerido:', requiredRole, '| Rol usuario:', userRole);
  console.log('🔒 Usuario autenticado:', isAuthenticated);

  if (isAuthenticated && userRole === requiredRole) {
    console.log('✅ RoleGuard: Acceso permitido');
    return true;
  } else {
    console.log('❌ RoleGuard: Acceso denegado');
    
    // Redirigir según el rol del usuario o al login si no está autenticado
    if (!isAuthenticated) {
      console.log('🚪 Redirigiendo al login (no autenticado)');
      router.navigate(['/login']);
    } else if (userRole === 1) {
      console.log('🔀 Redirigiendo a área admin');
      router.navigate(['/menu-lateral']); // Admin
    } else if (userRole === 2) {
      console.log('🔀 Redirigiendo a área cliente');
      router.navigate(['/cliente-actualizar']); // Cliente
    } else {
      console.log('🔀 Redirigiendo al inicio');
      router.navigate(['/inicio']);
    }
    return false;
  }
};

// Guard de clase (legacy) - mantenerlo por compatibilidad
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: ServiceAuth, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role'];
    const userRole = this.authService.getUserRole();

    console.log('🛡️ RoleGuard (clase) ejecutándose');
    console.log('🎭 Rol requerido:', requiredRole, '| Rol usuario:', userRole);

    if (this.authService.isAuthenticated() && userRole === requiredRole) {
      console.log('✅ RoleGuard: Acceso permitido');
      return true;
    } else {
      console.log('❌ RoleGuard: Acceso denegado');
      
      // Redirigir según el rol del usuario o al login si no está autenticado
      if (!this.authService.isAuthenticated()) {
        console.log('🚪 Redirigiendo al login (no autenticado)');
        this.router.navigate(['/login']);
      } else if (userRole === 1) {
        console.log('🔀 Redirigiendo a área admin');
        this.router.navigate(['/menu-lateral']); // Admin
      } else if (userRole === 2) {
        console.log('🔀 Redirigiendo a área cliente');
        this.router.navigate(['/cliente-actualizar']); // Cliente
      } else {
        console.log('🔀 Redirigiendo al inicio');
        this.router.navigate(['/inicio']);
      }
      return false;
    }
  }
}

