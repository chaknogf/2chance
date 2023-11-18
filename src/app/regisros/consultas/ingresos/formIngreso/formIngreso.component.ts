import { AppComponent } from './../../../../app.component';
import { Component, OnInit, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultasService } from 'src/app/services/consultas.service';
import { FechaService } from 'src/app/services/fecha.service';
import {  Ienum } from 'src/app/models/Ienum';
import { nation, municipio, etnias, ecivil, academic, parents, lenguaje, servicio, servicios } from 'src/app/enums/enums';
import { UsersService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'formIngreso',
  templateUrl: './formIngreso.component.html',
  styleUrls: ['./formIngreso.component.css']
})
export class FormIngresoComponent implements OnInit {
  constructor(
    private ConsultasService: ConsultasService,
    private FechaService: FechaService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private user: UsersService,
    private _location: Location,
    private pt: PacientesService,



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
  public patient: Ipaciente | any;



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
    servicio: 0,
    status: 1,
    fecha_recepcion: '',
    fecha_egreso: null,
    tipo_consulta: 2,
    nota: "",
    name: null,
    lastname: null,
    prenatal: null,
    lactancia: null,
    dx: null,
    medico: null,
    folios: null,
    archived_by: null,
    created_at: '',
    updated_at: '',
    created_by: null
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

    // Verificar si se proporcionó un ID de paciente
    if (params['id']) {
      this.ConsultasService.Consulta(params['id'])
        .subscribe(
          data => {
            this.consulta = data;
            this.edit = true;
            this.pt.getPaciente(this.consulta.expediente)
              .subscribe( dtas => {
                this.patient = dtas;
            })


          },
          error => console.log(error)
        )
    }
    this.resumen;


  }

  editar() {

    this.ConsultasService.editarConsulta(this.consulta.id, this.consulta)
      .subscribe(data => {
        this.consulta = data;
        console.log(data)
        this.router.navigate(['/ingresos']);
      })


  }

  @ViewChild('edadCell', { static: false }) edadCell: ElementRef = new ElementRef(null);


  copiarId() {
  console.log(this.consulta);
  this.consulta.nombres = this.patient?.nombre;
  this.consulta.apellidos = this.patient?.apellido; // Corregido
  this.consulta.nacimiento = this.patient?.nacimiento;
  // this.consulta.edad = valorCelda;
  this.consulta.sexo = this.patient?.sexo;
  this.consulta.direccion = this.patient?.direccion;
  this.consulta.telefono = this.patient?.telefono;
  console.log(this.consulta);
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
