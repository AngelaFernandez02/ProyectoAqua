import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
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
import { AgregarProveedores } from './componentes/componente/componente-admin/admin-proveedores/agregar-proveedores/agregar-proveedores';  
import { AgregarProducto } from './componentes/componente/componente-admin/admin-productos/agregar-producto/agregar-producto';  
import { EliminarProductos } from './componentes/componente/componente-admin/admin-productos/eliminar-productos/eliminar-productos';
import { DetalleProductos } from './componentes/componente/componente-admin/admin-productos/detalle-productos/detalle-productos';
import { EditarProductos } from './componentes/componente/componente-admin/admin-productos/editar-productos/editar-productos';
import { DashboardAdmin } from './componentes/componente/componente-admin/dashboard-admin/dashboard-admin';
import { CatalogoCompras } from './componentes/componente/componente-admin/admin-compras/catalogo-compras/catalogo-compras';
import { EliminarCompras } from './componentes/componente/componente-admin/admin-compras/eliminar-compras/eliminar-compras';
import { DetallesCompra } from './componentes/componente/componente-admin/admin-compras/detalles-compras/detalles-compras';
import { EditarCompras } from './componentes/componente/componente-admin/admin-compras/editar-compras/editar-compras';
import { EliminarProveedores } from './componentes/componente/componente-admin/admin-proveedores/eliminar-proveedores/eliminar-proveedores';
import { CatalogoProductosCliente } from './componentes/componente/componente-cliente/catalogo-productos-cliente/catalogo-productos-cliente';
import { DetalleCotizacion } from './componentes/componente/componente-cliente/detalle-cotizacion/detalle-cotizacion';
import { DetalleCotizacionPersonalizada } from './componentes/componente/componente-cliente/detalle-cotizacion-personalizada/detalle-cotizacion-personalizada';
import { DetallesMateriaprima } from './componentes/componente/componente-admin/admin-materia-prima/detalles-materiaprima/detalles-materiaprima';
import { EliminarMateriaprima } from './componentes/componente/componente-admin/admin-materia-prima/eliminar-materiaprima/eliminar-materiaprima';
import { CatalogoMateriaPrima } from './componentes/componente/componente-admin/admin-materia-prima/catalogo-materiaprima/catalogo-materiaprima';
import { EditarMateriaprima } from './componentes/componente/componente-admin/admin-materia-prima/editar-materiaprima/editar-materiaprima';
import { AdminLayout } from './layouts/admin-layout/admin-layout';

export const routes : Routes = [
    // Rutas públicas (sin autenticación requerida)
    { path: 'login', component: Login },
    { path: 'inicio', component: ComponenteInicio },
    { path: 'conocenos', component: Conocenos },
    { path: 'contactanos', component: Contactanos },
    { path: 'producto', component: Producto },
    { path: 'clientes', component: Clientes },
    
    // Rutas protegidas para CLIENTES (tipo usuario: 2)
    { 
        path: 'cliente-actualizar', 
        component: ClienteActualizar, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 2 } 
    },
    { 
        path: 'formulario-usuario', 
        component: FormularioUsuario, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 2 } 
    },
    { 
        path: 'compras-cliente', 
        component: ComprasCliente, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 2 } 
    },
    // Rutas de cotizaciones para clientes
    { 
        path: 'catalogo-productos-cliente', 
        component: CatalogoProductosCliente, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 2 } 
    },
    { 
        path: 'detalle-cotizacion/:id', 
        component: DetalleCotizacion, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 2 } 
    },
    { 
        path: 'detalle-cotizacion-personalizada/:id', 
        component: DetalleCotizacionPersonalizada, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 2 } 
    },

    // Layout unificado para ADMINISTRADORES (tipo usuario: 1)
    {
        path: 'admin',
        component: AdminLayout,
        canActivate: [authGuard, roleGuard],
        data: { role: 1 },
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardAdmin },
            { path: 'comentarios', component: ComentariosAdmin },
            
            // Gestión de usuarios
            { path: 'formulario-usuario-cliente', component: FormularioUsuarioCliente },
            { path: 'formulario-usuario-admin', component: FormularioUsuarioAdmin },
            { path: 'reporte-usuarioss', component: ReporteUsuarioss },
            
            // Gestión administrativa
            { path: 'formulario-compras', component: FormularioCompras },
            { path: 'formulario-ventas', component: FormularioVentas },
            { path: 'formulario-materia', component: FormularioMateria },
            
            // Gestión de productos
            { path: 'catalogo-productos', component: CatalogoProductos },
            { path: 'catalogo-producto', component: CatalogoProductos },
            { path: 'editar-productos/:id', component: EditarProductos },
            { path: 'detalle-producto/:id', component: DetalleProductos },
            { path: 'eliminar-productos/:id', component: EliminarProductos },
            { path: 'agregar-producto', component: AgregarProducto },
            
            // Gestión de proveedores
            { path: 'catalogo-proveedores', component: CatalogoProveedores },
            { path: 'editar-proveedor/:id', component: EditarProveedores },
            { path: 'detalle-proveedor/:id', component: DetalleProveedores },
            { path: 'eliminar-proveedor/:id', component: EliminarProveedores },
            { path: 'agregar-proveedores', component: AgregarProveedores },
            
            // Gestión de compras
            { path: 'catalogo-compras', component: CatalogoCompras },
            { path: 'detalles-compras/:id', component: DetallesCompra },
            { path: 'eliminar-compras/:id', component: EliminarCompras },
            { path: 'agregar-compras', component: FormularioCompras },
            { path: 'editar-compras/:id', component: EditarCompras },
            
            // Gestión de materia prima
            { path: 'catalogo-materiaprima', component: CatalogoMateriaPrima },
            { path: 'detalles-materiaprima/:id', component: DetallesMateriaprima },
            { path: 'eliminar-materiaprima/:id', component: EliminarMateriaprima },
            { path: 'agregar-materiaprima', component: FormularioMateria },
            { path: 'editar-materiaprima/:id', component: EditarMateriaprima }
        ]
    },

    // Rutas legacy para mantener compatibilidad (redirigir al nuevo layout)
    { path: 'dashboard-admin', redirectTo: '/admin/dashboard', pathMatch: 'full' },
    { path: 'menu-lateral', redirectTo: '/admin/dashboard', pathMatch: 'full' },
    { path: 'catalogo-proveedores', redirectTo: '/admin/catalogo-proveedores', pathMatch: 'full' },
    { path: 'catalogo-productos', redirectTo: '/admin/catalogo-productos', pathMatch: 'full' },
    { path: 'catalogo-compras', redirectTo: '/admin/catalogo-compras', pathMatch: 'full' },
    { path: 'catalogo-materiaprima', redirectTo: '/admin/catalogo-materiaprima', pathMatch: 'full' },
    { path: 'formulario-ventas', redirectTo: '/admin/formulario-ventas', pathMatch: 'full' },
    { path: 'reporte-usuarioss', redirectTo: '/admin/reporte-usuarioss', pathMatch: 'full' },
    { path: 'comentarios-admin', redirectTo: '/admin/comentarios', pathMatch: 'full' },

    // Ruta por defecto
    { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];