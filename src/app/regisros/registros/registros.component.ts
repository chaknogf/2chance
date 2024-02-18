import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.onBlur()
  }

  mostrarRegistros = false;

  onFocus() {
    this.mostrarRegistros = true;
  }

  onBlur() {
    // Añade un pequeño retardo para asegurar que el usuario no está cambiando el foco a otro elemento del mismo componente
    setTimeout(() => {
      this.mostrarRegistros = false;
    }, 200); // Ajusta el valor según tus necesidades
  }

}
