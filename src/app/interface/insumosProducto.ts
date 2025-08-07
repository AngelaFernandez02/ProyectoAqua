export interface IInsumoProducto {
  idProducto: number;
  idInsumo: number;
  cantidad: number | null;
  idInsumoNavigation?: any;        // puedes reemplazar 'any' por IInsumo si lo necesitas
  idProductoNavigation?: any;      // puedes reemplazar 'any' por IProducto si tienes esa interfaz
}
