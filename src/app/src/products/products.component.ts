import { Component, inject } from '@angular/core';
import { ProductsListComponent } from './ui/products-list.component';
import { ProductsDetailComponent } from './ui/products-detail.component';
import { ProductsService } from './data-access/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductsListComponent, ProductsDetailComponent],
  template: `
    <section class="center with-sidebar">
      @if (productsService.loading()) {
        <div>Loading...</div>
      } @else if (productsService.error()) {
        <div class="error" role="alert">
          Error: {{ productsService.error() }}
        </div>
      } @else {
        <app-products-list
          [products]="productsService.products()"
          (onSelected)="onSelected($event)"
        />
      }
      @if (productsService.loading()) {
        <div>Loading...</div>
      } @else if (productsService.error()) {
        <div class="error" role="alert">
          Error: {{ productsService.error() }}
        </div>
      } @else {
        <app-products-detail
          [product]="productsService.selectedProduct()"
          (onSelected)="onSelected($event)"
        />
      }
    </section>
  `,
  styles: `
    section {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }
  `,
})
export class ProductsComponent {
  readonly productsService = inject(ProductsService);

  onSelected(productId?: number) {
    this.productsService.productSelected(productId);
  }
}
