import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekday'
})
export class WeekdayPipe implements PipeTransform {
  transform(dateString: string): string {
    // Crear una nueva instancia de Date a partir de la cadena de fecha
    const date = new Date(dateString);

    // Días de la semana en un arreglo
    const daysOfWeek = [ 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo',];

    // Obtener el día de la semana (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
    const dayOfWeekIndex = date.getDay();

    // Devolver el nombre del día de la semana
    return daysOfWeek[dayOfWeekIndex];
  }
}
