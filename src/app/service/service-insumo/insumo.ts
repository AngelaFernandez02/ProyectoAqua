import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IInsumo } from '../../interface/insumos';

@Injectable({
  providedIn: 'root'
})
export class SInsumo {
  private apiUrl = 'https://localhost:7186/api/Insumos'; // Cambia por tu URL real

  constructor(private http: HttpClient) {}

  getInsumos(): Observable<IInsumo[]> {
    return this.http.get<IInsumo[]>(this.apiUrl);
  }

  // Si quieres agregar más métodos para CRUD, por ejemplo:
  // crearInsumo(insumo: IInsumo): Observable<IInsumo> { ... }
  // actualizarInsumo(id: number, insumo: IInsumo): Observable<IInsumo> { ... }
  // eliminarInsumo(id: number): Observable<void> { ... }
}
