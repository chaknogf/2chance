import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, switchMap } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { UsersService } from './user.service';
import { IconsNac } from '../models/IconsNac';


@Injectable({
  providedIn: 'root'
})
export class CNacService {

  private token = this.auth.getTokenLocally(); // Obtén el token almacenado
  private urlapi = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private auth: UsersService
  ) { }

  getConstancias(): Observable<any> {
  return this.http.get(this.urlapi + "/consnac/" + "?token=" + this.token )
}

  getConstancia(id: number): Observable<any> {
    return this.http.get(this.urlapi + "/constancia_nac_id/?id=" + id + "&token=" + this.token )
  }

  crearConstancias(constancia: IconsNac): Observable<any> {
    return this.http.post(this.urlapi + "/crear_cons_nac/?token=" + this.token, constancia)
  }

  editarConstancia(id: number, constancia: IconsNac): Observable<any> {
    return this.http.put(this.urlapi + "/cons_nac/"+ id + "?token=" + this.token, constancia)
  }

  borrarConstancia(id: number): Observable<any> {
    return this.http.delete(this.urlapi + "/cons_nac?id=" +id + "&token=" + this.token )
  }


  filterConsultas(filtros: any): Observable<any> {
    // Inicializa una cadena vacía para la URL
    let url = `${this.urlapi}/filtrarConstanciaN/`;

    if (filtros.fecha) {
      url += `?fecha=${filtros.fecha}`;
    }

    if (filtros.cor) {
      if (url.includes('?')) {
        url += `&cor=${filtros.cor}`;
      } else {
        url += `?cor=${filtros.cor}`;
      }
    }

    if (filtros.fecha_parto) {
      if (url.includes('?')) {
        url += `&fecha_parto=${filtros.fecha_parto}`;
      } else {
        url += `?fecha_parto=${filtros.fecha_parto}`
      }
    }

    if (filtros.madre) {
      if (url.includes('?')) {
        url += `&madre=${filtros.madre}`;
      } else {
        url += `?madre=${filtros.madre}`
      }
    }

    if (filtros.medico) {
      if (url.includes('?')) {
        url += `&medico=${filtros.medico}`;
      } else {
        url += `?medico=${filtros.medico}`
      }
    }

    if (filtros.certifica) {
      if (url.includes('?')) {
        url += `&certifica=${filtros.certifica}`;
      } else {
        url += `?certifica=${filtros.certifica}`
      }
    }

    if (filtros.tipo_parto) {
      if (url.includes('?')) {
        url += `&tipo_parto=${filtros.tipo_parto}`;
      } else {
        url += `?tipo_parto=${filtros.tipo_parto}`
      }
    }

    if (filtros.clase_parto) {
      if (url.includes('?')) {
        url += `&clase_parto=${filtros.clase_parto}`;
      } else {
        url += `?clase_parto=${filtros.clase_parto}`
      }
    }

    if (filtros.lb) {
      if (url.includes('?')) {
        url += `&lb=${filtros.lb}`;
      } else {
        url += `?lb=${filtros.lb}`
      }
    }

    if (filtros.onz) {
      if (url.includes('?')) {
        url += `&onz=${filtros.onz}`;
      } else {
        url += `?onz=${filtros.onz}`
      }
    }

    return this.http.get(url);
  }

  correlativo(): Observable<any> {
    return interval(900).pipe(
      switchMap(() => this.http.get(this.urlapi + '/cor_nuevo?token=' + this.token))
    );
  }
}
