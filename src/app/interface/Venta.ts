import { DetalleVenta } from "./DetalleVenta";

export interface Venta {
  idVenta?: number;
  idCliente: number | null;
  fechaVenta?: Date;
  total?:number;
  detalles: DetalleVenta[];
}
