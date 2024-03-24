import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'anyToNumber'
})
export class AnyToNumberPipe implements PipeTransform {

  transform(value: any): number | any {
    if (typeof value === 'number') {
      return value; // Si ya es un número, devolverlo tal cual.
    } else if (typeof value === 'string') {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        return numericValue;
      }
    }

    return null; // Devolver null si no se puede convertir a número.
  }
}
