import { Imedico } from './../models/Imedico';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { environment } from 'src/assets/enviroments/enviroment';
import { UsersService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private token = this.auth.getTokenLocally(); // Obtén el token almacenado
  private urlapi = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private auth: UsersService
  ) { }

  getMedicos(): Observable<any> {
    return this.http.get(this.urlapi + "/medicos/" + "?token=" + this.token)
  }

  getMedico(id: number): Observable<any> {
    return this.http.get(this.urlapi + "/medico/?id=" + id + "&token=" + this.token)
  }

  getMedicoCol(col: any): Observable<any> {
    return this.http.get(this.urlapi + "/colegiado/?col=" + col + "&token=" + this.token)
  }


  filtrarmedico(filtros: any): Observable<any> {
    // Inicializa una cadena vacía para la URL
    let url = `${this.urlapi}/filtrarmedico/`;

    if (filtros.colegiado) {
      url += `?colegiado=${filtros.colegiado}`;
    }

    if (filtros.name) {
      if (url.includes('?')) {
        url += `&name=${filtros.name}`;
      } else {
        url += `?name=${filtros.name}`;
      }
    }

    if (filtros.dpi) {
      if (url.includes('?')) {
        url += `&dpi=${filtros.dpi}`;
      } else {
        url += `?dpi=${filtros.dpi}`;
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


  editarMedico(id: number, update: Imedico): Observable<any> {
    return this.http.put(this.urlapi + '/editarmedico/' + id + "?token=" + this.token, update);
  }

  crearMedico(medico: Imedico): Observable<any> {
    return this.http.post(this.urlapi + "/medico/?token=" + this.token, medico);
  }

  eliminarMedico(id: number): Observable<any> {
    return this.http.delete(this.urlapi + '/eliminarmedico/' + id + "?token=" + this.token);
  }



}

