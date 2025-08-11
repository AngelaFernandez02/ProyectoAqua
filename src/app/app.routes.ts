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
import { EliminarProveedores } from './componentes/componente/componente-admin/admin-proveedores/eliminar-proveedores/eliminar-proveedores';
import { AgregarProveedores } from './componentes/componente/componente-admin/admin-proveedores/agregar-proveedores/agregar-proveedores';  
import { AgregarProducto } from './componentes/componente/componente-admin/admin-productos/agregar-producto/agregar-producto';  
import { EliminarProductos } from './componentes/componente/componente-admin/admin-productos/eliminar-productos/eliminar-productos';
import { DetalleProductos } from './componentes/componente/componente-admin/admin-productos/detalle-productos/detalle-productos';
import { EditarProductos } from './componentes/componente/componente-admin/admin-productos/editar-productos/editar-productos';
import { DashboardAdmin } from './componentes/componente/componente-admin/dashboard-admin/dashboard-admin';
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

    // Rutas protegidas para ADMINISTRADORES (tipo usuario: 1)
    { 
        path: 'menu-lateral', 
        component: MenuLateral, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },
    { 
        path: 'dashboard-admin', 
        component: DashboardAdmin, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },
    { 
        path: 'comentarios-admin', 
        component: ComentariosAdmin, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },

    // Rutas de gestión de usuarios (solo administradores)
    { 
        path: 'formulario-usuario-cliente', 
        component: FormularioUsuarioCliente, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },
    { 
        path: 'formulario-usuario-admin', 
        component: FormularioUsuarioAdmin, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },
    { 
        path: 'reporte-usuarioss', 
        component: ReporteUsuarioss, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },

    // Rutas de gestión administrativa (solo administradores)
    { 
        path: 'formulario-compras', 
        component: FormularioCompras, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },
    { 
        path: 'formulario-ventas', 
        component: FormularioVentas, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },
    { 
        path: 'formulario-materia', 
        component: FormularioMateria, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },

    // Rutas de gestión de productos (solo administradores)
    { 
        path: 'catalogo-productos', 
        component: CatalogoProductos, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },
    { 
        path: 'catalogo-producto', 
        component: CatalogoProductos, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },
    { 
        path: 'editar-productos/:id', 
        component: EditarProductos, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },
    { 
        path: 'detalle-producto/:id', 
        component: DetalleProductos, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },
    { 
        path: 'eliminar-productos/:id', 
        component: EliminarProductos, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },
    { 
        path: 'agregar-producto', 
        component: AgregarProducto, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },

    // Rutas de gestión de proveedores (solo administradores)
    { 
        path: 'catalogo-proveedores', 
        component: CatalogoProveedores, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },
    { 
        path: 'editar-proveedor/:id', 
        component: EditarProveedores, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },
    { 
        path: 'detalle-proveedor/:id', 
        component: DetalleProveedores, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },
    { 
        path: 'eliminar-proveedor/:id', 
        component: EliminarProveedores, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },
    { 
        path: 'agregar-proveedores', 
        component: AgregarProveedores, 
        canActivate: [authGuard, roleGuard], 
        data: { role: 1 } 
    },

    // Ruta por defecto
    { path: '', redirectTo: '/inicio', pathMatch: 'full' }
]