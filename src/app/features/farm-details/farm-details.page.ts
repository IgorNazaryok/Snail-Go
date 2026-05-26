import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { FarmsService } from '../../core/services/farms.service';

@Component({
  selector: 'app-farm-details-page',
  imports: [RouterLink],
  templateUrl: './farm-details.page.html',
  styleUrl: './farm-details.page.scss'
})
export class FarmDetailsPage {
  private readonly route = inject(ActivatedRoute);
  private readonly farmsService = inject(FarmsService);

  protected readonly activeTab = signal<'overview' | 'cycle' | 'facts'>('overview');
  protected readonly tabs = [
    { id: 'overview', label: 'Опис' },
    { id: 'cycle', label: 'Цикл ферми' },
    { id: 'facts', label: 'Факти' }
  ] as const;
  private readonly farmId = toSignal(this.route.paramMap.pipe(map((params) => params.get('id') ?? '')), {
    initialValue: ''
  });

  protected readonly farm = computed(() => this.farmsService.getFarmById(this.farmId()));

  protected setTab(tab: 'overview' | 'cycle' | 'facts'): void {
    this.activeTab.set(tab);
  }

  protected onTabKeydown(
    event: KeyboardEvent,
    currentTab: 'overview' | 'cycle' | 'facts'
  ): void {
    const order: Array<'overview' | 'cycle' | 'facts'> = ['overview', 'cycle', 'facts'];
    const currentIndex = order.indexOf(currentTab);

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.activeTab.set(order[(currentIndex + 1) % order.length]);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.activeTab.set(order[(currentIndex - 1 + order.length) % order.length]);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.activeTab.set(order[0]);
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.activeTab.set(order[order.length - 1]);
    }
  }
}
