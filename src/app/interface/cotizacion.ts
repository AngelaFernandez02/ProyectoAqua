export interface ICotizacion {
  idCotizacion: number;
  idCliente?: number | null;

  fechaCotizacion: string;  // usar string ISO date (ejemplo: "2025-08-10T00:00:00Z")
  fechaVencimiento: string;

  subtotal: number;
  iva: number;
  total: number;

  observaciones?: string | null;
  estado: 'Pendiente' | 'Aceptada' | 'Rechazada' | 'Vencida';

  numeroCotizacion?: string | null;

  // Para cotizaciones sin cliente registrado
  nombreCliente?: string | null;
  emailCliente?: string | null;
  telefonoCliente?: string | null;

  // Relaciones
  cliente?: ICliente | null;
  detalles?: ICotizacionDetalle[] | null;
}
import { ICliente } from './cliente';
import { ICotizacionDetalle } from './cotizaciondetalle';   