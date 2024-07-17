import { Component, inject } from '@angular/core';
import { ProductsListComponent } from './ui/products-list.component';
import { ProductsDetailComponent } from './ui/products-detail.component';
import { ProductsService } from './data-access/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductsListComponent, ProductsDetailComponent],
  template: `
    <section class="center">
      @if (productsService.loading()) {
        <div>Loading...</div>
      } @else if (productsService.error()) {
        <div class="error" role="alert">
          Error: {{ productsService.error() }}
        </div>
      } @else {
        <app-products-list [products]="productsService.products()" />
      }
      <app-products-detail />
    </section>
  `,
  styles: `
    section {
      display: flex;
      justify-content: space-between;
    }
  `,
})
export class ProductsComponent {
  readonly productsService = inject(ProductsService);
}
