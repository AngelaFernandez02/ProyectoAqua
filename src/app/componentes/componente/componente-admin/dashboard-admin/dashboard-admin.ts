import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { ServiceDashboard } from '../../../../service/service-dashboard/service-dashboard';
import { DashboardResponse, VentaPeriodo, ProductoVendido, VentaPorMes } from '../../../../interface/dashboard';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-admin.html',
  styleUrls: ['./dashboard-admin.css']
})
export class DashboardAdmin implements OnInit {
  @ViewChild('ventasLineaCanvas') ventasLineaCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('productosBarraCanvas') productosBarraCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('mesesPieCanvas') mesesPieCanvas!: ElementRef<HTMLCanvasElement>;

  data?: DashboardResponse;
  fechaInicio?: string;
  fechaFin?: string;

  private ventasLineaChart?: Chart;
  private productosBarraChart?: Chart;
  private mesesPieChart?: Chart;

  constructor(private dashboardService: ServiceDashboard) {}

  ngOnInit(): void {
    this.cargarDashboard();
  }

  cargarDashboard(fechaInicio?: string, fechaFin?: string): void {
    this.dashboardService.getDashboard(fechaInicio, fechaFin).subscribe((resp: DashboardResponse) => {
      this.data = resp;
      queueMicrotask(() => this.renderCharts());
    });
  }

  aplicarFiltros(): void {
    this.cargarDashboard(this.fechaInicio, this.fechaFin);
  }

  limpiarFiltros(): void {
    this.fechaInicio = undefined;
    this.fechaFin = undefined;
    this.cargarDashboard();
  }

  ultimoNDias(dias: number): void {
    const hoy = new Date();
    const inicio = new Date(hoy);
    inicio.setDate(hoy.getDate() - dias + 1);
    // Formato YYYY-MM-DD compatible con input date
    const toInputDate = (d: Date) => new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
      .toISOString().slice(0, 10);
    this.fechaInicio = toInputDate(inicio);
    this.fechaFin = toInputDate(hoy);
    this.aplicarFiltros();
  }

  private renderCharts(): void {
    if (!this.data) return;

    // Función para generar colores dinámicos basados en valores
    const generateColors = (values: number[], baseColor: string = '#0ea5e9'): string[] => {
      const maxValue = Math.max(...values);
      return values.map(value => {
        const intensity = value / maxValue;
        const alpha = 0.3 + (intensity * 0.7); // Rango de 0.3 a 1.0
        return `${baseColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
      });
    };

    const ventasLabels = this.data.datos.ventasPorPeriodo.map((v: VentaPeriodo) => new Date(v.fecha).toLocaleDateString());
    const ventasTotals = this.data.datos.ventasPorPeriodo.map((v: VentaPeriodo) => v.total);

    if (this.ventasLineaChart) this.ventasLineaChart.destroy();
    this.ventasLineaChart = new Chart(this.ventasLineaCanvas.nativeElement.getContext('2d')!, {
      type: 'line',
      data: {
        labels: ventasLabels,
        datasets: [{
          label: 'Ventas por período',
          data: ventasTotals,
          borderColor: '#0ea5e9',
          backgroundColor: 'rgba(14,165,233,0.15)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, labels: { color: '#0f172a' } }
        },
        scales: {
          x: { ticks: { color: '#1e293b' }, grid: { color: 'rgba(30,58,138,0.08)' } },
          y: { ticks: { color: '#1e293b' }, grid: { color: 'rgba(30,58,138,0.08)' } }
        }
      }
    });

    const prodLabels = this.data.datos.productosMasVendidos.map((p: ProductoVendido) => p.nombreProducto);
    const prodCant = this.data.datos.productosMasVendidos.map((p: ProductoVendido) => p.cantidadVendida);
    const prodColors = generateColors(prodCant, '#0ea5e9');

    if (this.productosBarraChart) this.productosBarraChart.destroy();
    this.productosBarraChart = new Chart(this.productosBarraCanvas.nativeElement.getContext('2d')!, {
      type: 'bar',
      data: {
        labels: prodLabels,
        datasets: [{
          label: 'Cantidad vendida',
          data: prodCant,
          backgroundColor: prodColors
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#1e293b' }, grid: { display: false } },
          y: { ticks: { color: '#1e293b' }, grid: { color: 'rgba(30,58,138,0.08)' } }
        }
      }
    });

    const mesLabels = this.data.datos.ventasPorMes.map((m: VentaPorMes) => m.nombreMes);
    const mesTotals = this.data.datos.ventasPorMes.map((m: VentaPorMes) => m.total);
    const mesColors = generateColors(mesTotals, '#0ea5e9');

    if (this.mesesPieChart) this.mesesPieChart.destroy();
    this.mesesPieChart = new Chart(this.mesesPieCanvas.nativeElement.getContext('2d')!, {
      type: 'pie',
      data: {
        labels: mesLabels,
        datasets: [{
          label: 'Ventas por mes',
          data: mesTotals,
          backgroundColor: mesColors
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
}


