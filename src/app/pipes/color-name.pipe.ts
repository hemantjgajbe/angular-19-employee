import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorName',
  standalone: true
})
export class ColorNamePipe implements PipeTransform {

  transform(value: string): string {
    return "ull";
  }

}
