import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hyphenate',
  standalone: true,
})
export class HyphenatePipe implements PipeTransform {
  transform(value: string): string {
    return value.trim().toLowerCase().replace(/\s+/g, '-');
  }
}
