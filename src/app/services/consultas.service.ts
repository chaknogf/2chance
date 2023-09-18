import { Injectable } from '@angular/core';
import { Iconcultas } from '../models/Iconsultas';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConsultasService {


  private urlapi = "http://localhost:8000";
  constructor(private http: HttpClient) { }

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

}
