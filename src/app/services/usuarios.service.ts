import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { UsersService } from './user.service';
import { Iusuarios } from '../models/Iusers';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private token = this.auth.getTokenLocally(); // Obtén el token almacenado
  private urlapi = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private auth: UsersService
  ) { }

  obteneruser(user: string): Observable<any> {
    return this.http.get(this.urlapi + "/username/?user=" + user + '&token=' + this.token);
  }

  obteneruserid(id: number): Observable<any> {
    return this.http.get(this.urlapi + "/usuario/?id=" + id + '&token=' + this.token);
  }

  actualizar(username: string, user: Iusuarios): Observable<any> {
    return this.http.put(this.urlapi + '/updateuser/?username=' + username + "&token=" + this.token, user);
  }


}
