import { IInsumo } from "./insumos";

export interface DetalleCompra {
  idCompra: number;
   idInsumo: number;
  cantidad: number;
  precioUnitario: number;
   insumo?: IInsumo;
}
