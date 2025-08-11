import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { ServiceAuth } from '../service/service-auth/service-auth';

// Guard funcional para Angular 18+
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(ServiceAuth);
  const router = inject(Router);

  console.log('🛡️ AuthGuard ejecutándose para:', state.url);
  const isAuthenticated = authService.isAuthenticated();
  console.log('🔒 Usuario autenticado:', isAuthenticated);

  if (isAuthenticated) {
    console.log('✅ AuthGuard: Acceso permitido');
    return true;
  } else {
    console.log('❌ AuthGuard: Acceso denegado, redirigiendo al login');
    router.navigate(['/login']);
    return false;
  }
};

// Guard de clase (legacy) - mantenerlo por compatibilidad
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: ServiceAuth, private router: Router) {}

  canActivate(): boolean {
    console.log('🛡️ AuthGuard (clase) ejecutándose');
    const isAuthenticated = this.authService.isAuthenticated();
    console.log('🔒 Usuario autenticado:', isAuthenticated);

    if (isAuthenticated) {
      console.log('✅ AuthGuard: Acceso permitido');
      return true;
    } else {
      console.log('❌ AuthGuard: Acceso denegado, redirigiendo al login');
      this.router.navigate(['/login']);
      return false;
    }
  }
}

