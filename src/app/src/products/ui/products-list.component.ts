import { Component, input } from '@angular/core';
import { Product } from '../interfaces/Product';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [],
  template: `
    <table>
      <thead>
        <tr>
          <th scope="col">SKU</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        @for (product of products(); track product.id) {
          <tr>
            <td>{{ product.sku }}</td>
            <td>{{ product.title }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: `
    td {
      cursor: pointer;
    }
  `,
})
export class ProductsListComponent {
  readonly products = input.required<Product[]>();
}
