import { Component, input, output } from '@angular/core';
import { Product } from '../interfaces/Product';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-products-detail',
  standalone: true,
  imports: [NgOptimizedImage, CurrencyPipe],
  template: `
    <article>
      @if (product()) {
        <div class="close-view">
          <button type="button" (click)="onSelected.emit(undefined)">
            Close
          </button>
        </div>
        <div class="frame">
          <img
            [ngSrc]="product()?.images?.[0]!"
            [alt]="product()?.title"
            fill
          />
        </div>
        <h2>{{ product()?.title }}</h2>
        <div class="subtitle">
          <h5>{{ product()?.category }}</h5>
          <p>price: {{ product()?.price | currency }}</p>
          <p>rating: {{ product()?.rating }}</p>
        </div>
        <p>{{ product()?.description }}</p>
      } @else {
        <p>No product selected</p>
      }
    </article>
  `,
  styles: `
    .close-view {
      display: flex;
      justify-content: flex-end;
      margin-block-end: 0.5rem;
    }
    .frame {
      position: relative;
      width: 100%;
    }
    .subtitle {
      display: flex;
      justify-content: space-between;
    }
  `,
})
export class ProductsDetailComponent {
  readonly product = input.required<Product | undefined>();

  onSelected = output<number | undefined>();
}
