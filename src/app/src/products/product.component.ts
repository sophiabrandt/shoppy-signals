import { Component, inject } from '@angular/core';
import { ProductsService } from './data-access/products.service';
import { ProductsDetailComponent } from './ui/products-detail.component';

@Component({
  selector: 'app-product',
  standalone: true,
  template: `
    @if (productsService.selectedProductError()) {
      <div class="error" role="alert">
        Error: {{ productsService.selectedProductError() }}
      </div>
    } @else {
      <app-products-detail
        [product]="productsService.selectedProduct()"
        (onSelected)="onSelected($event)"
      />
    }
  `,
  styles: [],
  imports: [ProductsDetailComponent],
})
export class ProductComponent {
  readonly productsService = inject(ProductsService);

  onSelected(productId?: number) {
    this.productsService.productSelected(productId);
  }
}
