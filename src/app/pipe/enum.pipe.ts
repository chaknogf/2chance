
import { Pipe, PipeDecorator, PipeTransform } from '@angular/core';
import {
  Especialidad, servicio, Nacionalidad, nacionalidades,
  Municipio, municipio, Etnias, etnias, Ecivil, ecivil, Academic,
  academic, Parents, parents, Lenguage, lenguaje
} from '../enums/enums';

@Pipe({
  name: 'enumEspecialidad'

})
export class EnumEspecialidadPipe implements PipeTransform {
  transform(value: number): string{
    const servicioEncontrado = servicio.find(servicio => servicio.value === value);
    if (servicioEncontrado) {
      return servicioEncontrado.label;
    } else {
      return 'Servicio No encontrado'
    }
    }
  }

@Pipe({
  name: 'enumNacion'
})
export class EnumNacionalidadPipe implements PipeTransform {
  transform(value: number): string {
    const nacionalidadEncontrada = nacionalidades.find(nacionalidad => nacionalidad.value === value);

    if (nacionalidadEncontrada) {
      return nacionalidadEncontrada.label;
    } else {
      // Manejar el caso en el que no se encuentre la nacionalidad.
      return 'Nacionalidad Desconocida';
    }
  }
}

@Pipe({
  name: 'enumMunicipio'
})
export class EnumMunicipioPipe implements PipeTransform {
  transform(value: number): string {
    const municipioEncontrado = municipio.find(municipio => municipio.value === value);
    if (municipioEncontrado) {
      return municipioEncontrado.label;
    } else {
      return 'Municipio no encontrado'
    }
  }
}
