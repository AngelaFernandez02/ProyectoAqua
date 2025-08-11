export interface ICotizacionDetalle {
  idCotizacionDetalle: number;
  idCotizacion: number;
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  descripcion?: string | null;
    insumos?: IInsumo[];  // <-- asegurarte que esté aquí y sea opcional
  // Relaciones (opcional)
  cotizacion?: ICotizacion | null;
  producto?: IProducto | null;
}
import { IInsumo } from './insumos';
import { IProducto } from './producto';
import { ICotizacion } from './cotizacion';