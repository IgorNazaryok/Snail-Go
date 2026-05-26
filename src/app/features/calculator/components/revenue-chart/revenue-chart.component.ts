import {
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  input,
  viewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { ChartPoint } from '../../../../models/calculator.model';

@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrl: './revenue-chart.component.scss'
})
export class RevenueChartComponent {
  readonly points = input.required<ChartPoint[]>();

  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  private chart: import('chart.js').Chart | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.chart?.destroy();
      this.chart = null;
    });

    effect(() => {
      void this.renderChart(this.points());
    });
  }

  private async renderChart(points: ChartPoint[]): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const { default: Chart } = await import('chart.js/auto');
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) {
      return;
    }

    this.chart?.destroy();
    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: points.map((point) => point.label),
        datasets: [
          {
            label: 'Накопленный денежный поток',
            data: points.map((point) => point.value),
            borderColor: '#507a4e',
            backgroundColor: 'rgba(80, 122, 78, 0.18)',
            borderWidth: 3,
            pointRadius: 2,
            pointHoverRadius: 4,
            tension: 0.28,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              callback: (value) => `${Number(value).toLocaleString('uk-UA')} грн`
            }
          }
        }
      }
    });
  }
}
