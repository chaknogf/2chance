

import { Pipe, PipeDecorator, PipeTransform } from '@angular/core';
import {servicio, nation, municipio, etnias, ecivil,
  academic,  parents, lenguaje, servicios, tipo, status
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
      return ''
    }
    }
  }

  @Pipe({
    name: 'enumServicios'

  })
  export class EnumServiciosPipe implements PipeTransform {
    transform(value: number): string{
      const serviciosEncontrado = servicios.find(servicios => servicios.value === value);
      if (serviciosEncontrado) {
        return serviciosEncontrado.label;
      } else {
        return ''
      }
      }
    }

@Pipe({
    name: 'enumTipo'

  })
  export class EnumTipoPipe implements PipeTransform {
    transform(value: number): string{
      const tipoEncontrado = tipo.find(tipo => tipo.value === value);
      if (tipoEncontrado) {
        return tipoEncontrado.label;
      } else {
        return ''
      }
      }
    }
@Pipe({
  name: 'enumNacion'
})
export class EnumNacionalidadPipe implements PipeTransform {
  transform(value: number): string {
    const nacionalidadEncontrada = nation.find(nacionalidad => nacionalidad.value === value);

    if (nacionalidadEncontrada) {
      return nacionalidadEncontrada.label;
    } else {
      // Manejar el caso en el que no se encuentre la nacionalidad.
      return '';
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
      return ''
    }
  }
}

@Pipe({
  name: 'enumEducacion'
})
export class EnumEducacionPipe implements PipeTransform {
  transform(value: any): string {
    const educacionEncontrada = academic.find(educacion => educacion.value === value);
    if (educacionEncontrada) {
      return educacionEncontrada.label;
    } else {
      return ''
    }
  }
}

@Pipe({
  name: 'enumCivil'
})
export class EnumCivilPipe implements PipeTransform {
  transform(value: any): string {
    const estadoCivilEncontrado = ecivil.find(civil => civil.value === value);
    if (estadoCivilEncontrado) {
      return estadoCivilEncontrado.label;
    } else {
      return ''
    }
  }
}

@Pipe({
  name: 'enumIdioma'
})
export class EnumIdiomaPipe implements PipeTransform {
  transform(value: any): string {
    const idiomaEncontrado = lenguaje.find(idioma => idioma.value === value);
    if (idiomaEncontrado) {
      return idiomaEncontrado.label;
    } else {
      return ''
    }
  }
}

@Pipe({
  name: 'enumParentesco'
})
export class EnumParentescoPipe implements PipeTransform {
  transform(value: any): string {
    const parentescoEncontrado = parents.find(parentesco => parentesco.value === value);
    if (parentescoEncontrado) {
      return parentescoEncontrado.label;
    } else {
      return ''
    }
  }
}

@Pipe({
  name: 'enumEtnia'
})
export class EnumEtniaPipe implements PipeTransform {
  transform(value: any): string {
    const etniaEncontrado = etnias.find(pueblo => pueblo.value === value);
    if (etniaEncontrado) {
      return etniaEncontrado.label;
    } else {
      return ''
    }
  }
}

@Pipe({
  name: 'enumStatus'
})
export class EnumStatusPipe implements PipeTransform {
  transform(value: any): string {
    const statusEncontrado = status.find(status => status.value === value);
    if (statusEncontrado) {
      return statusEncontrado.label;
    } else {
      return ''
    }
  }
}
