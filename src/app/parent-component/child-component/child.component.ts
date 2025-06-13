import { NgClass, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HighlightDirective } from '@aut/directives/highlight.directive';
import { Product } from '@aut/model/product';
import { HyphenatePipe } from '@aut/pipes/hyphenate.pipe';
import { TranslationService } from '@aut/services/translation/translation.service';

@Component({
  selector: 'child-component',
  imports: [MatButtonModule, TitleCasePipe, HyphenatePipe, NgClass, HighlightDirective],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  public translationService = inject(TranslationService);

  public products = input.required<Product[]>();
  public productSelected = output<Product>();
}
