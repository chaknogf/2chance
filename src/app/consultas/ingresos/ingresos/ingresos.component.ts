import { PageReloadService } from '../../../services/PageReload.service';
import { FechaService } from 'src/app/services/fecha.service';
import { ConsultasService } from '../../../services/consultas.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IenumEspecialidad } from 'src/app/models/Ienum';
import { servicio } from '../../../enums/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Iconcultas } from 'src/app/models/Iconsultas';


@Component({
  selector: 'ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {


  public x: string = "";
  public pacientes: [] = [];
  public consultas: Iconcultas[] = [];
  public contador: number = 0;
  public expedienteBuscar: any = '';
  public nombreBuscar: string = '';
  public apellidoBuscar: string = '';
  public dpiBuscar: any = '';
  public fechaActual: string = this.FechaService.FechaActual();
  public horaActual: string = this.FechaService.HoraActual();
  public idCopiado: number = 0;
  public fechaRecepcion: string = this.FechaService.registroTiempo();
  public selectdate: string = '';
  public maxdate: string = '';

  constructor(
    private pacientesService: PacientesService,
    private ConsultasService: ConsultasService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private FechaService: FechaService,
    private PageReloadService: PageReloadService
  ) { }


  ngOnInit() {
  }

}


