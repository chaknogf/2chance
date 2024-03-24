import { Component, ViewChild, ElementRef } from '@angular/core';
import { UsersService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isExpanded = false;
  @ViewChild('navbarButton')
  navbarButton!: ElementRef;
  constructor(
    private user: UsersService,
    private router: Router

  ) { }


  public username = this.user.getUsernameLocally() // Obtén el nombre de usuario desde el almacenamiento local

  get User() {
    return `Hola! ${this.username}`;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  hideMenu() {
    if (this.navbarButton && this.navbarButton.nativeElement) {
      this.navbarButton.nativeElement.click();
    }
  }

  logout() {
    this.user.logout()
    this.router.navigateByUrl("/login");

  }



}
