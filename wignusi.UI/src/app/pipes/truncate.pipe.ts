import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    const limit =  (args[0]) ? args[0] : 16;
    if (value.length > limit)
      return value.substring(0, limit) + '...';
    return value;
  }

}
