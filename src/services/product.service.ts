import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public readonly products: Product[] = [
    { name: 'Product 1', selected: false },
    { name: 'Product 2', selected: false },
    { name: 'Product 3', selected: false },
  ];
}
