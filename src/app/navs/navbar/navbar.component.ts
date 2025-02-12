import { Component, HostListener } from '@angular/core';
import { UsersService } from '../../services/user.service';
import { Router } from '@angular/router';
import { PageReloadService } from '../../services/PageReload.service';
import { timeout } from 'rxjs';

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
      label: 'Estadística', children: [
        { subhref: '/cie10', label: 'Cie-10' },
        { subhref: '/consultarE', label: 'Pacientes', icon: 'pacienteIcon' },
        { subhref: '/listProce', label: 'Procedimientos' },
        { subhref: '/rn', label: 'RN' },
      ]
    },
    {
      label: 'Registros', children: [
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
      label: 'UISAU', children: [
        { subhref: '/uisau', label: 'Pacientes Activos' },
      ]
    },
    {
      label: 'Reportes', children: [
        { subhref: '/reportstd', label: 'Reportes' },
      ]
    },
    {
      label: 'Personal', children: [
        { subhref: '/medicos', label: 'Médicos' },
        { subhref: '/usuario', label: 'Usuarios' },
      ]
    },
  ];

  constructor(
    private user: UsersService,
    private router: Router,
    private reload: PageReloadService
  ) { }

  get User() {
    return `Hola! ${this.username}`;
  }

  handleLinkClick(href: string) {
    this.activeLink = href;
    this.isExpanded = false; // Cierra el menú en móviles
  }

  toggleNavbar() {
    this.isExpanded = !this.isExpanded;
  }

  toggleDropdown(label: string) {
    this.openDropdown = this.openDropdown === label ? null : label;
    setTimeout(() => {
      this.openDropdown = null;
    }, 1700);
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
