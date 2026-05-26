import { Injectable } from '@angular/core';

import { ROUTE_STEPS_MOCK } from '../../data/mocks/routes.mock';
import { RouteStep } from '../../models/route.model';

@Injectable({ providedIn: 'root' })
export class RouteService {
  getRouteSteps(): RouteStep[] {
    return ROUTE_STEPS_MOCK;
  }
}
