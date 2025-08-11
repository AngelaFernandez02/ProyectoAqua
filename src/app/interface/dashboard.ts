export interface DashboardResponse {
  mensaje: string;
  fechaInicio: string;
  fechaFin: string;
  datos: DashboardData;
}

export interface DashboardData {
  resumenGeneral: ResumenGeneral;
  ventasPorPeriodo: VentaPeriodo[];
  productosMasVendidos: ProductoVendido[];
  clientesTop: ClienteTop[];
  ventasPorMes: VentaPorMes[];
}

export interface ResumenGeneral {
  totalVentas: number;
  totalTransacciones: number;
  promedioTicket: number;
  totalClientes: number;
  crecimientoPorcentual: number;
}

export interface VentaPeriodo {
  fecha: string;
  total: number;
  cantidadVentas: number;
}

export interface ProductoVendido {
  idProducto: number;
  nombreProducto: string;
  cantidadVendida: number;
  totalVendido: number;
}

export interface ClienteTop {
  idCliente: number;
  nombreCliente: string;
  totalComprado: number;
  cantidadCompras: number;
}

export interface VentaPorMes {
  año: number;
  mes: number;
  nombreMes: string;
  total: number;
}


