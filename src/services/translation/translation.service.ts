import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations = {
    child: 'Child',
  };

  translate(key: keyof typeof this.translations): string {
    return this.translations[key];
  }
}
