import { Injectable } from '@angular/core';

import { TOURISM_CATEGORIES_MOCK, TOURISM_SECTIONS_MOCK } from '../../data/mocks/tourism.mock';
import { TourismCategory, TourismSection } from '../../models/tourism.model';

@Injectable({ providedIn: 'root' })
export class TourismService {
  getSections(): TourismSection[] {
    return TOURISM_SECTIONS_MOCK;
  }

  getCategories(): TourismCategory[] {
    return TOURISM_CATEGORIES_MOCK;
  }
}
