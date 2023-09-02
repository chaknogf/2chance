import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diaDeSemana'
})
export class DiaDeSemana implements PipeTransform {
  transform(date: Date): string {
    if (!date) return '';

    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const indiceDia = date.getDay(); // Obtiene el índice del día de la semana (0-6)

    return diasSemana[indiceDia];
  }
}
