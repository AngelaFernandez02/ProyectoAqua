import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from '../../interface/Venta';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServiceVenta {

  private readonly apiUrl = environment.endPoint + 'Venta/';
      private apiUrlr = 'https://localhost:7186/api'
  constructor(private http: HttpClient) {}

  registrarVenta(venta: Venta): Observable<any> {
    return this.http.post(`${this.apiUrl}RegistrarVenta`, venta);
  }

  obtenerVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.apiUrl}ListaVentas`);
  }

  eliminarVenta(idVenta: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${idVenta}`);
  }
  
}
