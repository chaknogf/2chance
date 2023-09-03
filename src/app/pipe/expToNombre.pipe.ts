import { PacientesService } from 'src/app/services/pacientes.service';
import { Pipe, PipeTransform } from '@angular/core';
import { Ipaciente } from '../models/Ipaciente';

@Pipe({
  name: 'expeToNombre'
})
export class ExpedienteToNombrePipe implements PipeTransform {
  constructor(private pacientesService: PacientesService) {}

  public patient: Ipaciente | undefined;

  async transform(expediente: number): Promise<string> {
    // Utiliza async/await para esperar a que la llamada al servicio se complete
    try {
      const data = await this.pacientesService.getPaciente(expediente).toPromise();
      if (data) {
        this.patient = data;
        return `${this.patient?.nombre} ${this.patient?.apellido}`;
      }
    } catch (error) {
      console.error(error);
    }

    // Devuelve una cadena vacía si no se encuentra el paciente
    return '';
  }
}
