import { Component, OnInit  } from '@angular/core';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgIf } from '@angular/common';
import { SProveedores } from '../../../../../service/service-proveedores/proveedores';
import { IProveedor } from '../../../../../interface/proveedores';
@Component({
  selector: 'app-detalle-proveedores',
  standalone: true,
  imports: [CommonModule, CurrencyPipe,RouterModule, NgIf,],
  templateUrl: './detalle-proveedores.html',
  styleUrls: ['./detalle-proveedores.css']
})
export class DetalleProveedores implements OnInit {
  proveedor: IProveedor | null = null;
  insumos: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sProveedores: SProveedores
  ) {}

  ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));

  this.sProveedores.getProveedorById(id).subscribe({
    next: (data: any) => {  
      this.proveedor = data;

      this.insumos = Array.isArray(data.tbInsumos)
        ? data.tbInsumos
        : data.tbInsumos?.$values || [];
    },
    error: (error) => {
      console.error('Error al obtener proveedor:', error);
    }
  });
}


  goBack(): void {
    this.router.navigate(['/catalogo-proveedores']);
  }
}
