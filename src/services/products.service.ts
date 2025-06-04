import { Injectable, signal } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public readonly products = signal<Product[]>([
    { name: 'Product 1', selected: false },
    { name: 'Product 2', selected: false },
    { name: 'Product 3', selected: false },
  ]);

  public markAsSelected(product: Product): void {
    this.products.update((products) => products.map((p) => ({ ...p, selected: p === product ? true : false })));
  }
}
