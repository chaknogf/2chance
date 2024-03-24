import { Pipe, PipeTransform } from '@angular/core';
import { CitasService } from '../services/citas.service';
import { IVistaCitas } from '../models/Icitas';

@Pipe({
  name: 'resumenCitas'
})
export class ResumenCitasPipe implements PipeTransform {

  constructor(private citaservice: CitasService) {}

  async transform(especialidad: number): Promise<IVistaCitas | undefined> {
    try {
      const data = await this.citaservice.getResumenCitas(especialidad).toPromise();
      return data;
    } catch (error) {
      console.error('Error en el pipe ResumenCitasPipe:', error);
      return undefined; // Puedes manejar el error según tus necesidades
    }
  }
}
