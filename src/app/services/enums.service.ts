import { Injectable } from '@angular/core';
import { departamentos, municipio, vecindad } from '../enums/vencindad';

@Injectable({
  providedIn: 'root'
})
export class EnumsService {

  constructor() { }

  Deptos(value: number): string {
    const deptoEncontrado = departamentos.find(depto => depto.value === value);
    if (deptoEncontrado) {
      return deptoEncontrado.label;
    } else {
      return ''
    }
  }

  Munis(value: number): string {
    const municipioEncontrado = municipio.find(municipio => municipio.value === value);
    if (municipioEncontrado) {
      return municipioEncontrado.label;
    } else {
      return ''
    }
  }

  Vecin(value: number): string {
    const vecindadEncontrado = vecindad.find(vecindad => vecindad.value === value);
    if (vecindadEncontrado) {
      return vecindadEncontrado.label;
    } else {
      return ''
    }
  }

}
