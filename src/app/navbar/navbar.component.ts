import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isExpanded = false;
  @ViewChild('navbarButton')
  navbarButton!: ElementRef;


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



}
