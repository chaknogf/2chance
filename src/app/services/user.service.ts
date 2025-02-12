import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/enviroments/enviroment';
import { CookieService } from "ngx-cookie-service";



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private inactivityTimeout: any;
  private readonly inactivityTime = 900000; // 15 minutos en milisegundos

  private tokenKey = 'auth_token';
  private userlog = 'username';
  private urlapi = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(
    private http: HttpClient,
    private cookies: CookieService
  ) {
    // Agrega un escuchador para el evento beforeunload al inicializar el servicio
    //  window.addEventListener('beforeunload', () => {
    //   this.clearLocalStorageOnExit();
    // });
    //this.initInactivityDetection();
    //this.initUnloadDetection();
  }


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
    // console.log(this.cookies)
  }

  setUser(user: string): void {
    this.cookies.set('user', user);  // Guarda el token en una cookie llamada 'token'
    // console.log(this.cookies)
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

  isLoggedIn(): boolean {
    const token = this.getTokenLocally();
    if (token) {
      // Verifica aquí si el token es válido y aún no ha expirado
      // console.log('Usuario autenticado');
      const user = localStorage.getItem('username');
      // console.log(user);
      return true;
    }
    // console.log('Usuario no autenticado');
    return false;
  }

  storeUsernameLocally(user: string): void {
    localStorage.setItem(this.userlog, user);
  }

  getUsernameLocally(): string | any {
    return localStorage.getItem('username');
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey)
    localStorage.removeItem(this.userlog)
  }

  private clearLocalStorageOnExit(): void {
    // Lógica para borrar el Local Storage al cerrar la ventana del navegador
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userlog);
  }

  private initInactivityDetection(): void {
    document.addEventListener('mousemove', this.resetInactivityTimer.bind(this));
    document.addEventListener('keydown', this.resetInactivityTimer.bind(this));

    this.inactivityTimeout = setTimeout(() => {
      // Aquí puedes ejecutar acciones cuando ha pasado el tiempo de inactividad
      this.logout();
      console.log('Tiempo de inactividad detectado');
    }, this.inactivityTime);
  }

  private resetInactivityTimer(): void {
    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(() => {
      // Aquí puedes ejecutar acciones cuando ha pasado el tiempo de inactividad
      this.logout();
      console.log('Tiempo de inactividad detectado');
    }, this.inactivityTime);
  }

  private initUnloadDetection(): void {
    window.addEventListener('unload', () => {
      // Acciones a realizar al cerrar la ventana
      console.log('se cerro ventana')
      //this.logout();
    });
  }

  // Otras solicitudes protegidas por autenticación
}


