import { Component, inject } from '@angular/core';
import { Product } from '@aut/model/product';
import { ProductsService } from '@aut/services/products.service';
import { ChildComponent } from './child-component/child.component';

@Component({
  selector: 'app-parent-component',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent {
  readonly productsService = inject(ProductsService);

  public onProductSelected(product: Product): void {
    this.productsService.markAsSelected(product);

    console.log(this.onProductSelected.name, product, this.productsService.products());
  }
}
