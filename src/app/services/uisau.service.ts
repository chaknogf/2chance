import { tipo, serv, servicio } from './../enums/enums';
import { FechaService } from 'src/app/services/fecha.service';
import { Injectable } from '@angular/core';
import { Iconcultas } from '../models/Iconsultas';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { UsersService } from './user.service';
import { Iuisau } from '../models/Iuisau';

@Injectable({
  providedIn: 'root'
})
export class UisauService {

  private token = this.auth.getTokenLocally(); // Obtén el token almacenado
  private urlapi = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private FechaService: FechaService,
    private auth: UsersService
  ) { }

  Infos(): Observable<any> {
    return this.http.get(this.urlapi + "/uisau/?token=" + this.token)
  }

  InfoId(id: number): Observable<any> {
    return this.http.get(this.urlapi + "/registro/?id=" + id + '&token=' + this.token)
  }

  InfoConsulta(consulta: number): Observable<any> {
    return this.http.get(this.urlapi + "/infos/?consulta=" + consulta + '&token=' + this.token)
  }

  resumen(fecha: string, servicio: number): Observable<any> {
    // Modificando la URL para incluir tanto la fecha como el servicio
    return this.http.get(this.urlapi + "/resumen_uisau/?fecha=" + fecha + '&servicio=' + servicio + '&token=' + this.token);
  }

  filterInfos(filtros: any): Observable<any> {
    // Inicializa una cadena vacía para la URL
    let url = `${this.urlapi}/filter/`;

    // Construye la URL de manera dinámica agregando los filtros no vacíos
    if (filtros.id) {
      url += `?id=${filtros.id}`;
    }

    if (filtros.id_consulta) {
      if (url.includes('?')) {
        url += `&id_consulta=${filtros.id_consulta}`;
      } else {
        url += `?id_conyslta=${filtros.id_consulta}`;
      }
    }

    if (filtros.estado) {
      if (url.includes('?')) {
        url += `&estado=${filtros.estado}`;
      } else {
        url += `?estado=${filtros.estado}`;
      }
    }

    if (filtros.expediente) {
      if (url.includes('?')) {
        url += `&expediente=${filtros.expediente}`;
      } else {
        url += `?expediente=${filtros.expediente}`;
      }
    }

    if (filtros.fecha) {
      if (url.includes('?')) {
        url += `&fecha=${filtros.fecha}`;
      } else {
        url += `?fecha=${filtros.fecha}`;
      }
    }

    if (filtros.fecha_contacto) {
      if (url.includes('?')) {
        url += `&fecha=${filtros.fecha_contacto}`;
      } else {
        url += `?fecha=${filtros.fecha_contacto}`;
      }
    }

    if (filtros.apellidos) {
      if (url.includes('?')) {
        url += `&apellidos=${filtros.apellidos}`;
      } else {
        url += `?apellidos=${filtros.apellidos}`;
      }
    }

    if (filtros.nombres) {
      if (url.includes('?')) {
        url += `&nombres=${filtros.nombres}`;
      } else {
        url += `?nombres=${filtros.nombres}`;
      }
    }

    if (filtros.fecha_referencia) {
      if (url.includes('?')) {
        url += `&fecha_referencia=${filtros.fecha_referencia}`;
      } else {
        url += `?fecha_fecha_referencia=${filtros.fecha_referencia}`;
      }
    }

    if (filtros.fecha_recepcion) {
      if (url.includes('?')) {
        url += `&fecha_egreso=${filtros.fecha_recepcion}`;
      } else {
        url += `?fecha_egreso=${filtros.fecha_recepcion}`;
      }
    }

    if (filtros.lugar_referencia) {
      if (url.includes('?')) {
        url += `&tipo_consulta=${filtros.tipo_consulta}`;
      } else {
        url += `?tipo_consulta=${filtros.tipo_consulta}`;
      }
    }

    if (filtros.usuario) {
      if (url.includes('?')) {
        url += `&usuario=${filtros.usuario}`;
      } else {
        url += `?usuario=${filtros.usuario}`;
      }
    }

    if (filtros.estadia) {
      if (url.includes('?')) {
        url += `&estadia=${filtros.estadia}`;
      } else {
        url += `?estatus=${filtros.estadia}`;
      }
    }

    if (filtros.servicio) {
      if (url.includes('?')) {
        url += `&servicio=${filtros.servicio}`;
      } else {
        url += `?servicio=${filtros.servicio}`;
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

  crear(info: Iuisau): Observable<any> {
    return this.http.post(this.urlapi + "/uisausave/?token=" + this.token, info);
  }

  editar(id: number, actualizar: Iuisau): Observable<any> {
    return this.http.put(this.urlapi + '/uisauedit?id=' + id + "&token=" + this.token, actualizar);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(this.urlapi + '/uisaudelet/' + id + "?token=" + this.token);
  }

}
