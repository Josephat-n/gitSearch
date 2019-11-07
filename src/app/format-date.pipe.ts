import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: any): Date {
    let date = new Date(value);
    let dateWithNoTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return dateWithNoTime;
   }
}
