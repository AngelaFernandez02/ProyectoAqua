import { IUsuario } from "./usuario";

export interface ICliente {
 idCliente: number;
  nombreContacto: string;
  telefono: string;
  correoContacto: string;
  idUsuario?: number;
  usuario?: IUsuario; 
  };
