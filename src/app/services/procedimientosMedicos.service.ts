import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { UsersService } from './user.service';
import { Iabreviaturas, IproceMedico } from '../models/IprocedimientosMedicos';

@Injectable({
  providedIn: 'root'
})
export class ProcedimientosMedicosService {

  private token = this.auth.getTokenLocally(); // Obtén el token almacenado
  private urlapi = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private auth: UsersService
  ) { }

  proceRealizados(): Observable<any>{
  return this.http.get(this.urlapi + "/promedic?token="+this.token)
  }

  abreviaturas(): Observable<any>{
    return this.http.get(this.urlapi + "/abreviaturas" + "?token="+this.token)
    }

  getproce(id: number): Observable<any>{
    return this.http.get(this.urlapi + "/procedimiento/?id=" +id + "&token="+this.token)
  }

  getabreviaturaid(id: number): Observable<any>{
    return this.http.get(this.urlapi + "/abreviaturaid/?id=" +id + "&token="+this.token)
  }

  getabreviatura(abrev: string): Observable<any>{
    return this.http.get(this.urlapi + "/abreviatura/?abreviatura=" +abrev + "&token="+this.token)
  }



  filtrarProce(filtros: any): Observable<any>{
    // Inicializa una cadena vacía para la URL
    let url = `${this.urlapi}/filtrar_procedimientos/`;

    if (filtros.id) {
      url += `?id=${filtros.id}`;
    }

    if (filtros.fecha) {
      if (url.includes('?')) {
        url += `&fecha=${filtros.fecha}`;
      } else {
        url += `?fecha=${filtros.fecha}`;
      }
    }

    if (filtros.servicio) {
      if (url.includes('?')) {
        url += `&servicio=${filtros.servicio}`;
      } else {
        url += `?servicio=${filtros.servicio}`;
      }
    }

    if (filtros.abreviatura) {
      if (url.includes('?')) {
        url += `&abreviatura=${filtros.abreviatura}`;
      } else {
        url += `?abreviatura=${filtros.abreviatura}`;
      }
    }

    if (filtros.procedimiento) {
        if (url.includes('?')) {
          url += `&procedimiento=${filtros.procedimiento}`;
        } else {
          url += `?procedimiento=${filtros.procedimiento}`;
        }
      }

    if (filtros.especialidad) {
      if (url.includes('?')) {
        url += `&especialidad=${filtros.especialidad}`;
      } else {
        url += `?especialidad=${filtros.especialidad}`;
      }
    }
    if (filtros.sexo) {
        if (url.includes('?')) {
          url += `&sexo=${filtros.sexo}`;
        } else {
          url += `?sexo=${filtros.sexo}`;
        }
      }
    if (filtros.medico) {
      if (url.includes('?')) {
        url += `&medico=${filtros.medico}`;
      } else {
        url += `?medico=${filtros.medico}`;
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

  filtrarAbr(filtros: any): Observable<any>{
    // Inicializa una cadena vacía para la URL
    let url = `${this.urlapi}/iltrar_abreviaturas/`;

    if (filtros.id) {
      url += `?id=${filtros.id}`;
    }

    if (filtros.abreviatura) {
      if (url.includes('?')) {
        url += `&abreviatura=${filtros.abreviatura}`;
      } else {
        url += `?abreviatura=${filtros.abreviatura}`;
      }
    }

    if (filtros.procedimiento) {
      if (url.includes('?')) {
        url += `&procedimiento=${filtros.procedimiento}`;
      } else {
        url += `?procedimiento=${filtros.procedimiento}`;
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


  editProceMedic(id: number, update: IproceMedico): Observable<any> {
    return this.http.put(this.urlapi + '/abreviatura_editada?id=' + id + "&token=" + this.token, update);
  }

  editAbreviatura(id: number, update: Iabreviaturas): Observable<any> {
    return this.http.put(this.urlapi + '/abreviatura_editada?id=' + id + "&token=" + this.token, update);
  }

  registrar(proce: IproceMedico): Observable<any> {
    return this.http.post(this.urlapi + "/procedimiento_registrado?token=" + this.token, proce);
  }


  nuevo(proce: Iabreviaturas): Observable<any> {
    return this.http.post(this.urlapi + "/nueva_abreviatura?token=" + this.token, proce);
  }

  eliminarProce(id: number): Observable<any> {
    return this.http.delete(this.urlapi + '/procedimiento_eliminado/' + id + "?token=" + this.token);
  }

  eliminarAbreviatura(id: number): Observable<any> {
    return this.http.delete(this.urlapi + '/abreviatura_eliminada/' + id + "?token=" + this.token);
  }


}

