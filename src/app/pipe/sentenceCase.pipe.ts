import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeName'
})
export class CapitalizeNamePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    // Convierte todo el texto a minúsculas
    let lowercaseValue = value.toLowerCase();

    // Divide el texto en palabras
    const words = lowercaseValue.split(' ');

    // Capitaliza la primera letra de cada palabra excepto 'de' y une las palabras nuevamente
    const capitalizedWords = words.map(word => {
      if (word.length === 0 || word === 'de') return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Une las palabras nuevamente en un solo texto
    return capitalizedWords.join(' ');
  }
}
