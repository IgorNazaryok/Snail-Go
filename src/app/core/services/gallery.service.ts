import { Injectable } from '@angular/core';

import { DISHES_MOCK } from '../../data/mocks/dishes.mock';
import { Dish } from '../../models/dish.model';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  getDishes(): Dish[] {
    return DISHES_MOCK;
  }

  getDishById(id: string): Dish | undefined {
    return DISHES_MOCK.find((dish) => dish.id === id);
  }
}
