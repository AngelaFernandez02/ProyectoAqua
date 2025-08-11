import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Compra } from '../../interface/compra';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProveedor } from '../../interface/proveedores';
import { IInsumo } from '../../interface/insumos';

@Injectable({
  providedIn: 'root'
})
export class ServiceCompra {

   private readonly apiUrl = environment.endPoint + 'Compra/';
    private readonly apiProveedor = environment.endPoint + 'Proveedores/';
  private readonly apiInsumo = environment.endPoint + 'Insumos/';
  private apiUrlr = 'https://localhost:7186/api'
  constructor(private http: HttpClient) {}

  registrarCompra(compra: Compra): Observable<any> {
    return this.http.post(`${this.apiUrl}RegistrarCompra`, compra);
  }

  obtenerCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(`${this.apiUrl}ListaCompras`);
  }


  getCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(`${this.apiUrl}ListaCompras`);
  }

  eliminarCompra(idCompra: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${idCompra}`);
  }


   getProveedores(): Observable<IProveedor[]> {
    return this.http.get<IProveedor[]>(`${this.apiProveedor}`);
  }

  getInsumos(): Observable<IInsumo[]> {
    return this.http.get<IInsumo[]>(`${this.apiInsumo}`);
  }

  getCompraById(id: number): Observable<Compra> {
  return this.http.get<Compra>(`${this.apiUrl}${id}`);

}
updateCompra(id: number, compra: Compra): Observable<any> {
return this.http.put(`${this.apiUrl}ActualizarCompra/${id}`, compra);
}

 
  
  
}
