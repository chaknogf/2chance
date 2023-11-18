import { Ienum, deptos } from 'src/app/models/Ienum';
import { PacientesService } from '../../../services/pacientes.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { ActivatedRoute, Router } from '@angular/router';
import { FechaService } from 'src/app/services/fecha.service';
import {  municipio, etnias, ecivil, academic, parents, lenguaje, servicio, servicios, nation, departamentos, Municipio } from 'src/app/enums/enums';
import { UsersService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { __values } from 'tslib';


@Component({
  selector: 'app-recienacidos',
  templateUrl: './recienacidos.component.html',
  styleUrls: ['./recienacidos.component.css']
})
export class RecienacidosComponent implements OnInit {

  constructor(
    public PacientesService: PacientesService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private fecha: FechaService,
    private user: UsersService,
    private _location: Location,
  ) { }


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
  d: deptos = {
    departamentos: departamentos
  }
  rn: Ipaciente = {
    id: 0,
    expediente: 0,
    nombre: "",
    apellido: "",
    dpi: 0,
    pasaporte: "",
    sexo: "",
    nacimiento: "",
    nacionalidad: 1,
    lugar_nacimiento: 0,
    estado_civil: 0,
    educacion: 0,
    pueblo: 0,
    idioma: 0,
    ocupacion: "",
    direccion: "",
    telefono: "",
    email: "user@example.com",
    padre: "",
    madre: "",
    responsable: "",
    parentesco: 0,
    dpi_responsable: 0,
    telefono_responsable: 0,
    estado: "v",
    exp_madre: 0,
    created_by: '',
    fechaDefuncion: "",
    municipio: 0,
    created_at: "",
    update_at: "",
    depto: 0
  };

  edit: boolean = false;
  isDead: boolean = false;
  public pacientes: Ipaciente[] = [];
  public selectdate: string = '';
  public maxdate: string = '';
  public username = this.user.getUsernameLocally()
  @Input() nombreBebe: string = '';
  public nuevoExp: number = 0;
  exp = this.NuevoExp()
  public madre: Ipaciente = {
    id: 0,
    expediente: 0,
    nombre: '',
    apellido: '',
    dpi: 0,
    pasaporte: '',
    sexo: '',
    nacimiento: '',
    nacionalidad: 0,
    lugar_nacimiento: 0,
    estado_civil: 0,
    educacion: 0,
    pueblo: 0,
    idioma: 0,
    ocupacion: '',
    direccion: '',
    municipio: 0,
    depto: 0,
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
    created_at: '',
    update_at: ''
  }
  public hoy = this.fecha.FechaActual();


  ngOnInit() {
    this.rn.created_by = this.username;
    // Obtiene la fecha actual en el formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];
    this.maxdate = currentDate;
    this.rn.nacimiento = this.hoy;
    console.log(this.madre.nombre)
    // Obtener el expediente del paciente
    //this.NuevoExp()



    // Obtener los parámetros de la ruta
    const params = this.activateRoute.snapshot.params;

    // Verificar si se proporcionó un ID de paciente
    if (params['id']) {
      this.PacientesService.getIdPaciente(params['id'])
        .subscribe(
          data => {
            this.madre = data;


          },
          error => console.log(error)
        )
    }
  }




  nombreDeRN() {
    if (this.rn.sexo === 'M') {
      this.nombreBebe = 'HIJO DE '
      this.rn.nombre = this.nombreBebe + this.madre?.nombre;

    }
    else {
      this.nombreBebe = 'HIJA DE '
      this.rn.nombre = this.nombreBebe + this.madre?.nombre;

    }
    this.copiarDatosMadre()
    console.log(this.rn.sexo, this.nombreBebe,this.rn.nombre)
  }


  regresar(){
    this._location.back();
  }


  copiarDatosMadre() {

    this.rn.apellido = this.madre.apellido;
    this.rn.madre = this.madre.nombre + ' ' + this.madre.apellido;
    this.rn.nacionalidad = 1;
    this.rn
    this.rn.lugar_nacimiento = 406;
    this.rn.estado_civil = 3;
    this.rn.educacion = 1;
    this.rn.pueblo = this.madre.pueblo;
    this.rn.idioma = this.madre.idioma;
    this.rn.direccion = this.madre.direccion;
    this.rn.email = this.madre.email;
    this.rn.responsable = this.madre.nombre + ' ' + this.madre.apellido;
    this.rn.parentesco = 1;
    this.rn.dpi_responsable = this.madre.dpi;
    this.rn.telefono = this.madre.telefono;
    this.rn.estado = "v";
    this.rn.exp_madre = this.madre.expediente;
    this.rn.municipio = this.madre.municipio;
    this.rn.depto = this.madre.depto;


    console.log(this.rn)
  }

  NuevoExp() {
    // Obtener el expediente del paciente inicialmente
    this.PacientesService.Expediente().subscribe(data => {
      if (this.edit == false) {
        this.nuevoExp = data;
        this.rn.expediente = this.nuevoExp;
      }
    });

  }

  crear() {
    this.PacientesService.crearPaciente(this.rn)
      .subscribe(data => {
        this.rn = data;
        this.regresar();
        console.log(data);
    })
  }



}
