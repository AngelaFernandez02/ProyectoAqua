import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IInsumo } from '../../interface/insumos';
import { IProveedor } from '../../interface/proveedores';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SInsumo {
  private readonly apiProveedor = environment.endPoint + 'Proveedores/';
  private apiUrl = 'https://localhost:7186/api/Insumos/'; // Cambia por tu URL real

  constructor(private http: HttpClient) {}

 registrarInsumo(insumo: IInsumo): Observable<any> {
     return this.http.post(`${this.apiUrl}`, insumo);
   }
 
   obtenerInsumos(): Observable<IInsumo[]> {
     return this.http.get<IInsumo[]>(`${this.apiUrl}`);
   }
   getInsumos(): Observable<IInsumo[]> {
     return this.http.get<IInsumo[]>(`${this.apiUrl}`);
   }

   // Método público para cotizaciones sin autenticación
   getInsumosPublicos(): Observable<IInsumo[]> {
     return this.http.get<IInsumo[]>('https://localhost:7186/api/Publico/insumos');
   }
 
   eliminarInsumos(idInsumo: number): Observable<void> {
     return this.http.delete<void>(`${this.apiUrl}${idInsumo}`);
   }
 
    getProveedores(): Observable<IProveedor[]> {
     return this.http.get<IProveedor[]>(`${this.apiProveedor}`);
   }
 
   ObtenerInsumoPorId(id: number): Observable<IInsumo> {
   return this.http.get<IInsumo>(`${this.apiUrl}${id}`);
 
 }
 updateInsumo(id: number, insumo: IInsumo): Observable<any> {
 return this.http.put(`${this.apiUrl}${id}`,insumo);
 }
 
}
