import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IProveedor} from '../../interface/proveedores';
@Injectable({
  providedIn: 'root'
})
export class SProveedores {
  private apiUrl = 'https://localhost:7186/api/Proveedores';

  constructor(private http: HttpClient) {}

  getProveedores(): Observable<IProveedor[]> {
    return this.http.get<IProveedor[]>(this.apiUrl);
  }
  getProveedorById(id: number): Observable<IProveedor> {
  return this.http.get<IProveedor>(`${this.apiUrl}/${id}`);
}
agregarProveedor(proveedor: IProveedor) {
    return this.http.post<IProveedor>(`${this.apiUrl}`, proveedor);
  }
updateProveedor(id: number, proveedor: IProveedor): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, proveedor);
}
eliminarProveedor(id: number) {
  return this.http.delete(`https://localhost:7186/api/Proveedores/${id}`);
}

}
