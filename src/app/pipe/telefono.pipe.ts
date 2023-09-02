import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhone'
})

export class FortmatPhone implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (typeof value !== 'string') {
      return value;
    }

    // Eliminar todos los caracteres excepto números y espacios
    const numericAndSpaceValue = value.replace(/[^\d\s]/g, '');

    // Dividir en grupos de 8 caracteres y unir con espacio
    const formattedValue = numericAndSpaceValue.replace(/(\d{8})(?=\d)/g, '$1 ');

    return formattedValue;
  }
}
