import { Injectable } from '@angular/core';

import { FARMS_MOCK } from '../../data/mocks/farms.mock';
import { Farm } from '../../models/farm.model';

@Injectable({ providedIn: 'root' })
export class FarmsService {
  getFarms(): Farm[] {
    return FARMS_MOCK;
  }

  getFarmById(id: string): Farm | undefined {
    return FARMS_MOCK.find((farm) => farm.id === id);
  }
}
