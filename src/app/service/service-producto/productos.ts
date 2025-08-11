import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducto } from '../../interface/producto';

@Injectable({
  providedIn: 'root'
})
export class SProducto {

  private apiUrl = 'https://localhost:7186/api/Producto'; // Cambia a la URL de tu API

  constructor(private http: HttpClient) { }

  getProductos(): Observable<IProducto[]> {
    return this.http.get<IProducto[]>(this.apiUrl);
  }

  // Método público para cotizaciones sin autenticación
  getProductosPublicos(): Observable<IProducto[]> {
    return this.http.get<IProducto[]>('https://localhost:7186/api/Publico/productos');
  }

  getProductoById(id: number): Observable<IProducto> {
    return this.http.get<IProducto>(`${this.apiUrl}/${id}`);
  }

  crearProducto(producto: IProducto): Observable<IProducto> {
    return this.http.post<IProducto>(this.apiUrl, producto);
  }

  actualizarProducto(id: number, producto: IProducto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, producto);
  }

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
