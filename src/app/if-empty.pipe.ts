import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ifEmpty'
})
export class IfEmptyPipe implements PipeTransform {

  transform(value: any, defaultValue: any): any {
    if (value === undefined || value === null || value === '') {
      return defaultValue;
    }

    return value;
  }

}