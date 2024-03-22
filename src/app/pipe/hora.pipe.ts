import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoHora'
})
export class FormatoHoraPipe implements PipeTransform {
  transform(hora: string): string {
    if (!hora) return ''; // Manejo de hora nula o vacía

    const partes = hora.split(':'); // Divide la hora en partes

    // Extrae las horas y los minutos
    let horas = parseInt(partes[0]);
    let minutos = parseInt(partes[1]);

    // Ajusta los minutos si hay un valor incorrecto
    const minutosStr = minutos < 10 ? '0' + minutos : minutos.toString(); // Agrega un cero al principio si los minutos son de un solo dígito

    // Construye la cadena de formato
    const resultado = `${horas}:${minutosStr} horas` ;

    return resultado;
  }
}
