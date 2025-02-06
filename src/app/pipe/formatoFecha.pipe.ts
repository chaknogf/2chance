import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoFecha'
})
export class FormatoFechaPipe implements PipeTransform {
  transform(fecha: string): string {
    if (!fecha) return ''; // Manejo de fecha nula o vacía

    // Divide la fecha en año, mes y día
    const partes = fecha.split('-');
    if (partes.length !== 3) return fecha; // Comprueba si la fecha tiene el formato esperado

    const [anio, mes, dia] = partes;

    // Formatea la fecha en el formato 'dd-MM-yyyy'
    return `${dia}-${mes}-${anio}`;
  }
}

@Pipe({
  name: 'FechaCarta'
})
export class FechaCartaPipe implements PipeTransform {
  transform(fecha: string): string {
    if (!fecha) return ''; // Manejo de fecha nula o vacía

    // Divide la fecha en año, mes y día
    const partes = fecha.split('-');
    if (partes.length !== 3) return fecha; // Comprueba si la fecha tiene el formato esperado

    const [anio, mes, dia] = partes;

    // Nombre del mes
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const nombreMes = meses[parseInt(mes) - 1];

    // Formatea la fecha en el formato 'dd de nombreMes de aaaa'
    return `${dia} de ${nombreMes} de ${anio}`;
  }
}
@Pipe({
  name: 'FechaCorta'
})
export class FechaCortaPipe implements PipeTransform {
  transform(fecha: string): string {
    if (!fecha) return ''; // Manejo de fecha nula o vacía

    // Divide la fecha en año, mes y día
    const partes = fecha.split('-');
    if (partes.length !== 3) return fecha; // Comprueba si la fecha tiene el formato esperado

    const [anio, mes, dia] = partes;

    // Nombre del mes
    const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const nombreMes = meses[parseInt(mes) - 1];

    // Formatea la fecha en el formato 'dd de nombreMes de aaaa'
    return `${dia} ${nombreMes} ${anio}`;
  }
}
