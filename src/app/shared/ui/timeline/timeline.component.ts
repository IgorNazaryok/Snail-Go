import { Component, input } from '@angular/core';

import { RouteStep } from '../../../models/route.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  readonly steps = input.required<RouteStep[]>();
}
