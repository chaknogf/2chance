import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
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

  // filtrar(filtros: any): Observable<any> {

  // }

}
