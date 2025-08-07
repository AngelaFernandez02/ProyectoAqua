import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SProducto } from '../../../../../service/service-producto/productos';
import { IProducto } from '../../../../../interface/producto';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-productos.html',
  styleUrls: ['./eliminar-productos.css']
})
export class EliminarProductos implements OnInit {
  productoId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sProducto: SProducto
  ) {}
producto: IProducto | null = null;
  ngOnInit(): void {
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));
  this.sProducto.getProductoById(this.productoId).subscribe({
    next: (data) => this.producto = data,
    error: () => alert('Error al cargar el producto')
  });
  }

  confirmarEliminacion(): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.sProducto.eliminarProducto(this.productoId).subscribe({
        next: () => {
          alert('Producto eliminado correctamente');
          this.router.navigate(['/catalogo-productos']);
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar el producto');
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/catalogo-productos']);
  }
}
