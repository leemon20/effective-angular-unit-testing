import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Product } from '@aut/model/product';
import { ProductsService } from '@aut/services/products/products.service';
import { ChildComponent } from './child-component/child.component';

@Component({
  selector: 'parent-component',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentComponent {
  readonly productsService = inject(ProductsService);

  public onProductSelected(product: Product): void {
    this.productsService.toggleSelection(product);
  }
}
