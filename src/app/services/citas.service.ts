import { Icitas } from './../models/Icitas';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs';
import { Ipaciente } from '../models/Ipaciente';

@Injectable({
  providedIn: 'root'
})


export class CitasService {



  private urlapi = "http://localhost:8000";
  constructor(private http: HttpClient) { }


  getCitas(): Observable<any> {
    return this.http.get(this.urlapi + "/citas/")
  }

  getCitasHoy(): Observable<any> {
    return this.http.get(this.urlapi + "/cita/hoy/")
  }

  getCita(id: number): Observable<any> {
    return this.http.get(this.urlapi + "/cita/id/?value=" + id)
  }

  agendar(cita: Icitas): Observable<any>{
    return this.http.post(this.urlapi + "/cita/", cita);
   }

  getCitasFecha(date: Date): Observable<any> {
    const queryParams = `?value=${date}`;
    return this.http.get(`${this.urlapi}/cita/fecha/${queryParams}`);
  }

  getCitaTabla(fecha: string, especialidad: number): Observable<any> {
    const queryParams = `?data=${fecha}&especialidad=${especialidad}`;
    return this.http.get(`${this.urlapi}/cita/tabla/${queryParams}`)
  }

  getCitaMedi(fecha: string): Observable<any> {
    return this.http.get(this.urlapi + "/cita/tabla/?data=" + fecha + "&especialidad=1");

    console.log()
  }

  getCitaPedia(fecha: string): Observable<any> {
    return this.http.get(this.urlapi + "/cita/tabla/?data=" + fecha + "&especialidad=2");
  }

  getCitaGine(fecha: string): Observable<any> {
    return this.http.get(this.urlapi + "/cita/tabla/?data=" + fecha + "&especialidad=3");
  }

  getCitaCiru(fecha: string): Observable<any> {
    return this.http.get(this.urlapi + "/cita/tabla/?data=" + fecha + "&especialidad=4");
  }

  getCitaTrauma(fecha: string): Observable<any> {
    return this.http.get(this.urlapi + "/cita/tabla/?data=" + fecha + "&especialidad=5");
  }
  getCitaPsico(fecha: string): Observable<any> {
    return this.http.get(this.urlapi + "/cita/tabla/?data=" + fecha + "&especialidad=6");
  }

  getCitaNutri(fecha: string): Observable<any> {
    return this.http.get(this.urlapi + "/cita/tabla/?data=" + fecha + "&especialidad=7");
  }

  getResumenCitas(value: number): Observable<any> {
    return this.http.get(this.urlapi + "/cita/servicio/?especialidad=" + value)
  }

  editarCita(id: number, actualizarCita: Icitas): Observable<any>{
    return this.http.put(this.urlapi + "/citas/" + id, actualizarCita)
  }

  borrarCita(id: number): Observable<any>{
    return this.http.delete(this.urlapi + "/borrar/" + id);
  }


}
