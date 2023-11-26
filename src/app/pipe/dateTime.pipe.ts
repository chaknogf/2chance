import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const parts = value.split('T');
    const datePart = parts[0];
    const timePart = parts[1]?.slice(0, 8);

    const [year, month, day] = datePart.split('-');
    const [hours, minutes, seconds] = timePart.split(':');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }
}



