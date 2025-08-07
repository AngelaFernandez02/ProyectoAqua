import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SProducto } from '../../../../../service/service-producto/productos';
import { IProducto } from '../../../../../interface/producto';
import { CommonModule } from '@angular/common'; // 👈 importa esto
import { MenuLateral } from '../../menu-lateral/menu-lateral';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-productos',
  imports: [CommonModule,MenuLateral], // 👈 agrega CommonModule aquí
  templateUrl: './detalle-productos.html',
  styleUrls: ['./detalle-productos.css']
})
export class DetalleProductos implements OnInit {
  productoId!: number;
  producto?: any;

  constructor(
    private route: ActivatedRoute,
    private sProducto: SProducto,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoId = id;
    this.sProducto.getProductoById(id).subscribe({
      next: (data) => {
        this.producto = data;
      },
      error: () => {
        alert('Error al cargar los detalles del producto');
      }
    });
  }
  
  irEditar(): void {
    this.router.navigate(['/editar-productos', this.productoId]);
  }

  irEliminar(): void {
    this.router.navigate(['/eliminar-productos', this.productoId]);
  }
    volverAlCatalogo(): void {
  this.router.navigate(['/catalogo-productos']);
}
}
