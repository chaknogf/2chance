// Importa los módulos necesarios de Angular
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

// Decorador Component para definir la estructura del componente
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Variable para controlar la visibilidad de la barra de navegación
  showNavbar: boolean = true;

  // Título de la aplicación
  title = 'webSystem';

  // Constructor del componente con inyección de dependencias
  constructor(private router: Router) {}

  // Método ngOnInit se ejecuta al inicializar el componente
  ngOnInit() {
    // Subscripción a eventos de navegación
    this.router.events.subscribe((event) => {
      // Verifica si el evento es de tipo NavigationEnd (fin de la navegación)
      if (event instanceof NavigationEnd) {
        // Verifica la ruta activa y decide si mostrar u ocultar la barra de navegación
        this.showNavbar = event.url !== '/login';
      }
    });
  }
}
