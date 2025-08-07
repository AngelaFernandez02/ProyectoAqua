export interface IProductoPost {
  nombreProducto: string;
  descripcion: string;
  precio: number;
  stock: number;
  insumos: {
    nombreInsumo: string;
    cantidad: number;
    unidad: string;
  }[];
}
