import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IUsuario } from '../../interface/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceUsuario {
  private readonly apiUrl = environment.endPoint + 'Usuarios/';
    private apiUrlr = 'https://localhost:7186/api'

  constructor(private http: HttpClient) {}


  getList(): Observable<IUsuario[]> {
      return this.http.get<IUsuario[]>(`${this.apiUrl}`);
    }
  
    add(request: IUsuario): Observable<IUsuario> {
      return this.http.post<IUsuario>(`${this.apiUrl}`, request);
    }

    update(request: IUsuario): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}${request.idUsuario}`, request);
  }
  
  
    delete(idUsuario: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}${idUsuario}`);
    }
  
    getById(id: number): Observable<IUsuario> {
      return this.http.get<IUsuario>(`${this.apiUrl}${id}`);
    }
  
}
