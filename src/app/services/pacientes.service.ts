import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs';
import { Ipaciente } from '../models/Ipaciente';

interface nuevoExpResponse{
  nuevo_exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  //private urlapi = "http://localhost:8000";
  private urlapi = "http://192.88.1.191:8000";
  //private urlapi = "https://pb2r222j-8000.use2.devtunnels.ms/";
  constructor(private http: HttpClient) { }

  getPacientes(): Observable<any> {
    return this.http.get(this.urlapi + "/pacientes");
  }

  getPaciente(exp: number): Observable<any> {
    return this.http.get(this.urlapi + "/paciente/" + exp);
  }

  getExpe(exp: number): Observable<any> {
    return this.http.get(this.urlapi + "/paciente/" + exp);
  }


  getNombre(nombre: string, apellido: string): Observable<any> {
    const queryParams = `?nombre=${nombre}&apellido=${apellido}`;
    return this.http.get(`${this.urlapi}/pacientefind/${queryParams}`);
  }

  getIdPaciente(id: number): Observable<any> {
    const queryParams = `?id=${id}`;
    return this.http.get(`${this.urlapi}/pacienteId/${queryParams}`);
  }

  getdpi(cui: number): Observable<any> {
    const queryParams = `?cui=${cui}`;
    return this.http.get(`${this.urlapi}/dpi/${queryParams}`);
  }

  crearPaciente(paciente: Ipaciente): Observable<any>{
    return this.http.post(this.urlapi + "/paciente/", paciente);
  }

  editPaciente(exp: number, updateP: Ipaciente): Observable<any>{
    return this.http.put(this.urlapi + "/paciente/" + exp, updateP);
  }

  deletePaciente(id: number): Observable<any>{
    return this.http.delete(this.urlapi + "/borrarpaciente/" + id);
  }

  Expediente(): Observable<any> {
    return interval(900).pipe(
      switchMap(() => this.http.get(this.urlapi + '/expediente'))
    );
  }



}

