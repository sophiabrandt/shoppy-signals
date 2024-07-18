import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./product.component').then((c) => c.ProductComponent),
  },
];
