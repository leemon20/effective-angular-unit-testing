import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '@aut/model/product';

@Component({
  selector: 'child-component',
  imports: [MatButtonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
})
export class ChildComponent {
  public products = input.required<Product[]>();
  public productSelected = output<Product>();
}
