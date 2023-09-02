import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genero'
})
export class GeneroPipe implements PipeTransform {
  transform(valor: string): string {
    if (valor === 'F') {
      return 'Femenino';
    } else if (valor === 'M') {
      return 'Masculino';
    } else {
      return valor; // Devuelve el valor original si no es 'F' ni 'M'
    }
  }
}
