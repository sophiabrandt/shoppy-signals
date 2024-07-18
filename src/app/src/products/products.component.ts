import { Component, inject } from '@angular/core';
import { ProductsListComponent } from './ui/products-list.component';
import { ProductsService } from './data-access/products.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductsListComponent, RouterOutlet],
  template: `
    <section class="center with-sidebar">
      @if (productsService.loading()) {
        <div>Loading...</div>
      } @else if (productsService.productsError()) {
        <div class="error" role="alert">
          Error: {{ productsService.productsError() }}
        </div>
      } @else {
        <app-products-list
          [products]="productsService.products()"
          [selectedProduct]="productsService.selectedProduct()"
          (onSelected)="onSelected($event)"
        />
        <router-outlet></router-outlet>
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
