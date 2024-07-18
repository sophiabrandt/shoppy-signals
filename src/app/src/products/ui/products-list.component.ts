import { Component, input, output } from '@angular/core';
import { Product } from '../interfaces/Product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (!products().length) {
      <article>
        <p>No data</p>
      </article>
    } @else {
      <table>
        <thead>
          <tr>
            <th scope="col">SKU</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          @for (product of products(); track product.id) {
            <tr
              routerLink="/products/{{ product.id }}"
              [class]="selectedProduct()?.id === product.id ? 'selected' : ''"
              (click)="onSelected.emit(product.id)"
            >
              <td>{{ product.sku }}</td>
              <td>{{ product.title }}</td>
            </tr>
          }
        </tbody>
      </table>
    }
  `,
  styles: `
    td {
      cursor: pointer;
    }

    .selected {
      background-color: var(--chimera-css-blues__color-focus);
    }
  `,
})
export class ProductsListComponent {
  readonly products = input.required<Product[]>();
  readonly selectedProduct = input.required<Product | undefined>();

  onSelected = output<number | undefined>();
}
