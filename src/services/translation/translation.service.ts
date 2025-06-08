import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations = {
    child: 'Child',
    'child.no-products': 'No products',
  };

  translate(key: keyof typeof this.translations): string {
    return this.translations[key];
  }
}
