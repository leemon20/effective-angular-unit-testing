import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  readonly #products = signal<Product[]>([
    { name: 'product 1', selected: false },
    { name: 'product 2', selected: false },
    { name: 'product 3', selected: false },
  ]);

  public readonly products = computed(() => this.#products());

  public toggleSelection(product: Product): void {
    this.#products.update((products) =>
      products.map((p) => ({ ...p, selected: p === product ? !product.selected : false })),
    );
  }
}
