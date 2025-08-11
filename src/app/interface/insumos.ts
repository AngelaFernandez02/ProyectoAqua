import { IInsumoProducto } from '../interface/insumosProducto';

export interface IInsumo {
  idInsumo: number;
  nombreInsumo: string | null;
  idProveedor: number | null;
  existencias: number;
  costoPromedio?: number;   // opcional
  costo_Promedio?: number;  // opcional para compatibilidad
  CostoPromedio?: number;   // opcional para compatibilidad
  unidad: string;
  tbInsumoProductos: IInsumoProducto[];
}

