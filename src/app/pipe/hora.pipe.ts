import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoHora'
})
export class FormatoHoraPipe implements PipeTransform {
  transform(hora: string): string {
    if (!hora) return ''; // Manejo de hora nula o vacía

    const partes = hora.split(':'); // Divide la hora en partes

    // Extrae las horas y los minutos
    const horas = parseInt(partes[0]);
    const minutos = parseInt(partes[1]);

    // Construye la cadena de formato
    let resultado = `${horas} horas`;

    // Agrega los minutos si existen
    if (minutos > 0) {
      resultado += ` ${minutos} minutos`;
    }

    return resultado;
  }
}
