import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '@aut/model/product';
import { TranslationService } from '@aut/services/translation/translation.service';

@Component({
  selector: 'child-component',
  imports: [MatButtonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  public translationService = inject(TranslationService);

  public products = input.required<Product[]>();
  public productSelected = output<Product>();
}
