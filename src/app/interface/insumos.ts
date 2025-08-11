import { IInsumoProducto } from '../interface/insumosProducto';

export interface IInsumo {
  idInsumo: number;
  nombreInsumo: string | null;
  idProveedor: number | null;
  existencias:number;
  costoPromedio:number;
  unidad:string;
  tbInsumoProductos: IInsumoProducto[];
}
