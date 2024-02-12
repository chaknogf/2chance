import { Pipe, PipeTransform } from '@angular/core';
import { MedicoService } from '../services/medico.service';


@Pipe({
  name: 'medicos'
})
export class MedicosPipe implements PipeTransform {

  constructor(private medicSe: MedicoService) {}

  async transform(colegiado: number): Promise<string> {
    try {
      const data = await this.medicSe.getMedicoCol(colegiado).toPromise();
      return data?.name || ''; // Si data es null o undefined, devolverá una cadena vacía
    } catch (error) {
      console.error('Error al obtener el médico:', error);
      return ''; // Devuelve una cadena vacía en caso de error
    }
  }
}

