import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from './services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: UsersService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getTokenLocally();

    // Si existe un token, clonamos la petición y añadimos el Authorization Header
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest);
    }

    // Si no hay token, dejamos la petición original sin modificar
    return next.handle(req);
  }
}
