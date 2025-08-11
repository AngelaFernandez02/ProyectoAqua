import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAuth {
  private readonly apiUrl = environment.endPoint + 'Auth/';
  private apiUrlr = 'https://localhost:7186/api'; // Si lo usas más adelante

  // BehaviorSubject para manejar el estado de autenticación
  private authStatusSubject = new BehaviorSubject<boolean>(false);
  public authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Inicializar el estado de autenticación al crear el servicio
    this.updateAuthStatus();
  }

  login(credentials: { username: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.updateAuthStatus();
  }

  saveUserRole(tipoUsuario: number) {
    localStorage.setItem('userRole', tipoUsuario.toString());
    this.updateAuthStatus();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): number | null {
    const role = localStorage.getItem('userRole');
    return role ? parseInt(role) : null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    console.log('🔍 [isAuthenticated] Verificando token:', token ? 'EXISTE' : 'NULL/UNDEFINED');
    
    if (!token) {
      console.log('❌ [isAuthenticated] No hay token, usuario NO autenticado');
      return false;
    }
    
    // Verificar si el token ha expirado
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const isValid = payload.exp > currentTime;
      console.log('🕒 [isAuthenticated] Token válido:', isValid, 'Expira:', new Date(payload.exp * 1000));
      return isValid;
    } catch (error) {
      // Si hay error al decodificar, consideramos el token como inválido
      console.log('❌ [isAuthenticated] Error decodificando token:', error);
      return false;
    }
  }

  // Método para actualizar el estado de autenticación y notificar a los suscriptores
  private updateAuthStatus(): void {
    const isAuth = this.isAuthenticated();
    this.authStatusSubject.next(isAuth);
  }

  isAdmin(): boolean {
    return this.getUserRole() === 1;
  }

  isCliente(): boolean {
    return this.getUserRole() === 2;
  }

  logout() {
    console.log('🚪 Ejecutando logout...');
    console.log('🗑️ Limpiando localStorage...');
    
    // Limpiar todos los datos de autenticación
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    
    // Verificar que se limpiaron correctamente
    const tokenAfter = localStorage.getItem('token');
    const roleAfter = localStorage.getItem('userRole');
    
    console.log('✅ Token después del logout:', tokenAfter);
    console.log('✅ Role después del logout:', roleAfter);
    
    // Limpiar completamente el localStorage por si acaso
    if (tokenAfter || roleAfter) {
      console.log('⚠️ Limpiando localStorage completamente...');
      localStorage.clear();
    }
    
    // Actualizar el estado de autenticación
    this.updateAuthStatus();
    
    console.log('🔄 Redirigiendo al login...');
    this.router.navigate(['/login']);
  }
}
