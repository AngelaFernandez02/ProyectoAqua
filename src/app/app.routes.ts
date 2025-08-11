import { Routes } from '@angular/router';
import { Login } from './componentes/componente/login/login';
import { ComponenteInicio } from './componentes/componente/componente-homepage/componente-inicio/componente-inicio';
import { Conocenos } from './componentes/componente/componente-homepage/conocenos/conocenos';
import { Contactanos } from './componentes/componente/componente-homepage/contactanos/contactanos';
import { Clientes } from './componentes/componente/componente-homepage/clientes/clientes';
import { Producto } from './componentes/componente/componente-homepage/producto/producto';
import { ClienteActualizar } from './componentes/componente/componente-cliente/cliente-actualizar/cliente-actualizar';
import { ComprasCliente } from './componentes/componente/componente-cliente/compras-cliente/compras-cliente';
import { ComentariosAdmin } from './componentes/componente/componente-admin/comentarios-admin/comentarios-admin';
import { MenuLateral } from './componentes/componente/componente-admin/menu-lateral/menu-lateral';
import { FormularioUsuarioCliente } from './componentes/componente/componente-admin/admin-usuarios/formulario-usuario-cliente/formulario-usuario-cliente';
import { ReporteUsuarioss } from './componentes/componente/componente-admin/admin-usuarios/reporte-usuarioss/reporte-usuarioss';
import { FormularioUsuario } from './componentes/componente/componente-cliente/formulario-usuario/formulario-usuario';
import { FormularioUsuarioAdmin } from './componentes/componente/componente-admin/admin-usuarios/formulario-usuario-admin/formulario-usuario-admin';
import { FormularioCompras } from './componentes/componente/componente-admin/admin-compras/formulario-compras/formulario-compras';
import { FormularioVentas } from './componentes/componente/componente-admin/admin-ventas/formulario-ventas/formulario-ventas';
import { FormularioMateria } from './componentes/componente/componente-admin/admin-materia-prima/formulario-materia/formulario-materia';
import { CatalogoProductos } from './componentes/componente/componente-admin/admin-productos/catalogo-productos/catalogo-productos';
import { CatalogoProveedores } from './componentes/componente/componente-admin/admin-proveedores/catalogo-proveedores/catalogo-proveedores';
import { EditarProveedores } from './componentes/componente/componente-admin/admin-proveedores/editar-proveedores/editar-proveedores';
import { DetalleProveedores } from './componentes/componente/componente-admin/admin-proveedores/detalle-proveedores/detalle-proveedores';
import { EliminarProveedores } from './componentes/componente/componente-admin/admin-proveedores/eliminar-proveedores/eliminar-proveedores';
import { AgregarProveedores } from './componentes/componente/componente-admin/admin-proveedores/agregar-proveedores/agregar-proveedores';  
import { AgregarProducto } from './componentes/componente/componente-admin/admin-productos/agregar-producto/agregar-producto';  
import { EliminarProductos } from './componentes/componente/componente-admin/admin-productos/eliminar-productos/eliminar-productos';
import { DetalleProductos } from './componentes/componente/componente-admin/admin-productos/detalle-productos/detalle-productos';
import { EditarProductos } from './componentes/componente/componente-admin/admin-productos/editar-productos/editar-productos';
import { DashboardAdmin } from './componentes/componente/componente-admin/dashboard-admin/dashboard-admin';
export const routes : Routes = [
    { path: 'login', component: Login },
    {path:'inicio', component: ComponenteInicio},
    {path:'conocenos', component: Conocenos},
    {path:'contactanos', component: Contactanos},
    {path:'producto', component: Producto},
    {path:'clientes', component: Clientes},
    {path:'cliente-actualizar', component: ClienteActualizar},
    {path:'formulario-usuario', component: FormularioUsuario},
    {path:'compras-cliente', component: ComprasCliente},
    {path:'comentarios-admin', component: ComentariosAdmin},
    {path:'menu-lateral', component: MenuLateral},
    {path:'formulario-usuario-cliente', component: FormularioUsuarioCliente},
    {path:'formulario-usuario-admin', component: FormularioUsuarioAdmin},

        {path:'formulario-compras', component: FormularioCompras},
        {path:'formulario-ventas', component: FormularioVentas},
        {path:'formulario-materia', component: FormularioMateria},
        {path:'catalogo-productos', component: CatalogoProductos},
          //proveedores rutas
        {path:'catalogo-proveedores', component: CatalogoProveedores},
        { path: 'editar-proveedor/:id', component: EditarProveedores },
        { path: 'detalle-proveedor/:id', component: DetalleProveedores },
        { path: 'eliminar-proveedor/:id', component: EliminarProveedores },
        { path: 'agregar-proveedores', component: AgregarProveedores },
  // Productos rutas
        {path:'catalogo-producto', component: CatalogoProductos},
        { path: 'editar-productos/:id', component: EditarProductos },
        { path: 'detalle-producto/:id', component: DetalleProductos },
        { path: 'eliminar-productos/:id', component: EliminarProductos },
        { path: 'agregar-producto', component: AgregarProducto },        
    {path:'reporte-usuarioss', component: ReporteUsuarioss},
    {path:'dashboard-admin', component: DashboardAdmin},
    {path:'', redirectTo: '/inicio', pathMatch:'full'}
]