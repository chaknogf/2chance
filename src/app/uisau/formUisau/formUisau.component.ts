import { FechaService } from './../../services/fecha.service';
import { PageReloadService } from './../../services/PageReload.service';
import { Component, OnInit } from '@angular/core';
import { parents, servicio, servicios, estado, estadia, referencia, situacion  } from 'src/app/enums/enums';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/services/user.service';

import { Iuisau } from 'src/app/models/Iuisau';
import { UisauService } from 'src/app/services/uisau.service';
import { uisauEnum } from 'src/app/models/Ienum';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Iconcultas } from 'src/app/models/Iconsultas';
@Component({
  selector: 'app-formUisau',
  templateUrl: './formUisau.component.html',
  styleUrls: ['./formUisau.component.css']
})
export class FormUisauComponent implements OnInit {

  constructor(
    private activateRoute: ActivatedRoute,
    private Fecha: FechaService,
    private PageReloadService: PageReloadService,
    private _location: Location,
    private user: UsersService,
    private au: UisauService,
    private consultas: ConsultasService  ) { }

  public username = this.user.getUsernameLocally();
  public resumen: Iuisau[] = [];
  public maxdate: string = '';
  public mindate: any = '';
  public fechaActual: string = this.Fecha.FechaActual();
  public horaActual: string = this.Fecha.HoraActual();
  public registro: string = this.Fecha.registroTiempo();
  public idCopiado: number = 0;
  private new: boolean = false;
  private consu: Iconcultas | any
  public message: string = '';
  showAlertSuccess = false;
  showAlertWarning = false;


  info: Iuisau = {
    id: 0,
    expediente: null,
    nombres: null,
    apellidos: null,
    estado: null,
    situacion: null,
    lugar_referencia: null,
    fecha_referencia: null,
    estadia: null,
    cama: null,
    especialidad: null,
    servicio: null,
    informacion: null,
    contacto: null,
    parentesco: null,
    telefono: null,
    fecha: this.registro,
    nota: null,
    estudios: null,
    evolucion: null,
    id_consulta: null,
    created_by: null
  }

  c: Iconcultas = {
    id: 0,
    hoja_emergencia: null,
    expediente: undefined,
    fecha_consulta: '',
    hora: null,
    nombres: null,
    apellidos: null,
    nacimiento: null,
    edad: null,
    sexo: null,
    dpi: null,
    direccion: null,
    acompa: null,
    parente: null,
    telefono: '',
    especialidad: null,
    servicio: null,
    status: null,
    fecha_recepcion: null,
    fecha_egreso: null,
    tipo_consulta: null,
    nota: null,
    name: null,
    lastname: null,
    prenatal: null,
    lactancia: null,
    dx: null,
    folios: null,
    medico: null,
    archived_by: null,
    created_at: null,
    updated_at: null,
    created_by: null
  }

  op: uisauEnum = {
    estadia: estadia,
    situacion: situacion,
    estado: estado,
    referencia: referencia,
    especialidad: servicio,
    parentesco: parents,
    servicios: servicios
  }

  ngOnInit() {
    this.maxdate = this.Fecha.FechaActual();

    this.info.created_by = this.username;
    const params = this.activateRoute.snapshot.params;

    if (params['id']) {
      this.info.id_consulta = params['id'];
      this.new = true;

      this.consultas.Consulta(params['id']).subscribe(
        data => {
          this.consu = data;
          this.c = data;
          this.mindate = this.c.fecha_consulta;
          this.info.nombres = this.c.nombres
          this.info.apellidos = this.c.apellidos
          this.info.expediente = this.c.expediente
          this.info.telefono = this.c.telefono ? parseInt(this.c.telefono, 10) : null;
          this.info.contacto = this.c.acompa;
          this.info.parentesco = this.c.parente;
          this.info.especialidad = this.c.especialidad;
          this.info.servicio = this.c.servicio;
        });
    }






  }


  regresar(){
    this._location.back();

  }

  closeAlert(): void {
    this.showAlertSuccess = false;
    this.showAlertWarning = false;
  }

  registrar(): void {
    this.au.crear(this.info).subscribe(
      (response) => {
        console.log('Consulta registrada con éxito', response);
        this.message = 'Consulta registrada con éxito';
        this.showAlertSuccess = true;
        this.reloadPage();
      },
      (error) => {
        console.error('Error al crear consulta', error);
        this.message = 'Error al crear consulta';
        this.showAlertWarning = true;
        this.reloadPage();
      }
    );
  }



  reloadPage() {
    // Llama al servicio para recargar la página
    this.PageReloadService.reloadPage();

  }


  refFiltrados: any[] = []; // Lista de municipios filtrados
  ref: number = 0;

  mostrarRef() {
    if (this.info.situacion == 4) {
      this.refFiltrados = this.op.referencia;
      console.log(this.refFiltrados, this.info.situacion)
    } else {
      this.refFiltrados = []
    }
  }





}

