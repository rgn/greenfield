import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'count'
})
export class CountPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === undefined) {
      return 0;
    }
    return value.length;
  }

}
