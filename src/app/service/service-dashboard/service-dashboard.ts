import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { DashboardResponse } from '../../interface/dashboard';

@Injectable({
  providedIn: 'root'
})
export class ServiceDashboard {
  private readonly apiUrl = environment.endPoint + 'Venta/';

  constructor(private http: HttpClient) {}

  getDashboard(fechaInicio?: string, fechaFin?: string): Observable<DashboardResponse> {
    let params = new HttpParams();
    if (fechaInicio) params = params.set('fechaInicio', fechaInicio);
    if (fechaFin) params = params.set('fechaFin', fechaFin);
    return this.http.get<DashboardResponse>(`${this.apiUrl}dashboard`, { params });
  }
}


