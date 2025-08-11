export interface ICotizacionPublica {
  nombreCliente: string;
  emailCliente: string;
  telefonoCliente: string;
  items: IItemCotizacionPublica[];
  observaciones?: string;
  validezDias?: number;
}

export interface IItemCotizacionPublica {
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
  insumosDetalle?: IInsumoDetalle[];
}

export interface IInsumoDetalle {
  nombreInsumo: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  unidad?: string;
}

export interface IProductoConInsumos {
  idProducto: number;
  nombreProducto: string;
  descripcion?: string;
  precio: number;
  imagen?: string;
  insumos: IInsumoProductoDetalle[];
  cantidadSeleccionada: number;
  precioPersonalizado: number;
  insumosPersonalizados: IInsumoDetalle[];
}

export interface IInsumoProductoDetalle {
  idInsumo: number;
  nombreInsumo: string;
  cantidadBase: number;
  costoPromedio: number;
  unidad: string;
  cantidadPersonalizada?: number;
  precioPersonalizado?: number;
}

export interface ICotizacionPublicaResponse {
  mensaje: string;
  cotizacion: {
    idCotizacion: number;
    numeroCotizacion: string;
    total: number;
    fechaCotizacion: string;
    fechaVencimiento: string;
  };
}
