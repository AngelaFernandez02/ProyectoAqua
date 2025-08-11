import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Necesario para *ngFor, *ngIf, pipes
import { Router } from '@angular/router';

import { MenuLateral } from "../../componente-admin/menu-lateral/menu-lateral";
import { BuscarProducto } from '../../componente-admin/admin-productos/buscar-producto/buscar-producto';
import { SProducto } from '../../../../service/service-producto/productos';
import { IProducto } from '../../../../interface/producto';

@Component({
  selector: 'app-catalogo-productos-cliente',
  standalone: true, // ✅ Asegura que se reconozca como componente independiente
  imports: [CommonModule, BuscarProducto, MenuLateral],
  templateUrl: './catalogo-productos-cliente.html',
  styleUrls: ['./catalogo-productos-cliente.css'] // ✅ styleUrls en plural
})
export class CatalogoProductosCliente implements OnInit {

  productos: IProducto[] = [];
  productosFiltrados: IProducto[] = [];

  constructor(
    private productoService: SProducto,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        // 🔹 Forzamos a número para evitar error con number pipe
        this.productos = data.map(p => ({
          ...p,
          precio: Number(p.precio)
        }));
        this.productosFiltrados = this.productos;
      },
      error: (err) => console.error('Error al obtener productos', err)
    });
  }

  filtrar(texto: string): void {
    this.productosFiltrados = this.productos.filter(p =>
      p.nombreProducto?.toLowerCase().includes(texto.toLowerCase())
    );
  }

  verDetallesProducto(idProducto: number): void {
    this.router.navigate(['detalle-cotizacion/', idProducto]);
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
}
