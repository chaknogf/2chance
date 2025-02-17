import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { UsersService } from './user.service';
import { Icie10 } from '../models/Icie10';

@Injectable({
  providedIn: 'root'
})
export class Cie10Service {

  private token = this.auth.getTokenLocally(); // Obtén el token almacenado
  private urlapi = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private auth: UsersService
  ) { }

  getCodigos(): Observable<any> {
    return this.http.get(this.urlapi + "/cie10" + "?token=" + this.token)
  }

  getCodigo(id: number): Observable<any> {
    return this.http.get(this.urlapi + "/diagnostico/?id=" + id + "&token=" + this.token)
  }

  filtrarDX(filtros: any): Observable<any> {
    // Inicializa una cadena vacía para la URL
    let url = `${this.urlapi}/filtrarcie10/`;

    if (filtros.cod) {
      url += `?cod=${filtros.cod}`;
    }

    if (filtros.grupo) {
      if (url.includes('?')) {
        url += `&grupo=${filtros.grupo}`;
      } else {
        url += `?grupo=${filtros.grupo}`;
      }
    }

    if (filtros.dx) {
      if (url.includes('?')) {
        url += `&dx=${filtros.dx}`;
      } else {
        url += `?dx=${filtros.dx}`;
      }
    }

    if (filtros.abreviatura) {
      if (url.includes('?')) {
        url += `&abreviatura=${filtros.abreviatura}`;
      } else {
        url += `?abreviatura=${filtros.abreviatura}`;
      }
    }

    if (filtros.especialidad) {
      if (url.includes('?')) {
        url += `&especialidad=${filtros.especialidad}`;
      } else {
        url += `?especialidad=${filtros.especialidad}`;
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


  editarCie10(id: number, update: Icie10): Observable<any> {
    return this.http.put(this.urlapi + '/editarcie10/' + id + "?token=" + this.token, update);
  }

  crearCie10(cie10: Icie10): Observable<any> {
    return this.http.post(this.urlapi + "/cie10/?token=" + this.token, cie10);
  }

  eliminarCie10(id: number): Observable<any> {
    return this.http.delete(this.urlapi + '/eliminarcie10/' + id + "?token=" + this.token);
  }



}

