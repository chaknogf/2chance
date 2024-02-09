import { Icitas } from './../models/Icitas';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { UsersService } from './user.service';

@Injectable({
  providedIn: 'root'
})



export class CitasService {




  private token = this.auth.getTokenLocally(); // Obtén el token almacenado
  private urlapi = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private auth: UsersService
  ) { }


  getCitas(): Observable<any> {
    return this.http.get(this.urlapi + "/citas/"+"?token="+this.token)
  }

  getCitasHoy(): Observable<any> {
    return this.http.get(this.urlapi + "/cita/hoy/"+"?token="+this.token)
  }

  getCita(id: number): Observable<any> {
    return this.http.get(this.urlapi + "/cita/id/?value=" + id+"&token="+this.token)
  }

  agendar(cita: Icitas): Observable<any>{
    return this.http.post(this.urlapi + "/cita/?token=" + this.token, cita);

   }

   especial(cita: Icitas): Observable<any>{
    return this.http.post(this.urlapi + "/citaespecial/?token=" + this.token, cita);

   }

  getCitasFecha(date: Date): Observable<any> {
    const queryParams = `?value=${date}&token=${this.token}`;
    return this.http.get(`${this.urlapi}/cita/fecha/${queryParams}`);
  }

  getCitaTabla(fecha: string, especialidad: number): Observable<any> {
    const queryParams = `?data=${fecha}&especialidad=${especialidad}&token=${this.token}`;
    return this.http.get(`${this.urlapi}/cita/tabla/${queryParams}`)
  }

  getCitaMedi(fecha: string): Observable<any> {
    return this.http.get(this.urlapi + "/cita/tabla/?data=" + fecha + "&especialidad=1"+"&token="+this.token);
  }

  getCitaMediEspc(fecha: string): Observable<any> {
    return this.http.get(this.urlapi + "/cita/tabla/?data=" + fecha + "&especialidad=9"+"&token="+this.token);
  }

  getCitaPedia(fecha: string): Observable<any> {
    return this.http.get(this.urlapi + "/cita/tabla/?data=" + fecha + "&especialidad=2"+"&token="+this.token);
  }

  getCitaGine(fecha: string): Observable<any> {
    return this.http.get(this.urlapi + "/cita/tabla/?data=" + fecha + "&especialidad=3"+"&token="+this.token);
  }

  getCitaCiru(fecha: string): Observable<any> {
    return this.http.get(this.urlapi + "/cita/tabla/?data=" + fecha + "&especialidad=4"+"&token="+this.token);
  }

  getCitaTrauma(fecha: string): Observable<any> {
    return this.http.get(this.urlapi + "/cita/tabla/?data=" + fecha + "&especialidad=5"+"&token="+this.token);
  }
  getCitaPsico(fecha: string): Observable<any> {
    return this.http.get(this.urlapi + "/cita/tabla/?data=" + fecha + "&especialidad=6"+"&token="+this.token);
  }

  getCitaNutri(fecha: string): Observable<any> {
    return this.http.get(this.urlapi + "/cita/tabla/?data=" + fecha + "&especialidad=7"+"&token="+this.token);
  }

  getCitaObst(fecha: string): Observable<any> {
    return this.http.get(this.urlapi + "/cita/tabla/?data=" + fecha + "&especialidad=8"+"&token="+this.token);
  }

  getResumenCitas(value: number): Observable<any> {
    return this.http.get(this.urlapi + "/cita/servicio/?especialidad=" + value+"&token="+this.token)
  }

  editarCita(id: number, actualizarCita: Icitas): Observable<any>{
    return this.http.put(this.urlapi + "/citas/" + id+"?token="+this.token, actualizarCita)
  }

  borrarCita(id: number): Observable<any>{
    return this.http.delete(this.urlapi + "/borrar/" + id+"?token="+this.token);
  }

  getVigentes(especialidad: number): Observable<any> {
    return this.http.get(this.urlapi + "/citasVigentes?especialidad=" + especialidad + "&token=" + this.token)
  }


}
