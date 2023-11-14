import { Component, OnInit, HostBinding } from '@angular/core';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultasService } from 'src/app/services/consultas.service';
import { FechaService } from 'src/app/services/fecha.service';
import {  Ienum } from 'src/app/models/Ienum';
import { nation, municipio, etnias, ecivil, academic, parents, lenguaje, servicio, servicios } from 'src/app/enums/enums';
import { UsersService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { PacientesService } from 'src/app/services/pacientes.service';


@Component({
  selector: 'app-detalleUisau',
  templateUrl: './detalleUisau.component.html',
  styleUrls: ['./detalleUisau.component.css']
})
export class DetalleUisauComponent implements OnInit {
  constructor(
    private ConsultasService: ConsultasService,
    private FechaService: FechaService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private user: UsersService,
    private _location: Location,
    private pt: PacientesService,
    private route: ActivatedRoute,


  ) { }

  public consultas: Iconcultas[] = [];
  public resumen: Iconcultas[] = [];
  public fechaActual: string = this.FechaService.FechaActual();
  public horaActual: string = this.FechaService.HoraActual();
  public fechaRecepcion: string = this.FechaService.registroTiempo();
  public fechaEgreso: string = this.FechaService.FechaActual();
  edit: boolean = false;
  public selectdate: string = '';
  public maxdate: string = '';
  private nuevoStatus: number = 0;
  public username = this.user.getUsernameLocally()
  public rutaAnterior: string = '../';
  public patient: Ipaciente | undefined;
  public consult: Iconcultas | undefined;



  @HostBinding('class') clases = 'row';

  consulta: Iconcultas = {
    id: 0,
    hoja_emergencia: null,
    expediente: null,
    fecha_consulta: "",
    hora: "",
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
    fecha_recepcion: '',
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
    medico: null
  }

  paciente: Ipaciente = {
    id: 0,
    expediente: 0,
    nombre: '',
    apellido: '',
    dpi: 0,
    pasaporte: '',
    sexo: '',
    nacimiento: new Date(),
    nacionalidad: 0,
    lugar_nacimiento: 0,
    estado_civil: 0,
    educacion: 0,
    pueblo: 0,
    idioma: 0,
    ocupacion: '',
    direccion: '',
    telefono: '',
    email: '',
    padre: '',
    madre: '',
    responsable: '',
    parentesco: 0,
    dpi_responsable: 0,
    telefono_responsable: 0,
    estado: '',
    exp_madre: 0,
    created_by: '',
    fechaDefuncion: '',
    municipio: 0,
    created_at: '',
    update_at: '',
    depto: 0
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


  ngOnInit() {

    // Obtiene la fecha actual en el formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];
    this.maxdate = currentDate;

    this.consulta.created_by = this.username;
    // Obtener los parámetros de la ruta
    const params = this.activateRoute.snapshot.params;

    if (params['id']) {
      this.ConsultasService.Consulta(params['id'])
        .subscribe(
          data => {
            this.consulta = data;
            this.edit = true;
            this.pt.getPaciente(this.consulta.expediente)
              .subscribe(
                dta => {
                  this.paciente = dta;

              }
            )
          },
          error => console.log(error)
        )
    }
    this.resumen;

  }

  onSubmit() {

    this.ConsultasService.editarConsulta(this.consulta.id, this.consulta)
      .subscribe(data => {
        this.consulta = data;
        this.router.navigate(['/recepciones']);
      })


  }

  recepcion() {
    this.consulta.fecha_recepcion = this.fechaRecepcion;
    if (this.consulta.fecha_recepcion) {
      this.consulta.status = 2;
    }
    else {
      this.consulta.status = 1;
    }
  }

  statusegreso() {
    this.consulta.fecha_egreso = this.fechaEgreso;
    if (this.consulta.fecha_egreso) {

      this.consulta.status = 2;
    }
    else {
      this.consulta.status = 1;
    }
  }

  limpiarRecepcion() {
    this.consulta.fecha_recepcion = null;
    this.consulta.status = 1;
  }

  limpiarEgreso() {
    this.consulta.fecha_egreso = null;
    this.consulta.status = 1;
  }

  regresar(){
    this._location.back();
  }

}
