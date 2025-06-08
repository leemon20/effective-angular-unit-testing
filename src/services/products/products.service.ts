import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  readonly #products = signal<Product[]>([
    { name: 'Product 1', selected: false },
    { name: 'Product 2', selected: false },
    { name: 'Product 3', selected: false },
  ]);

  public readonly products = computed(() => this.#products());

  public toggleSelection(product: Product): void {
    this.#products.update((products) =>
      products.map((p) => ({ ...p, selected: p === product ? !product.selected : false })),
    );
  }
}
