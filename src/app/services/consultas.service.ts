import { tipo } from './../enums/enums';
import { FechaService } from 'src/app/services/fecha.service';
import { Injectable } from '@angular/core';
import { Iconcultas } from '../models/Iconsultas';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class ConsultasService {


 private urlapi = environment.apiUrl;
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



  filterConsultas(filtros: any): Observable<any> {
    // Inicializa una cadena vacía para la URL
    let url = `${this.urlapi}/filtro/`;

    // Construye la URL de manera dinámica agregando los filtros no vacíos
    if (filtros.id) {
      url += `?id=${filtros.id}`;
    }

    if (filtros.hoja_emergencia) {
      if (url.includes('?')) {
        url += `&hoja_emergencia=${filtros.hoja_emergencia}`;
      } else {
        url += `?hoja_emergencia=${filtros.hoja_emergencia}`;
      }
    }

    if (filtros.expediente) {
      if (url.includes('?')) {
        url += `&expediente=${filtros.expediente}`;
      } else {
        url += `?expediente=${filtros.expediente}`;
      }
    }

    if (filtros.fecha_consulta) {
      if (url.includes('?')) {
        url += `&fecha_consulta=${filtros.fecha_consulta}`;
      } else {
        url += `?fecha_consulta=${filtros.fecha_consulta}`;
      }
    }

    if (filtros.nombres) {
      if (url.includes('?')) {
        url += `&nombres=${filtros.nombres}`;
      } else {
        url += `?nombres=${filtros.nombres}`;
      }
    }

    if (filtros.apellidos) {
      if (url.includes('?')) {
        url += `&apellidos=${filtros.apellidos}`;
      } else {
        url += `?apellidos=${filtros.apellidos}`;
      }
    }

    if (filtros.dpi) {
      if (url.includes('?')) {
        url += `&dpi=${filtros.dpi}`;
      } else {
        url += `?dpi=${filtros.dpi}`;
      }
    }

    if (filtros.fecha_egreso) {
      if (url.includes('?')) {
        url += `&fecha_egreso=${filtros.fecha_egreso}`;
      } else {
        url += `?fecha_egreso=${filtros.fecha_egreso}`;
      }
    }

    if (filtros.tipo_consulta) {
      if (url.includes('?')) {
        url += `&tipo_consulta=${filtros.tipo_consulta}`;
      } else {
        url += `?tipo_consulta=${filtros.tipo_consulta}`;
      }
    }

    if (filtros.status) {
      if (url.includes('?')) {
        url += `&status=${filtros.status}`;
      } else {
        url += `?status=${filtros.status}`;
      }
    }



    console.log(filtros, url)
    // Realiza la solicitud GET con la URL construida dinámicamente
    return this.http.get(url);

  }

}







