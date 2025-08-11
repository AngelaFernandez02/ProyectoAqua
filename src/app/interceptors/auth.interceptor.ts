import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServiceAuth } from '../service/service-auth/service-auth';
import { Router } from '@angular/router';

// Rutas públicas que no requieren autenticación
const RUTAS_PUBLICAS = [
  '/inicio', '/conocenos', '/contactanos', '/producto', '/clientes', 
  '/solicitar-cotizacion', '/login'
];

// Verificar si la ruta actual es pública
const esRutaPublica = (): boolean => {
  const router = inject(Router);
  const rutaActual = router.url;
  return RUTAS_PUBLICAS.some(ruta => rutaActual.includes(ruta));
};

// Interceptor funcional para Angular 18+
export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const authService = inject(ServiceAuth);
  const router = inject(Router);

  // Debug: Log de la petición
  console.log('🔍 Interceptor ejecutándose para:', req.url);
  console.log('📍 Ruta actual:', router.url);
  
  // Verificar si estamos en una ruta pública
  const rutaPublica = esRutaPublica();
  console.log('🌐 Es ruta pública:', rutaPublica);
  
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
          // Solo redirigir al login si no estamos en una ruta pública
          if (!rutaPublica) {
            router.navigate(['/login']);
          }
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
      
      // Solo redirigir al login si:
      // 1. El error es 401/403 Y
      // 2. NO estamos en una ruta pública
      if ((error.status === 401 || error.status === 403) && !rutaPublica) {
        console.log('🚪 Redirigiendo al login desde ruta privada');
        router.navigate(['/login']);
      } else if (rutaPublica && (error.status === 401 || error.status === 403)) {
        console.log('🌐 Error 401/403 en ruta pública - continuando sin redirección');
        // En rutas públicas, simplemente logeamos el error pero no redirigimos
      }
      
      return throwError(() => error);
    })
  );
};

// Interceptor de clase (legacy) - mantenerlo por compatibilidad
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: ServiceAuth, private router: Router) {}

  private esRutaPublica(): boolean {
    const rutaActual = this.router.url;
    return RUTAS_PUBLICAS.some(ruta => rutaActual.includes(ruta));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Debug: Log de la petición
    console.log('🔍 Interceptor (clase) ejecutándose para:', req.url);
    console.log('📍 Ruta actual:', this.router.url);
    
    // Verificar si estamos en una ruta pública
    const rutaPublica = this.esRutaPublica();
    console.log('🌐 Es ruta pública:', rutaPublica);
    
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
            // Solo redirigir al login si no estamos en una ruta pública
            if (!rutaPublica) {
              this.router.navigate(['/login']);
            }
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
        
        // Solo redirigir al login si:
        // 1. El error es 401/403 Y
        // 2. NO estamos en una ruta pública
        if ((error.status === 401 || error.status === 403) && !rutaPublica) {
          console.log('🚪 Redirigiendo al login desde ruta privada');
          this.router.navigate(['/login']);
        } else if (rutaPublica && (error.status === 401 || error.status === 403)) {
          console.log('🌐 Error 401/403 en ruta pública - continuando sin redirección');
          // En rutas públicas, simplemente logeamos el error pero no redirigimos
        }
        
        return throwError(() => error);
      })
    );
  }
}

