import { Injectable } from '@angular/core';
import { IOpinionDetalle } from '../../interface/opiniondetalle';
import { IOpinion } from '../../interface/opinion';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ServiceOpinion {

  private readonly apiUrl = environment.endPoint + 'Opiniones/';
    private apiUrlr = 'https://localhost:7186/api'

  constructor(private http: HttpClient) {}

  enviarOpinion(opinion: IOpinion): Observable<any> {
    return this.http.post(`${this.apiUrl}`, opinion);
  }

  obtenerComprasPorCliente(idCliente: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}compras/${idCliente}`);
  }

  listarOpiniones(): Observable<IOpinionDetalle[]> {
    return this.http.get<IOpinionDetalle[]>(`${this.apiUrl}listar`);
  }


  listarOpinionesAdmin(): Observable<IOpinionDetalle[]> {
    return this.http.get<IOpinionDetalle[]>(`${this.apiUrl}pendientes`);
  }

  listarOpinioness(): Observable<IOpinionDetalle[]> {
    return this.http.get<IOpinionDetalle[]>(`${this.apiUrl}respondidos`);
  }

  actualizarOpinion(id: number, data: { estado: string, respuestaAdmin: string }) {
  return this.http.put(`${this.apiUrl}${id}`, data);
  }
}
