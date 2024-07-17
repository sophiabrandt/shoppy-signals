import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { PaginatedProducts, Product } from '../interfaces/Product';
import {
  catchError,
  EMPTY,
  map,
  merge,
  of,
  shareReplay,
  Subject,
  switchMap,
} from 'rxjs';
import { connect } from 'ngxtension/connect';
import { toObservable } from '@angular/core/rxjs-interop';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  selectedProduct?: Product;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {
    this.setup();
  }

  private readonly http = inject(HttpClient);

  // state
  private state = signal<ProductsState>({
    products: [],
    loading: false,
  });

  // selectors
  products = computed(() => this.state().products);
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);
  selectedProduct = computed(() => this.state().selectedProduct);

  // actions
  private selectedProductId = signal<number | undefined>(undefined);

  // sources
  private error$ = new Subject<string | undefined>();
  private readonly products$ = this.http
    .get<PaginatedProducts>('https://dummyjson.com/products?limit=10&skip=0')
    .pipe(
      map((p) => ({ products: p.products as Product[], loading: false })),
      shareReplay({ bufferSize: 1, refCount: true }),
      catchError((error) => {
        this.handleError(error);
        return EMPTY;
      }),
    );
  private readonly product$ = toObservable(this.selectedProductId).pipe(
    switchMap((id) => {
      return !id
        ? of({ selectedProduct: undefined, loading: false })
        : this.http.get<Product>(`https://dummyjson.com/products/${id}`).pipe(
            map((p) => ({ selectedProduct: p, loading: false })),
            shareReplay({ bufferSize: 1, refCount: true }),
            catchError((error) => {
              this.handleError(error);
              return EMPTY;
            }),
          );
    }),
  );

  // reducers
  setup() {
    const nextState$ = merge(
      this.products$.pipe(
        map((p) => ({ products: p.products, loading: p.loading })),
      ),
      this.product$.pipe(
        map((p) => ({
          selectedProduct: p.selectedProduct,
          loading: p.loading,
        })),
      ),
      this.error$.pipe(map((error) => ({ error }))),
    );

    connect(this.state).with(nextState$);
  }

  productSelected(id: number | undefined) {
    this.selectedProductId.set(id);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404 && error.url) {
      this.error$.next(`Failed to load products`);
      return;
    }
    this.error$.next(error.statusText);
  }
}
