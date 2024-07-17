import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./products/products.component').then((c) => c.ProductsComponent),
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
];
