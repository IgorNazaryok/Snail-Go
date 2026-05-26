import { Component, inject } from '@angular/core';

import { RouteService } from '../../core/services/route.service';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header.component';
import { TimelineComponent } from '../../shared/ui/timeline/timeline.component';

@Component({
  selector: 'app-route-page',
  imports: [SectionHeaderComponent, TimelineComponent],
  templateUrl: './route.page.html',
  styleUrl: './route.page.scss'
})
export class RoutePage {
  private readonly routeService = inject(RouteService);

  protected readonly steps = this.routeService.getRouteSteps();
  protected readonly routeLegend = this.steps.map((step) => ({
    id: step.id,
    title: step.title,
    icon: step.icon ?? '•'
  }));
}
