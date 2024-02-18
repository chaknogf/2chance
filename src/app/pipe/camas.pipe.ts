import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camas'
})
export class CamasPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}


@Pipe({
  name: 'estancia'
})
export class EstanciaPipe implements PipeTransform {

  transform(fechaEntrada: any, fechaSalida: any): string {
    const dateEntrada = new Date(fechaEntrada);
    const dateSalida = new Date(fechaSalida);

    // Calcula la diferencia en milisegundos
    const diferenciaMs = dateSalida.getTime() - dateEntrada.getTime();

    // Calcula la diferencia en días, redondeando hacia abajo
    const diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

    return `${diferenciaDias} días`;
  }

}
