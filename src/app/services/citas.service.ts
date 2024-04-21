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



  getCitasFecha(date: Date): Observable<any> {
    const queryParams = `?value=${date}&token=${this.token}`;
    return this.http.get(`${this.urlapi}/cita/fecha/${queryParams}`);
  }

  getCitaTabla(fecha: string, especialidad: number, tipo: number): Observable<any> {
    const queryParams = `?fecha=${fecha}&especialidad=${especialidad}&tipo=${tipo}&token=${this.token}`;
    return this.http.get(`${this.urlapi}/cita/tabla/${queryParams}`)
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

  getVigentes(especialidad: number, tipo: number): Observable<any> {
    const queryParams = `?especialidad=${especialidad}&tipo=${tipo}&token=${this.token}`
    return this.http.get(`${this.urlapi}/citasVigentes${queryParams}`)

  }

  getCitasOcupadas(especialidad: number, tipo: number, fecha: string): Observable<any> {
    const queryParams = `?especialidad=${especialidad}&tipo=${tipo}&fecha=${fecha}&token=${this.token}`
    return this.http.get(`${this.urlapi}/citas_disponible${queryParams}`)

  }


  diaSemana(date: any): string {
      if (!date) return '';

      const diasSemana = [ 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'];
      const indiceDia = date.getDay(); // Obtiene el índice del día de la semana (0-6)

      return diasSemana[indiceDia];
  }


}
