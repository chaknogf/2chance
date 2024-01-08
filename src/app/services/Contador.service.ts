import { Especialidad } from './../enums/enums';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContadorService {
  private contadorSource = new BehaviorSubject<number>(0);
  private especialidadSource = new BehaviorSubject<number>(0);
  contador$ = this.contadorSource.asObservable();
  especialidad$ = this.especialidadSource.asObservable();

  actualizarContador(contador: number) {
    this.contadorSource.next(contador);
  }

  repetirEspecialidad(especialidad: number) {
    this.especialidadSource.next(especialidad);
  }


}
