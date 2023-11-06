import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { CookieService } from "ngx-cookie-service";



@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private tokenKey = 'auth_token';
  private urlapi = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(
    private http: HttpClient,
    private cookies: CookieService
  ) { }


  login(user: any): Observable<any> {
    return this.http.post(this.urlapi + '/login/', user);
  }

  // Añade el token a las solicitudes
  private addAuthorizationHeader() {
    const token = this.cookies.get('token');  // Obtiene el token de la cookie
    if (token) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
    }
  }

  // Realiza una solicitud con el token incluido
  getUserData(): Observable<any> {
    this.addAuthorizationHeader();
    return this.http.get(this.urlapi + '/user-data', this.httpOptions);
  }

  setToken(token: string): void {
    this.cookies.set('token', token);  // Guarda el token en una cookie llamada 'token'
    console.log(this.cookies)
  }

  getToken(): string {
    return this.cookies.get('token'); // Recupera el token desde la cookie
  }

  storeTokenLocally(token: string): void {
    localStorage.setItem(this.tokenKey, token); // Almacena el token en el almacenamiento local del navegador
  }

  getTokenLocally(): string | null {
    return localStorage.getItem(this.tokenKey); // Recupera el token del almacenamiento local
  }

  // Otras solicitudes protegidas por autenticación
}


