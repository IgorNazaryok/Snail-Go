import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage)
  },
  {
    path: 'tourism',
    loadComponent: () => import('./features/tourism/tourism.page').then((m) => m.TourismPage)
  },
  {
    path: 'farms',
    loadComponent: () => import('./features/farms/farms.page').then((m) => m.FarmsPage)
  },
  {
    path: 'farms/:id',
    loadComponent: () =>
      import('./features/farm-details/farm-details.page').then((m) => m.FarmDetailsPage)
  },
  {
    path: 'route',
    loadComponent: () => import('./features/route/route.page').then((m) => m.RoutePage)
  },
  {
    path: 'gallery',
    loadComponent: () => import('./features/gallery/gallery.page').then((m) => m.GalleryPage)
  },
  {
    path: 'calculator',
    loadComponent: () =>
      import('./features/calculator/calculator.page').then((m) => m.CalculatorPage)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.page').then((m) => m.NotFoundPage)
  }
];
