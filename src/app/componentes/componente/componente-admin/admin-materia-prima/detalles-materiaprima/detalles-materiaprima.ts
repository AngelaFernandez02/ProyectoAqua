import { Component, OnInit } from "@angular/core";
import { CommonModule, CurrencyPipe, NgIf } from "@angular/common";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

import { IInsumo } from "../../../../../interface/insumos";
import { IProveedor } from "../../../../../interface/proveedores";
import { SInsumo } from "../../../../../service/service-insumo/insumo";
import { SProveedores } from "../../../../../service/service-proveedores/proveedores";

@Component({
  selector: 'app-detalles-insumo',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule, NgIf],
  templateUrl: './detalles-materiaprima.html',
  styleUrls: ['./detalles-materiaprima.css']
})
export class DetallesMateriaprima implements OnInit {
  insumo: IInsumo | null = null;
  proveedor: IProveedor | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private insumoService: SInsumo,
    private proveedorService: SProveedores
  ) {}

  ngOnInit() {
    const idInsumo = Number(this.route.snapshot.paramMap.get('id'));

    Promise.all([
      this.insumoService.ObtenerInsumoPorId(idInsumo).toPromise(),
      this.proveedorService.getProveedores().toPromise()
    ])
   .then(([insumoData, proveedores]) => {
  this.insumo = insumoData ?? null;
  const listaProveedores = proveedores ?? [];
  this.proveedor = listaProveedores.find(p => p.idProveedor === insumoData?.idProveedor) || null;
})
    .catch(err => {
      console.error('Error cargando insumo o proveedores:', err);
      this.insumo = null;
      this.proveedor = null;
    });
  }

  goBack(): void {
    this.router.navigate(['/catalogo-materiaprima']);
  }
}
