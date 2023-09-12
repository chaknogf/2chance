import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diaDeSemana'
})
export class DiaDeSemana implements PipeTransform {
  transform(date: any): string {
    if (!date) return '';

    const diasSemana = [ 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'];
    const indiceDia = date.getDay(); // Obtiene el índice del día de la semana (0-6)

    return diasSemana[indiceDia];
  }
}

