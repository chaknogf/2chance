import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexo'
})
export class GenderPipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'F') {
      return 'Femenino';
    } else if (value === 'M') {
      return 'Masculino';
    } else if (value === 'I') {
      return 'Indefinido';
    }
    return value; // Devolver el valor original si no es 'F' ni 'M'
  }
}
