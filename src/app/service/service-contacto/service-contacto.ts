import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IContacto } from '../../interface/contacto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceContacto {
  
  constructor(private http: HttpClient) {}
  private readonly apiUrl = environment.endPoint + 'Contactos/';
 private apiUrlr = 'https://localhost:7186/api'



 getList(): Observable<IContacto[]> {
     return this.http.get<IContacto[]>(`${this.apiUrl}`);
   }
  add(request: IContacto): Observable<IContacto> {
    return this.http.post<IContacto>(`${this.apiUrl}`, request);
  }

}
