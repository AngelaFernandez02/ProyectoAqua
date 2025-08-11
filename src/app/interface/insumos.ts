import { IInsumoProducto } from '../interface/insumosProducto';

export interface IInsumo {
  idInsumo: number;
  nombreInsumo: string | null;
  idProveedor: number | null;
  existencias: number;
  costo_Promedio?: number;  // opcional
  costoPromedio?: number;   // opcional
  CostoPromedio?: number;   // opcional
  unidad: string;
  tbInsumoProductos: IInsumoProducto[];
}

