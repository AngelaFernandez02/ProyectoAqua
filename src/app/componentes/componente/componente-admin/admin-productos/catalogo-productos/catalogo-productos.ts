import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SProducto } from '../../../../../service/service-producto/productos';
import { IProducto } from '../../../../../interface/producto';
import { MenuLateral } from "../../menu-lateral/menu-lateral";
import { BuscarProducto } from '../buscar-producto/buscar-producto';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-catalogo-productos',
  standalone: true,
  imports: [CommonModule, MenuLateral, BuscarProducto, RouterModule],
  templateUrl: './catalogo-productos.html',
  styleUrl: './catalogo-productos.css'
})
export class CatalogoProductos {
  productos: IProducto[] = [];
  productosFiltrados: IProducto[] = [];

  constructor(
    private productosService: SProducto,
    private router: Router // ✅ Inyectado correctamente aquí
  ) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe((data) => {
      this.productos = data;
      this.productosFiltrados = data;
    });
  }

  filtrar(filtros: { nombre: string, precio: number | null }) {
    this.productosFiltrados = this.productos.filter(p => {
      const coincideNombre = p.nombreProducto.toLowerCase().includes(filtros.nombre);
      const coincidePrecio = filtros.precio == null || p.precio <= filtros.precio;
      return coincideNombre && coincidePrecio;
    });
  }

  getImagenPorNombre(nombreProducto: string): string {
    const nombre = nombreProducto.toLowerCase();

    if (nombre.includes('kit básico pro')) return 'img-kit-basico-pro.jpg';
    if (nombre.includes('kit básico')) return 'img-kit-basico.jpg';
    if (nombre.includes('kit completo pro')) return 'img-kit-completo-pro.jpg';
    if (nombre.includes('kit completo')) return 'img-kit-completo.jpg';
    if (nombre.includes('kit premium')) return 'img-kit-premium.jpg';
    if (nombre.includes('personalizado')) return 'personalizado.jpg';

    return 'default.jpg';
  }

  abrirAgregarProducto(): void {
    this.router.navigate(['/agregar-producto']);
  }
  verDetallesProducto(idProducto: number): void {
  this.router.navigate(['/detalle-producto', idProducto]);
}

}
