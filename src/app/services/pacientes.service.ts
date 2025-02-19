import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, interval, BehaviorSubject, catchError, throwError } from 'rxjs';
import { switchMap } from 'rxjs';
import { Ipaciente } from '../models/Ipaciente';
import { environment } from 'src/enviroments/enviroment';
import { UsersService } from './user.service';
import { PageReloadService } from './PageReload.service';

interface nuevoExpResponse {
  nuevo_exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private urlapi = environment.apiUrl;
  private token = this.auth.getTokenLocally(); // Obtén el token almacenado

  constructor(
    private http: HttpClient,
    private auth: UsersService,
    private reloadService: PageReloadService
  ) { }

  getPacientes(): Observable<any> {

    return this.http.get(this.urlapi + "/pacientes?token=" + this.token);
  }

  getPacientesAsc(): Observable<any> {

    return this.http.get(this.urlapi + "/pacientes_asc?token=" + this.token);
  }

  getPersonas(): Observable<any> {

    return this.http.get(this.urlapi + "/personas?token=" + this.token);
  }



  getPaciente(exp: number): Observable<any> {

    return this.http.get(this.urlapi + "/paciente/" + exp + "?token=" + this.token);
  }

  getExpe(exp: number): Observable<any> {
    return this.http.get(this.urlapi + "/paciente/" + exp);
  }


  getNombre(nombre: string, apellido: string): Observable<any> {
    const queryParams = `?nombre=${nombre}&apellido=${apellido}&token=${this.token}`;
    return this.http.get(`${this.urlapi}/pacientefind/${queryParams}`);
  }

  getIdPaciente(id: number): Observable<any> {

    return this.http.get(this.urlapi + "/pacienteId/?id=" + id + "&token=" + this.token);
  }

  getdpi(cui: number): Observable<any> {
    const queryParams = `?cui=${cui}&token=${this.token}`;
    return this.http.get(`${this.urlapi}/dpi/${queryParams}`);
  }

  crearPaciente(paciente: Ipaciente): Observable<any> {
    return this.http.post(this.urlapi + "/paciente/?token=" + this.token, paciente)
      .pipe(
        switchMap(response => {
          this.reloadService.reloadPage();
          return [response];
        })
      );
  }

  editPaciente(exp: number, updateP: Ipaciente): Observable<any> {
    return this.http.put(this.urlapi + "/paciente/" + exp + "?token=" + this.token, updateP)
      .pipe(
        switchMap(response => {
          this.reloadService.reloadPage();
          return [response];
        })
      );
  }

  trasladar(id: number, updateP: Ipaciente): Observable<any> {
    return this.http.put(this.urlapi + '/trasladar/' + id + '?token=' + this.token, updateP)
  }

  telefono(exp: number, updateP: Ipaciente): Observable<any> {
    const token = this.token ? encodeURIComponent(this.token) : '';
    const url = `${this.urlapi}/telefono/${encodeURIComponent(exp)}?token=${token}`;
    return this.http.patch(url, updateP, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para manejar errores (puedes personalizarlo)
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la API:', error);
    return throwError(() => new Error('Error en la actualización del teléfono. Inténtalo nuevamente.'));
  }

  deletePaciente(id: number): Observable<any> {
    return this.http.delete(this.urlapi + "/borrarpaciente/" + id + "?token=" + this.token)
      .pipe(
        switchMap(response => {
          this.reloadService.reloadPage();
          return [response];
        })
      );
  }

  Expediente(): Observable<any> {
    return interval(900).pipe(
      switchMap(() => this.http.get(this.urlapi + '/expediente' + "?token=" + this.token))
    );
  }

  mujeres(filtros: any): Observable<any> {
    // Inicializa una cadena vacía para la URL
    let url = `${this.urlapi}/filtrarmujer/`;

    if (filtros.expediente) {
      if (url.includes('?')) {
        url += `&expediente=${filtros.expediente}`;
      } else {
        url += `?expediente=${filtros.expediente}`;
      }
    }

    if (filtros.nombre) {
      if (url.includes('?')) {
        url += `&nombre=${filtros.nombre}`;
      } else {
        url += `?nombre=${filtros.nombre}`;
      }
    }

    if (filtros.apellido) {
      if (url.includes('?')) {
        url += `&apellido=${filtros.apellido}`;
      } else {
        url += `?apellido=${filtros.apellido}`;
      }
    }

    if (filtros.dpi) {
      if (url.includes('?')) {
        url += `&dpi=${filtros.dpi}`;
      } else {
        url += `?dpi=${filtros.dpi}`;
      }
    }

    if (filtros) {
      if (url.includes('?')) {
        url += `&token=${this.token}`;
      } else {
        url += `?token=${this.token}`;
      }
    }


    // console.log(filtros, url)
    // Realiza la solicitud GET con la URL construida dinámicamente
    return this.http.get(url);

  }


  filterPersona(filtros: any): Observable<any> {
    // Inicializa una cadena vacía para la URL
    let url = `${this.urlapi}/filtrarPersonas/`;

    // Construye la URL de manera dinámica agregando los filtros no vacíos
    if (filtros.id) {
      url += `?id=${filtros.id}`;
    }

    if (filtros.expediente) {
      if (url.includes('?')) {
        url += `&expediente=${filtros.expediente}`;
      } else {
        url += `?expediente=${filtros.expediente}`;
      }
    }

    if (filtros.nombre) {
      if (url.includes('?')) {
        url += `&nombre=${filtros.nombre}`;
      } else {
        url += `?nombre=${filtros.nombre}`;
      }
    }

    if (filtros.apellido) {
      if (url.includes('?')) {
        url += `&apellido=${filtros.apellido}`;
      } else {
        url += `?apellido=${filtros.apellido}`;
      }
    }

    if (filtros.dpi) {
      if (url.includes('?')) {
        url += `&dpi=${filtros.dpi}`;
      } else {
        url += `?dpi=${filtros.dpi}`;
      }
    }


    if (filtros) {
      if (url.includes('?')) {
        url += `&token=${this.token}`;
      } else {
        url += `?token=${this.token}`;
      }
    }


    // console.log(filtros, url)
    // Realiza la solicitud GET con la URL construida dinámicamente
    return this.http.get(url);

  }

  filterPaciente(filtros: any): Observable<any> {
    // Inicializa una cadena vacía para la URL
    let url = `${this.urlapi}/filtrarpaciente_/`;

    // Construye la URL de manera dinámica agregando los filtros no vacíos
    if (filtros.id) {
      url += `?id=${filtros.id}`;
    }

    if (filtros.expediente) {
      if (url.includes('?')) {
        url += `&expediente=${filtros.expediente}`;
      } else {
        url += `?expediente=${filtros.expediente}`;
      }
    }

    if (filtros.nombre) {
      if (url.includes('?')) {
        url += `&nombre=${filtros.nombre}`;
      } else {
        url += `?nombre=${filtros.nombre}`;
      }
    }

    if (filtros.apellido) {
      if (url.includes('?')) {
        url += `&apellido=${filtros.apellido}`;
      } else {
        url += `?apellido=${filtros.apellido}`;
      }
    }

    if (filtros.dpi) {
      if (url.includes('?')) {
        url += `&dpi=${filtros.dpi}`;
      } else {
        url += `?dpi=${filtros.dpi}`;
      }
    }


    if (filtros) {
      if (url.includes('?')) {
        url += `&token=${this.token}`;
      } else {
        url += `?token=${this.token}`;
      }
    }


    // console.log(filtros)
    // Realiza la solicitud GET con la URL construida dinámicamente
    return this.http.get(url);

  }


}
