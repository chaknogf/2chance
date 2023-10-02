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

  recepcion(id: number, estado: string, registro: string): Observable<any> {

    const body = { id: id, recepcion: estado, fecha_recepcion: registro}

    return this.http.patch(this.urlapi + '/recepcion/'+id+'?fecha_recep='+registro+'&recep='+estado, body );
  }


}


// /recepcion/3?fecha_recep=2023-10-01T18%3A43%3A00&recep=true
