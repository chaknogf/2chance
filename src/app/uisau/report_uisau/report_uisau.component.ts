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
    this.filtrarData(this.x);

  }



  regresar() {
    this.router.navigate(['/uisau']);
  }

  filtrarData(fecha: string) {
    this.ui.resumen(fecha, 1).subscribe((data: any) => {
      this.Sop = data;
    });
    this.ui.resumen(fecha, 2).subscribe((data: any) => {
      this.Mater = data;
    });
    this.ui.resumen(fecha, 2).subscribe((data: any) => {
      this.Gine = data;
    });
    this.ui.resumen(fecha, 3).subscribe((data: any) => {
      this.Ciru = data;
    });
    this.ui.resumen(fecha, 4).subscribe((data: any) => {
      this.Cirupedia = data;
    });
    this.ui.resumen(fecha, 5).subscribe((data: any) => {
      this.Trauma = data;
    }
    );
    this.ui.resumen(fecha, 6).subscribe((data: any) => {
      this.Traumapedia = data;
    }
    );
    this.ui.resumen(fecha, 7).subscribe((data: any) => {
      this.CRN = data;
    }
    );
    this.ui.resumen(fecha, 8).subscribe((data: any) => {
      this.Pedia = data;
    }
    );
    this.ui.resumen(fecha, 9).subscribe((data: any) => {
      this.Rn = data;
    }
    );
    this.ui.resumen(fecha, 10).subscribe((data: any) => {
      this.Neonatos = data;
    }
    );
    this.ui.resumen(fecha, 17).subscribe((data: any) => {
      this.areaRoja = data;
    }
    );
    this.ui.resumen(fecha, 18).subscribe((data: any) => {
      this.Medi = data;
    });
    this.ui.resumen(fecha, 19).subscribe((data: any) => {
      this.ucin = data;
    });
    this.ui.resumen(fecha, 20).subscribe((data: any) => {
      this.Emergencia = data;
    }
    );
    this.ui.resumen(fecha, 21).subscribe((data: any) => { this.Coex = data; }
    );


  }

  obtenerResultados(date: string) {


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
    this.obtenerResultados(this.x);

  }



}
