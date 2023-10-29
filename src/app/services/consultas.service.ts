import { FechaService } from 'src/app/services/fecha.service';
import { Injectable } from '@angular/core';
import { Iconcultas } from '../models/Iconsultas';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConsultasService {


  // private urlapi = "http://localhost:8000";
  // private urlapi = "http://192.88.1.191:8000";
  private urlapi = "http://192.168.0.4:8000";
  constructor(private http: HttpClient, private FechaService: FechaService) { }

  Consultas(): Observable<any> {
    return this.http.get(this.urlapi + "/consultas/")
  }

  Consulta(id: number): Observable<any> {
    return this.http.get(this.urlapi + "/consulta/?id=" + id)
  }

  crear(consulta: Iconcultas): Observable<any> {
    return  this.http.post(this.urlapi + "/consultas/", consulta);
  }

  registrar(consulta: Iconcultas): Observable<any> {
    return  this.http.post(this.urlapi + "/consulta/", consulta);
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

  consulTipo(tipo: number): Observable<any> {
    return this.http.get(this.urlapi + '/consult/?tipo=' + tipo)
  }

  expediente(exp: number): Observable<any> {
    return this.http.get(this.urlapi + '/exp/' + exp)
  }

  nombre(nombre: string, apellido: string): Observable<any> {
    return this.http.get(this.urlapi + '/nombre/?nombre=' + nombre + '&apellido='+ apellido)
  }

  dpi(dpi: string): Observable<any> {
    return this.http.get(this.urlapi + '/cui/' + dpi)
  }

  egresos(inicio: string, final: string): Observable<any> {
    return this.http.get(this.urlapi + '/egresos/?fecha_inicio=' + inicio + '&fecha_final=' + final)
  }

  recepciones(estado: string, fecha: string): Observable<any> {
    return this.http.get( this.urlapi + '/recepcion/?recepcion=' + estado + 'fecha=' + fecha)
  }

  hoja(hoja: string): Observable<any> {
    return this.http.get(this.urlapi + '/hoja/' +  hoja)
  }






}


