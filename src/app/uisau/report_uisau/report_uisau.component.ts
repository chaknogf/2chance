import { UisauService } from './../../services/uisau.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { servicio } from 'src/app/enums/enums';
import { Iuisau } from 'src/app/models/Iuisau';
import { FechaService } from 'src/app/services/fecha.service';

@Component({
  selector: 'app-report_uisau',
  templateUrl: './report_uisau.component.html',
  styleUrls: ['./report_uisau.component.css']
})
export class ReportUisauComponent implements OnInit {

  public listado: Iuisau[] = []; // Lista paginada

  public listadoCompleto: Iuisau[] = [];
  public Sop: Iuisau[] = [];
  public Mater: Iuisau[] = [];
  public Gine: Iuisau[] = [];
  public Ciru: Iuisau[] = [];
  public Cirupedia: Iuisau[] = [];
  public Trauma: Iuisau[] = [];
  public Traumapedia: Iuisau[] = [];
  public CRN: Iuisau[] = [];
  public Pedia: Iuisau[] = [];
  public Rn: Iuisau[] = [];
  public Neonatos: Iuisau[] = [];
  public areaRoja: Iuisau[] = [];
  public Medi: Iuisau[] = [];
  public ucin: Iuisau[] = [];
  public Emergencia: Iuisau[] = [];
  public Coex: Iuisau[] = [];
  public totalRegistros: number = 12; // Total de registros por página
  public paginaActual: number = 1; // Página actual
  private sortColumn: keyof Iuisau | null = null;
  private ascendingOrder: boolean = false;
  public porcentajeDeProgreso: number = 0;
  public dia: string = '';
  public mes: string = '';
  public anio: string = '';
  public fecha: string = '';
  public today: string = '';
  private x: string = this.today;
  FechaService: any;

  constructor(
    private router: Router,
    private ui: UisauService,
    private fechaService: FechaService
  ) { }

  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0];  // Establece la fecha actual
    this.fecha = this.today;  // Establece la fecha por defecto al día de hoy
    this.Sop = [];
    this.Mater = [];
    this.Gine = [];
    this.Ciru = [];
    this.Cirupedia = [];
    this.Trauma = [];
    this.Traumapedia = [];
    this.CRN = [];
    this.Pedia = [];
    this.Rn = [];
    this.Neonatos = [];
    this.areaRoja = [];
    this.Medi = [];
    this.ucin = [];
    this.Emergencia = [];
    this.Coex = [];
    this.x = this.fecha;
    this.getSop();
    this.getMater();
    this.getGine();
    this.getCiru();
    this.getCirupedia();
    this.getTrauma();
    this.getTraumaPedia();
    this.getCRN();
    this.getPedia();
    this.getRn();
    this.getNeonatos();
    this.getAreaRoja();
    this.getMedi();
    this.getUcin();
    this.getEmergencia();
    this.getCoex();
  }

  getSop() {
    this.ui.filterInfos({ servicio: 1, fecha: this.x }).subscribe(data => {
      this.Sop = data;
    })
  }
  getMater() {
    this.ui.filterInfos({ servicio: 2, fecha: this.x }).subscribe(data => {
      this.Mater = data;
    })
  }
  getGine() {
    this.ui.filterInfos({ servicio: 3, fecha: this.x }).subscribe(data => {
      this.Gine = data;
    })
  }

  getCiru() {
    this.ui.filterInfos({ servicio: 4, fecha: this.x }).subscribe(data => {
      this.Ciru = data;
    })
  }

  getCirupedia() {
    this.ui.filterInfos({ servicio: 5, fecha: this.x }).subscribe(data => {
      this.Sop = data;
    })
  }

  getTrauma() {
    this.ui.filterInfos({ servicio: 6, fecha: this.x }).subscribe(data => {
      this.Trauma = data;
    })
  }

  getTraumaPedia() {
    this.ui.filterInfos({ servicio: 7, fecha: this.x }).subscribe(data => {
      this.Traumapedia = data;
    })
  }

  getCRN() {
    this.ui.filterInfos({ servicio: 8, fecha: this.x }).subscribe(data => {
      this.CRN = data;
    })
  }

  getPedia() {
    this.ui.filterInfos({ servicio: 9, fecha: this.x }).subscribe(data => {
      this.Pedia = data;
    })
  }

  getRn() {
    this.ui.filterInfos({ servicio: 10, fecha: this.x }).subscribe(data => {
      this.Rn = data;
    })
  }

  getNeonatos() {
    this.ui.filterInfos({ servicio: 11, fecha: this.x }).subscribe(data => {
      this.Neonatos = data;
    })
  }

  getAreaRoja() {
    this.ui.filterInfos({ servicio: 17, fecha: this.x }).subscribe(data => {
      this.areaRoja = data;
    })
  }

  getMedi() {
    this.ui.filterInfos({ servicio: 18, fecha: this.x }).subscribe(data => {
      this.Medi = data;
    })
  }

  getUcin() {
    this.ui.filterInfos({ servicio: 19, fecha: this.x }).subscribe(data => {
      this.ucin = data;
    })
  }

  getEmergencia() {
    this.ui.filterInfos({ servicio: 20, fecha: this.x }).subscribe(data => {
      this.Emergencia = data;
    })
  }

  getCoex() {
    this.ui.filterInfos({ servicio: 21, fecha: this.x }).subscribe(data => {
      this.Coex = data;
    })
  }


  regresar() {
    this.router.navigate(['/uisau']);
  }

  establecerFecha(): void {
    if (!this.fecha) {
      console.warn("No se ha seleccionado una fecha.");
      return;
    }

    console.log("Fecha seleccionada:", this.fecha);
    this.Sop = [];
    this.Mater = [];
    this.Gine = [];
    this.Ciru = [];
    this.Cirupedia = [];
    this.Trauma = [];
    this.Traumapedia = [];
    this.CRN = [];
    this.Pedia = [];
    this.Rn = [];
    this.Neonatos = [];
    this.areaRoja = [];
    this.Medi = [];
    this.ucin = [];
    this.Emergencia = [];
    this.Coex = [];
    this.x = this.fecha;
    this.getSop();
    this.getMater();
    this.getGine();
    this.getCiru();
    this.getCirupedia();
    this.getTrauma();
    this.getTraumaPedia();
    this.getCRN();
    this.getPedia();
    this.getRn();
    this.getNeonatos();
    this.getAreaRoja();
    this.getMedi();
    this.getUcin();
    this.getEmergencia();
    this.getCoex();
  }



}
