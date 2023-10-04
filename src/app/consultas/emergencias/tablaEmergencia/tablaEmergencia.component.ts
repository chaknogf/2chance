import { ConsultasService } from 'src/app/services/consultas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { FechaService } from 'src/app/services/fecha.service';


@Component({
  selector: 'tablaEmergencia',
  templateUrl: './tablaEmergencia.component.html',
  styleUrls: ['./tablaEmergencia.component.css']
})
export class TablaEmergenciaComponent implements OnInit {

  constructor(
    private ConsultasService: ConsultasService,
  ) { }

  public consultas: Iconcultas[] = [];

  ngOnInit() {
    this.emergencias()
  }


  emergencias() {
    this.ConsultasService.consulTipo(3)
      .subscribe(data => {
        this.consultas = data.sort((a: { id: number; }, b: { id: number; }): number => b.id - a.id);
        console.log(this.consultas);
    })
  }

}
