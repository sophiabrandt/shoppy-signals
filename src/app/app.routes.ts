import { Routes } from '@angular/router';
import { PRODUCT_ROUTES } from './src/products/products.routes';

enum ROUTER_TOKENS {
  PRODUCTS = 'products',
}

export const routes: Routes = [
  {
    path: ROUTER_TOKENS.PRODUCTS,
    loadComponent: () =>
      import('./src/products/products.component').then(
        (c) => c.ProductsComponent,
      ),
    children: PRODUCT_ROUTES,
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
];
