import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  constructor() { }

  public derecha: number = 0;
  public izquierda: number = 1;


  ngOnInit() {
  }

  ladoDerecho() {
    this.izquierda = 0;
    this.derecha = 1;
  }

  ladoIzquierdo() {
    this.izquierda = 1;
    this.derecha = 0;
  }
}
