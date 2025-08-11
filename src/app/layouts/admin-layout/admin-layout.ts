import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ServiceAuth } from '../../service/service-auth/service-auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">

    <div class="admin-layout">
      <!-- Barra lateral -->
      <div class="sidebar">
        <div class="logo">
          AGUAMIND
        </div>
        <nav class="menu">
          <ul>
            <li>
              <a [routerLink]="'/admin/dashboard'" routerLinkActive="active">
                <i class="fa-solid fa-chart-line icon"></i>
                <span class="menu-text">Dashboard</span>
              </a>
            </li>
            <li>
              <a [routerLink]="'/admin/catalogo-proveedores'" routerLinkActive="active">
                <i class="fa-solid fa-truck icon"></i>
                <span class="menu-text">Proveedores</span>
              </a>
            </li>
            <li>
              <a [routerLink]="'/admin/catalogo-compras'" routerLinkActive="active">
                <i class="fa-solid fa-shopping-cart icon"></i>
                <span class="menu-text">Compras</span>
              </a>
            </li>
            <li>
              <a [routerLink]="'/admin/catalogo-materiaprima'" routerLinkActive="active">
                <i class="fa-solid fa-boxes icon"></i>
                <span class="menu-text">Materia Prima</span>
              </a>
            </li>
            <li>
              <a [routerLink]="'/admin/catalogo-venta'" routerLinkActive="active">
                <i class="fa-solid fa-cash-register icon"></i>
                <span class="menu-text">Ventas</span>
              </a>
            </li>
            <li>
              <a [routerLink]="'/admin/catalogo-productos'" routerLinkActive="active">
                <i class="fa-solid fa-box icon"></i>
                <span class="menu-text">Productos</span>
              </a>
            </li>
            <li>
              <a [routerLink]="'/admin/reporte-usuarioss'" routerLinkActive="active">
                <i class="fa-solid fa-user icon"></i>
                <span class="menu-text">Reporte Usuarios</span>
              </a>
            </li>
            <li>
              <a [routerLink]="'/admin/comentarios'" routerLinkActive="active">
                <i class="fa-solid fa-comments icon"></i>
                <span class="menu-text">Comentarios</span>
              </a>
            </li>
            <li class="logout">
              <a href="#" (click)="logout(); $event.preventDefault()">
                <i class="fa-solid fa-sign-out-alt icon"></i>
                <span class="menu-text">Cerrar sesión</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Contenido principal -->
      <div class="main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    /* Layout principal */
    .admin-layout {
      display: flex;
      min-height: 100vh;
      background: #f8fafc;
    }

    /* Barra lateral */
    .sidebar {
      width: 250px;
      background: #1e293b;
      color: white;
      padding: 20px 0;
      position: fixed;
      height: 100vh;
      overflow-y: auto;
      z-index: 1000;
    }

    .logo {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #334155;
      margin-bottom: 20px;
    }

    .menu ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .menu li {
      margin: 0;
    }

    .menu a {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      color: #cbd5e1;
      text-decoration: none;
      transition: all 0.3s ease;
      border-left: 3px solid transparent;
    }

    .menu a:hover,
    .menu a.active {
      background: #334155;
      color: white;
      border-left-color: #0ea5e9;
    }

    .menu .icon {
      margin-right: 12px;
      width: 16px;
      text-align: center;
    }

    .menu-text {
      font-size: 14px;
      font-weight: 500;
    }

    .menu .logout {
      margin-top: 20px;
      border-top: 1px solid #334155;
      padding-top: 20px;
    }

    .menu .logout a {
      color: #ef4444;
    }

    .menu .logout a:hover {
      background: #dc2626;
      color: white;
    }

    /* Contenido principal */
    .main-content {
      flex: 1;
      margin-left: 250px;
      min-height: 100vh;
      background: #f8fafc;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .sidebar {
        width: 100%;
        position: relative;
        height: auto;
      }
      
      .main-content {
        margin-left: 0;
      }
    }
  `]
})
export class AdminLayout implements OnInit, OnDestroy {
  private authSubscription: Subscription | undefined;

  constructor(private authService: ServiceAuth) {}

  ngOnInit() {
    // Verificar autenticación
    if (!this.authService.isAuthenticated() || !this.authService.isAdmin()) {
      this.authService.logout();
    }
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
