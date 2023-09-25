import { FechaService } from 'src/app/services/fecha.service';
import { Injectable } from '@angular/core';
import { Iconcultas } from '../models/Iconsultas';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConsultasService {


  private urlapi = "http://localhost:8000";
  constructor(private http: HttpClient, private FechaService: FechaService) { }

  Consultas(): Observable<any> {
    return this.http.get(this.urlapi + "/consultas/")
  }

  Consulta(id: number): Observable<any> {
    return this.http.get(this.urlapi + "/consulta/?id=" + id)
  }

  registrar(consulta: Iconcultas): Observable<any> {
    return  this.http.post(this.urlapi + "/consultas/", consulta);
  }

  tipoConsulta(fecha: string, tipo: number): Observable<any> {
    return this.http.get(this.urlapi + "/consulta/servicio/?fecha=" + fecha + "&tipo=" + tipo);
  }

  editarConsulta(id: number, actualizarConsulta: Iconcultas): Observable<any> {
    return this.http.put(this.urlapi + '/consultado/' + id, actualizarConsulta);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(this.urlapi + '/consulta/' + id);
  }

  consultando(fecha: string, tipo: number, esp: number): Observable<any> {
    return this.http.get(this.urlapi + '/consultando/?fecha=' + fecha + '&tipo=' + tipo + '&especialidad=' + esp);
  }

  recepcion(id: number, recepcion: boolean, fecha: string): Observable<any> {

    const data = {
      recepcion: recepcion,
      fecha: fecha
    };
    return this.http.patch(this.urlapi + '/recepcion/' + id, data)
  }


}


