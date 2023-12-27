import { Component, OnInit, HostBinding } from '@angular/core';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultasService } from 'src/app/services/consultas.service';
import { FechaService } from 'src/app/services/fecha.service';
import {  Ienum } from 'src/app/models/Ienum';
import { nation, municipio, etnias, ecivil, academic, parents, lenguaje, servicio, servicios } from 'src/app/enums/enums';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'form-coex',
  templateUrl: './form-coex.component.html',
  styleUrls: ['./form-coex.component.css']
})
export class FormCoexComponent implements OnInit {


  constructor(
    private ConsultasService: ConsultasService,
    private FechaService: FechaService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private user: UsersService,

  ) { }

  public consultas: Iconcultas[] = [];
  public resumen: Iconcultas[] = [];
  public fechaActual: string = this.FechaService.FechaActual();
  public horaActual: string = this.FechaService.HoraActual();
  public fechaRecepcion: string = this.FechaService.registroTiempo();
  edit: boolean = false;
  public selectdate: string = '';
  public maxdate: string = '';
  private nuevoStatus: number = 0;
  public username = this.user.getUsernameLocally()



  @HostBinding('class') clases = 'row';

  coex: Iconcultas = {
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
    fecha_recepcion: this.fechaRecepcion,
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

    this.coex.created_by = this.username;
    // Obtener los parámetros de la ruta
    const params = this.activateRoute.snapshot.params;

    // Verificar si se proporcionó un ID de paciente
    if (params['id']) {
      this.ConsultasService.Consulta(params['id'])
        .subscribe(
          data => {
            this.coex = data;
            this.edit = true;


          },
          error => console.log(error)
        )
    }
    this.resumen;


  }

  onSubmit() {

    this.ConsultasService.editarConsulta(this.coex.id, this.coex)
      .subscribe(data => {
        this.coex = data;
        this.router.navigate(['/coex']);
      })


  }

  status() {
    this.coex.fecha_recepcion = this.fechaRecepcion
    if (this.coex.fecha_recepcion) {

      this.coex.status = 2;
    }
    else {
      this.coex.status = 1;
    }
  }

  limpiarInput() {
    this.coex.fecha_recepcion = null;
    this.coex.status = 1;
  }


}
