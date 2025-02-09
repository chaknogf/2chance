import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/user.service';
import { Router } from '@angular/router';
import { PageReloadService } from '../../services/PageReload.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  activeLink = '/home';
  username = this.user.getUsernameLocally();
  isExpanded = true;
  openItem: string | null = null;
  openDropdown: string | null = null;

  items = [
    { href: '/home', label: 'Home' },
    {
      href: '/estadistica', label: 'Estadística', children: [
        { href: '/cie10', label: 'Cie-10' },
        { href: '/consultarE', label: 'Pacientes' },
        { href: '/listProce', label: 'Procedimientos' },
        { href: '/rn', label: 'RN' },
      ]
    },
    {
      label: 'Registros', children: [
        { href: '/pacientes', label: 'Pacientes' },
        { href: '/consultas', label: 'Consultas' },
        { href: '/tablaEmergencia', label: 'Emergencias' },
        { href: '/coex', label: 'Coex' },
        { href: '/ingresos', label: 'Hospitalizaciones' },
        { href: '/recepciones', label: 'Recepciones' },
        { href: '/consNac', label: 'Consulta Nacimiento' },
      ]
    },
    {
      label: 'UISAU', children: [
        { href: '/uisau', label: 'Pacientes Activos' },
      ]
    }
    ,
    {
      label: 'Reportes', children: [
        { href: '/reportes', label: 'Reportes' },
      ]
    },
    {
      href: '/personal', label: 'Personal', children: [
        { href: '/medicos', label: 'Médicos' },
        { href: '/usuario', label: 'Usuarios' },
      ]
    },

  ];

  constructor(
    private user: UsersService,
    private router: Router,
    private reload: PageReloadService
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



  get User() {
    return `Hola! ${this.username}`;
  }

  handleLinkClick(href: string) {
    this.activeLink = href;
    this.isExpanded = false; // Cierra el menú en móvil
  }

  toggleNavbar() {
    this.isExpanded = !this.isExpanded;
  }

  toggleDropdown(label: string) {
    this.openDropdown = this.openDropdown === label ? null : label;
  }

  logout() {
    this.user.logout();
    this.router.navigateByUrl("/login");
    this.reload.reloadPage();
  }

  toggleSidebar() {
    // this.isExpanded = !this.isExpanded;
    this.isExpanded = true;
  }

  toggleItem(label: string) {
    this.openItem = this.openItem === label ? null : label;
  }

  navigate(href: string) {
    this.router.navigateByUrl(href);
    this.isExpanded = true; // Cerrar menú en móviles
  }
}
