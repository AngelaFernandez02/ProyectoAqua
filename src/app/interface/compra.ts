import { DetalleCompra } from "./DetalleCompra";

export interface Compra {
  idCompra?: number;
  idProveedor: number | null;
  fechaCompra?: Date;
  total?:number;
  detalles: DetalleCompra[];
}
