import { PageReloadService } from '../../../../services/PageReload.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { FechaService } from 'src/app/services/fecha.service';
import { Location } from '@angular/common';
import { ContadorService } from 'src/app/services/Contador.service';




@Component({
  selector: 'hClinica',
  templateUrl: './hClinica.component.html',
  styleUrls: ['./hClinica.component.css']
})
export class HClinicaComponent implements OnInit {
  public detalleVisible: boolean = false;
  public patient: Ipaciente | undefined;
  public fechaActual: string = "";
  public horaActual: string = "";
  public rutaAnterior: string = '../';
  public contador: number = 0;
  public e: any = '';
  public  logoPath: string = '/assets/logo.jpg';

  constructor(
    private pacientesService: PacientesService,
    private route: ActivatedRoute,
    private fechaService: FechaService,
    private PageReloadService: PageReloadService,
    private _location: Location,
    private contadorService: ContadorService

  ) { }

  ngOnInit() {
    this.fechaActual = this.fechaService.FechaActual();
    this.horaActual = this.fechaService.HoraActual();

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const id = +idParam;
        this.pacientesService.getPaciente(id).subscribe(data => {
          this.patient = data;
          this.detalleVisible = true;
        });
      }
    });

    // Suscríbete al observable para obtener actualizaciones del contador
    this.contadorService.contador$.subscribe(contador => {
      this.contador = contador;
    });

    this.contadorService.especialidad$.subscribe(e => {
      this.e = e;
    })
  }

  reloadPage() {
    // Llama al servicio para recargar la página
    this.PageReloadService.reloadPage();
  }

  imprimir() {

    window.print();
  }

  regresar(){
    this._location.back();
  }




}
