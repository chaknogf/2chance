import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.usersService.isLoggedIn()) {
      return true; // El usuario está autenticado, permite la navegación
      this.router.navigateByUrl("pacientes")
    } else {
      this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
      return false; // Bloquea la navegación
    }
  }
}
