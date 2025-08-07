import { IInsumo } from '../interface/insumos';

export interface IProveedor {
  idProveedor: number;
  nombreProveedor: string | null;
  contactoProveedor: string | null;
  tbInsumos: IInsumo[];
}
