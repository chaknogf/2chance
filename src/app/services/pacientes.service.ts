import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs';
import { Ipaciente } from '../models/Ipaciente';
import { environment } from 'src/enviroments/enviroment';
import { UsersService } from './user.service';

interface nuevoExpResponse{
  nuevo_exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private urlapi = environment.apiUrl;
  private token = this.auth.getTokenLocally(); // Obtén el token almacenado

  constructor(
    private http: HttpClient,
    private auth: UsersService
  ) { }

  getPacientes(): Observable<any> {

    return this.http.get(this.urlapi + "/pacientes?token="+ this.token);
  }




  getPaciente(exp: number): Observable<any> {

    return this.http.get(this.urlapi + "/paciente/" + exp + "?token=" + this.token);
  }

  getExpe(exp: number): Observable<any> {
    return this.http.get(this.urlapi + "/paciente/" + exp);
  }


  getNombre(nombre: string, apellido: string): Observable<any> {
    const queryParams = `?nombre=${nombre}&apellido=${apellido}&token=${this.token}`;
    return this.http.get(`${this.urlapi}/pacientefind/${queryParams}`);
  }

  getIdPaciente(id: number): Observable<any> {

    return this.http.get(this.urlapi + "/pacienteId/?id=" + id + "&token="+this.token);
  }

  getdpi(cui: number): Observable<any> {
    const queryParams = `?cui=${cui}&token=${this.token}`;
    return this.http.get(`${this.urlapi}/dpi/${queryParams}`);
  }

  crearPaciente(paciente: Ipaciente): Observable<any>{
    return this.http.post(this.urlapi + "/paciente/?token="+this.token, paciente);
  }

  editPaciente(exp: number, updateP: Ipaciente): Observable<any>{
    return this.http.put(this.urlapi + "/paciente/" + exp + "?token=" + this.token, updateP);
  }

  deletePaciente(id: number): Observable<any>{
    return this.http.delete(this.urlapi + "/borrarpaciente/" + id + "?token=" + this.token);
  }

  Expediente(): Observable<any> {
    return interval(900).pipe(
      switchMap(() => this.http.get(this.urlapi + '/expediente' +"?token=" + this.token))
    );
  }



}

