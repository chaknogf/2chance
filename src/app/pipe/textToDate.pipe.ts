import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textToDate'
})
export class TextToDatePipe implements PipeTransform {
  transform(text: any ): Date | null {
    if (!text) {
      return null; // Devuelve null si el texto es vacío o nulo.
    }

    const parsedDate = new Date(text);

    if (isNaN(parsedDate.getTime())) {
      return null; // Devuelve null si no se pudo analizar el texto como una fecha válida.
    }

    return parsedDate;
  }
}
