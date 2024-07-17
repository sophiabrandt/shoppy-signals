import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { PaginatedProducts, Product } from '../interfaces/Product';
import { catchError, EMPTY, map, merge, shareReplay, Subject } from 'rxjs';
import { connect } from 'ngxtension/connect';

export interface ProductsState {
  products: Product[];
  loading: boolean;
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

  // reducers
  setup() {
    const nextState$ = merge(
      this.products$.pipe(
        map((p) => ({ products: p.products, loading: p.loading })),
      ),
      this.error$.pipe(map((error) => ({ error }))),
    );

    connect(this.state).with(nextState$);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404 && error.url) {
      this.error$.next(`Failed to load products`);
      return;
    }
    this.error$.next(error.statusText);
  }
}
