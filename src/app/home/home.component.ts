import { Component, AfterViewInit, OnInit } from '@angular/core';
import { particlesConfig } from './particles-config';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  public particlesConfig = particlesConfig;
  ngOnInit() {
    // Utiliza la configuración de partículas
    particlesConfig;
  }
}
