// Importa los módulos necesarios de Angular
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './services/user.service';

// Injectable decorator indica que este servicio puede ser inyectado en otros componentes o servicios
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Constructor del servicio con inyección de dependencias
  constructor(private usersService: UsersService, private router: Router) {}

  // Método de interfaz CanActivate que determina si la ruta puede ser activada
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    // Comprueba si el usuario está autenticado
    if (this.usersService.isLoggedIn()) {
      // El usuario está autenticado, permite la navegación
      return true;
      // NOTA: La siguiente línea nunca se ejecutará ya que 'return' finaliza la ejecución de la función
      // Eliminé la línea siguiente para que la redirección funcione correctamente
      // this.router.navigateByUrl("pacientes")
    } else {
      // El usuario no está autenticado, redirige a la página de inicio de sesión
      this.router.navigate(['/login']);
      // Bloquea la navegación
      return false;
    }
  }
}
