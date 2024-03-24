import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'anyToText'
})
export class AnyToTextPipe implements PipeTransform {


  transform(value: any): string {
    if (value == null || value === 0) {
      return " ";
    }

    // Convierte el número en texto según tu lógica de formato
    const stringValue = value.toString();
    const formattedValue = stringValue.replace(/(\d{4})(\d{5})(\d{4})/, '$1 $2 $3');
    return formattedValue;
  }





}
