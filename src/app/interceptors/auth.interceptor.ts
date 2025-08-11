import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServiceAuth } from '../service/service-auth/service-auth';
import { Router } from '@angular/router';

// Interceptor funcional para Angular 18+
export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const authService = inject(ServiceAuth);
  const router = inject(Router);

  // Debug: Log de la petición
  console.log('🔍 Interceptor ejecutándose para:', req.url);
  
  // Obtener el token del servicio de autenticación
  const token = authService.getToken();
  console.log('🔑 Token encontrado:', token ? 'SÍ' : 'NO');

  // Si hay token, clonamos la request y agregamos el header de autorización
  if (token) {
    console.log('✅ Agregando token Bearer a la petición');
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    
    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('❌ Error en petición autenticada:', error.status);
        // Si recibimos un error 401 o 403, significa que el token es inválido o ha expirado
        if (error.status === 401 || error.status === 403) {
          console.log('🚪 Token inválido, cerrando sesión');
          authService.logout();
        }
        return throwError(() => error);
      })
    );
  }

  console.log('⚠️ No hay token, enviando petición sin autenticación');
  // Si no hay token, enviamos la request original
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('❌ Error en petición no autenticada:', error.status);
      if (error.status === 401 || error.status === 403) {
        console.log('🚪 Redirigiendo al login');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};

// Interceptor de clase (legacy) - mantenerlo por compatibilidad
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: ServiceAuth, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Debug: Log de la petición
    console.log('🔍 Interceptor ejecutándose para:', req.url);
    
    // Obtener el token del servicio de autenticación
    const token = this.authService.getToken();
    console.log('🔑 Token encontrado:', token ? 'SÍ' : 'NO');

    // Si hay token, clonamos la request y agregamos el header de autorización
    if (token) {
      console.log('✅ Agregando token Bearer a la petición');
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      
      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('❌ Error en petición autenticada:', error.status);
          // Si recibimos un error 401 o 403, significa que el token es inválido o ha expirado
          if (error.status === 401 || error.status === 403) {
            console.log('🚪 Token inválido, cerrando sesión');
            this.authService.logout();
          }
          return throwError(() => error);
        })
      );
    }

    console.log('⚠️ No hay token, enviando petición sin autenticación');
    // Si no hay token, enviamos la request original
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('❌ Error en petición no autenticada:', error.status);
        if (error.status === 401 || error.status === 403) {
          console.log('🚪 Redirigiendo al login');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}

