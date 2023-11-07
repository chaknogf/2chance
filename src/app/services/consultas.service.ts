import { tipo } from './../enums/enums';
import { FechaService } from 'src/app/services/fecha.service';
import { Injectable } from '@angular/core';
import { Iconcultas } from '../models/Iconsultas';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { UsersService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  private token = this.auth.getTokenLocally(); // Obtén el token almacenado
  private urlapi = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private FechaService: FechaService,
    private auth: UsersService
  ) { }

  Consultas(): Observable<any> {
    return this.http.get(this.urlapi + "/consultas/?token=" + this.token)
  }

  Consulta(id: number): Observable<any> {
    return this.http.get(this.urlapi + "/consulta/?id=" + id + '&token=' + this.token)
  }

  crear(consulta: Iconcultas): Observable<any> {
    return  this.http.post(this.urlapi + "/coex/?token="+ this.token, consulta);
  }

  registrar(consulta: Iconcultas): Observable<any> {
    return  this.http.post(this.urlapi + "/emergencia/?token="+this.token, consulta);
  }

  tipoConsulta(fecha: string, tipo: number): Observable<any> {
    return this.http.get(this.urlapi + "/consulta/servicio/?fecha=" + fecha + "&tipo=" + tipo+"&token="+this.token);
  }

  editarConsulta(id: number, actualizarConsulta: Iconcultas): Observable<any> {
    return this.http.put(this.urlapi + '/consultado/' + id+"?token="+ this.token, actualizarConsulta);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(this.urlapi + '/consulta/' + id+"?token="+this.token);
  }

  consultando(fecha: string, tipo: number, esp: number): Observable<any> {
    return this.http.get(this.urlapi + '/consultando/?fecha=' + fecha + '&tipo=' + tipo + '&especialidad=' + esp+ '&token='+this.token);
  }

  consulTipo(tipo: number): Observable<any> {
    return this.http.get(this.urlapi + '/consult/?tipo=' + tipo + "&token="+this.token)
  }

  expediente(exp: number): Observable<any> {
    return this.http.get(this.urlapi + '/exp/' + exp)
  }

  nombre(nombre: string, apellido: string): Observable<any> {
    return this.http.get(this.urlapi + '/nombre/?nombre=' + nombre + '&apellido='+ apellido + '&token='+this.token)
  }

  dpi(dpi: string): Observable<any> {
    return this.http.get(this.urlapi + '/cui/' + dpi+'&token='+this.token)
  }

  egresos(inicio: string, final: string): Observable<any> {
    return this.http.get(this.urlapi + '/egresos/?fecha_inicio=' + inicio + '&fecha_final=' + final+'&token='+this.token)
  }

  recepciones(estado: string, fecha: string): Observable<any> {
    return this.http.get( this.urlapi + '/recepcion/?recepcion=' + estado + 'fecha=' + fecha + '&token='+ this.token)
  }

  hoja(hoja: string): Observable<any> {
    return this.http.get(this.urlapi + '/hoja/' +  hoja + '?token='+this.token)
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

    if (filtros) {
      if (url.includes('?')) {
        url += `&token=${this.token}`;
      } else {
        url += `?token=${this.token}`;
      }
    }


    console.log(filtros, url)
    // Realiza la solicitud GET con la URL construida dinámicamente
    return this.http.get(url);

  }

}







