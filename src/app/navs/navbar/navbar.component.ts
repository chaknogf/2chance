import { Component, HostListener } from '@angular/core';
import { UsersService } from '../../services/user.service';
import { Router } from '@angular/router';
import { PageReloadService } from '../../services/PageReload.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  activeLink = '/home';
  username = this.user.getUsernameLocally();
  isExpanded = false;
  openDropdown: string | null = null;

  items = [
    {
      label: 'Estadística', href: '/consultarE', children: [
        { subhref: '/cie10', label: 'Cie-10' },
        { subhref: '/consultarE', label: 'Pacientes' },
        { subhref: '/listProce', label: 'Procedimientos' },
        { subhref: '/rn', label: 'RN' },
      ]
    },
    {
      label: 'Registros', href: '/pacientes', children: [
        { subhref: '/pacientes', label: 'Pacientes' },
        { subhref: '/consultas', label: 'Consultas' },
        { subhref: '/tablaEmergencia', label: 'Emergencias' },
        { subhref: '/coex', label: 'Coex' },
        { subhref: '/ingresos', label: 'Hospitalizaciones' },
        { subhref: '/recepciones', label: 'Recepciones' },
        { subhref: '/consNac', label: 'Consulta Nacimiento' },
      ]
    },
    {
      label: 'UISAU', href: '/uisau', children: [
        { subhref: '/uisau', label: 'Pacientes Activos' },
      ]
    },
    {
      label: 'Reportes', href: '/reportstd', children: [
        { subhref: '/reportstd', label: 'Reportes' },
      ]
    },
    {
      label: 'Personal', href: '/usuario', children: [
        { subhref: '/medicos', label: 'Médicos' },
        { subhref: '/usuario', label: 'Usuarios' },
      ]
    }
  ];

  constructor(
    private user: UsersService,
    private router: Router,
    private reload: PageReloadService,
    private cdRef: ChangeDetectorRef
  ) { }

  get User() {
    return `Hola! ${this.username}`;
  }

  // Cerrar navbar y dropdown al hacer clic en un enlace principal
  handleLinkClick(): void {
    this.isExpanded = false;
    this.openDropdown = null;
  }

  toggleNavbar() {
    this.isExpanded = !this.isExpanded;
  }

  toggleDropdown(label: string) {
    this.openDropdown = this.openDropdown === label ? null : label;
  }

  /**
   * Maneja el clic en un subitem:
   * 1. Espera a que Angular termine la navegación.
   * 2. Cierra el menú solo después de la transición.
   */
  handleSubItemClick(route: string, event: Event) {
    event.preventDefault(); // Evita que el navegador cambie la ruta antes de tiempo

    this.router.navigateByUrl(route).then(() => {
      this.isExpanded = false; // Cierra el navbar en móviles
      this.openDropdown = null; // Cierra el dropdown
      this.cdRef.detectChanges(); // Forzar detección de cambios en Angular
    });
  }

  // Cerrar dropdown al hacer clic fuera
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.openDropdown = null;
    }
  }

  logout() {
    this.user.logout();
    this.router.navigateByUrl("/login");
    this.reload.reloadPage();
  }
}
