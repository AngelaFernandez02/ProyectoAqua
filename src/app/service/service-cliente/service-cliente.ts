import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICliente } from '../../interface/cliente';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})


export class ClienteService {
  [x: string]: any;
  private readonly apiUrl = environment.endPoint + 'Clientes/';
  private apiUrlr = 'https://localhost:7186/api'

  constructor(private http: HttpClient) {}

  getList(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(`${this.apiUrl}ListaClientes`);
  }

  add(request: ICliente): Observable<ICliente> {
    return this.http.post<ICliente>(`${this.apiUrl}Add`, request);
  }

  update(idCliente: number, request: ICliente): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}${idCliente}`, request);
  }

  delete(idCliente: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${idCliente}`);
  }

  getById(id: number): Observable<ICliente> {
    return this.http.get<ICliente>(`${this.apiUrl}${id}`);
  }

  registrarCliente(cliente: ICliente): Observable<any> {
  return this.http.post<ICliente>(`${this.apiUrl}Add`, cliente);
 }

}
