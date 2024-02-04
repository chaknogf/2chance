import { PageReloadService } from '../../../../services/PageReload.service';
import { FechaService } from 'src/app/services/fecha.service';
import { ConsultasService } from '../../../../services/consultas.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {  Ienum } from 'src/app/models/Ienum';
import { nation, etnias, ecivil, academic, parents, lenguaje, servicio, servicios } from 'src/app/enums/enums';
import { municipio } from 'src/app/enums/vencindad';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { UsersService } from 'src/app/services/user.service';


@Component({
  selector: 'ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  @Output() idConsulta = new EventEmitter<number>();
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
  public username = this.user.getUsernameLocally()

  ingreso: Iconcultas = {
    id: 0,
    hoja_emergencia: null,
    expediente: null,
    fecha_consulta: this.fechaActual,
    hora: this.horaActual,
    nombres: "",
    apellidos: "",
    nacimiento: "",
    edad: "",
    sexo: "",
    dpi: null,
    direccion: "",
    acompa: null,
    parente: null,
    telefono: null,
    especialidad: 0,
    servicio: null,
    status: 1,
    fecha_recepcion: null,
    fecha_egreso: null,
    tipo_consulta: 1,
    nota: "",
    name: null,
    lastname: null,
    prenatal: null,
    lactancia: null,
    dx: null,
    folios: null,
    archived_by: null,
    created_at: '',
    updated_at: '',
    created_by: null,
    medico: null,
  }

   e: Ienum = {
    municipio: municipio,
    nation: nation,
    people: etnias,
    ecivil: ecivil,
    academic: academic,
    parents: parents,
    lenguage: lenguaje,
    servicios: servicios,
    servicio: servicio
  }

  constructor(
    private pacientesService: PacientesService,
    private ConsultasService: ConsultasService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private FechaService: FechaService,
    private PageReloadService: PageReloadService,
    private user: UsersService,
  ) { }


  ngOnInit() {
    this.ingreso.created_by = this.username;
  }


  eliminar(id: number) {
    this.ConsultasService.eliminar(id)
      .subscribe(data => {
        this.ingreso = data;
        this.reloadPage();

      })
  }


  copiarId(id: number) {
    this.idConsulta.emit(id);
    this.idCopiado = id;

    console.log(id, this.idCopiado)
  }
  reloadPage() {
    // Llama al servicio para recargar la página
    this.PageReloadService.reloadPage();
  }


}


