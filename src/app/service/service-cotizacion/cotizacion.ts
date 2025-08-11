import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICotizacion } from '../../interface/cotizacion'; // Asegúrate que la ruta sea correcta
import { ICotizacionPublica, ICotizacionPublicaResponse } from '../../interface/cotizacion-publica';

@Injectable({
  providedIn: 'root',
})
export class SCotizacion {
  private apiUrl = 'https://localhost:7186/api/Cotizacion'; // Ajusta la URL base si es necesario

  constructor(private http: HttpClient) {}

  // Obtener todas las cotizaciones
  getCotizaciones(): Observable<ICotizacion[]> {
    return this.http.get<ICotizacion[]>(this.apiUrl);
  }

  // Obtener una cotización con detalles por id
  getCotizacionByIdWithDetails(id: number): Observable<ICotizacion> {
    // Suponiendo que la API usa esta ruta para incluir detalles, sino ajustar aquí
    return this.http.get<ICotizacion>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva cotización
  crearCotizacion(cotizacion: ICotizacion): Observable<ICotizacion> {
    return this.http.post<ICotizacion>(this.apiUrl, cotizacion);
  }

  // Actualizar cotización existente
  actualizarCotizacion(id: number, cotizacion: ICotizacion): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, cotizacion);
  }

  // Eliminar cotización
  eliminarCotizacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Crear cotización pública (sin cliente registrado)
  crearCotizacionPublica(cotizacionPublica: ICotizacionPublica): Observable<ICotizacionPublicaResponse> {
    // Usar el endpoint público específico para cotizaciones públicas
    const publicApiUrl = 'https://localhost:7186/api/Publico/cotizacion';
    return this.http.post<ICotizacionPublicaResponse>(publicApiUrl, cotizacionPublica);
  }
}
