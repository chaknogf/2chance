

import { PageReloadService } from '../../../../services/PageReload.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { ConsultasService } from 'src/app/services/consultas.service';
import {  Ienum } from 'src/app/models/Ienum';
import { servicio, parents, municipio, nation, etnias, ecivil, academic, lenguaje, servicios } from 'src/app/enums/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import { FechaService } from 'src/app/services/fecha.service';
import { Ipaciente, Iv_paciente } from 'src/app/models/Ipaciente';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'formIngreso',
  templateUrl: './formIngreso.component.html',
  styleUrls: ['./formIngreso.component.css']
})
export class FormIngresoComponent implements OnInit {


  constructor(
    private ConsultasService: ConsultasService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private FechaService: FechaService,
    private PageReloadService: PageReloadService,
    public PacientesService: PacientesService,
    private user: UsersService,

  ) {

     // Calcula la fecha máxima (puedes ajustar esto según tus necesidades)
    const fechaActual = new Date();
    fechaActual.setFullYear(fechaActual.getFullYear() - 1); // Restar un año
    this.maxdate = fechaActual.toISOString().split('T')[0];
  }
  public username = this.user.getUsernameLocally();
  @Output() idConsulta = new EventEmitter<number>();
  public pacientes: Ipaciente[] = [];
  public ingresos: Iconcultas[] = [];
  public expedienteBuscar: any = '';
  public nombreBuscar: string = '';
  public apellidoBuscar: string = '';
  public dpiBuscar: any = '';
  public fechaActual: string = this.FechaService.FechaActual();
  public horaActual: string = this.FechaService.HoraActual();
  public idCopiado: number = 0;
  public fechaRecepcion: string = this.FechaService.registroTiempo();
  public edadA: number = 0;
  public edadMeses: number = 0;
  public edadDias: number = 0;
  public selectdate: string = '';
  public maxdate: string = '';
  edit: boolean = false;
  isDead: boolean = false; // Variable para el estado de fallecido (checkbox)


  ingreso: Iconcultas = {
    id: 0,
    hoja_emergencia: null,
    expediente: null,
    fecha_consulta: "",
    hora: "",
    nombres: "",
    apellidos: "",
    nacimiento: "",
    edad: `${this.edadA} años ${this.edadMeses} meses ${this.edadDias} dias`,
    sexo: null,
    dpi: null,
    direccion: "",
    acompa: "",
    parente: null,
    telefono: null,
    especialidad: 0,
    servicio: null,
    status: 1,
    fecha_recepcion: null,
    fecha_egreso: null,
    tipo_consulta: 2,
    nota: null,
    name: null,
    lastname: null,
    prenatal: null,
    lactancia: null,
    dx: null,
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

  vpa: Iv_paciente = {
    nombre: "",
    expediente: 0,
    sexo: "",
    apellido: "",
    nacimiento: "",
    id: 0,
    dpi: 0,
    estado: ""

  }

   // Objeto del paciente
  p: Ipaciente = {
    id: 0,
    expediente: 0,
    nombre: "",
    apellido: "",
    dpi: 0,
    pasaporte: "",
    sexo: "",
    nacimiento: new Date(),
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
    created_by: "admin",
    fechaDefuncion: "",
    municipio: "",
    nation: "",
    people: "",
    ecivil: "",
    academic: "",
    parents: "",
    lenguage: "",
    created_at: "",
    update_at: ""
  };
  ep: Ienum = {
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

    this.p.created_by = this.username;
// Obtiene la fecha actual en el formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];
    this.maxdate = currentDate;

     // Obtener los parámetros de la ruta
     const params = this.activateRoute.snapshot.params;

     // Verificar si se proporcionó un ID de paciente
     if (params['id']) {
       this.ConsultasService.Consulta(params['id'])
         .subscribe(
           data => {
             this.ingreso = data;
             this.edit = true;
             let expediente = this.ingreso.expediente;
             console.log(expediente)
             this.PacientesService.getPaciente(expediente)
               .subscribe(
                 datap => {
                   this.vpa = datap;
                   console.log(this.ingreso.expediente, datap)
                   let idPaciente = this.vpa.id;
                   console.log(idPaciente)
                   this.PacientesService.getIdPaciente(idPaciente)
                    .subscribe(
                    datas => {
                    this.p = datas;
                    console.log(datas)

                    }
                  )
               }
             )
           },
           error => console.log(error)
         )
    }






  }


  onAcompaChange() {
    // Verificar si el campo acompañante tiene contenido
    if (this.ingreso.acompa !== '') {
      this.ingreso.parente = 9; // Asignar el valor "9" al campo parente
    }
  }





  registrarIngreso(): void {
    this.ConsultasService.registrar(this.ingreso)
      .subscribe((response) => {
        // Manejar la respuesta exitosa aquí, si es necesario
        console.log('Consulta registrada con éxito', response);

        // Mostrar una alerta de éxito con estilo Bootstrap
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', 'alert-success', 'fixed-top');
        alertDiv.textContent = 'Consulta registrada con éxito';
        document.body.appendChild(alertDiv);

        // Retrasar la recarga de la página por, por ejemplo, 1 segundo
        setTimeout(() => {
          this.reloadPage();
        }, 2000); // 1000 ms = 1 segundo
      },
        (error) => {
          // Manejar errores aquí
          console.error('Error al crear consulta', error);

          // Mostrar una alerta de error con estilo Bootstrap
          const alertDiv = document.createElement('div');
          alertDiv.classList.add('alert', 'alert-danger', 'fixed-top');
          alertDiv.textContent = 'Error al crear consulta';
          document.body.appendChild(alertDiv);

          // // Retrasar la recarga de la página por, por ejemplo, 1 segundo
          // setTimeout(() => {
          //   this.reloadPage();
          // }, 2000); // 1000 ms = 1 segundo


        }
      );

  }

  reloadPage() {
    // Llama al servicio para recargar la página
    this.PageReloadService.reloadPage();
  }




  editar() {
    // Editar el paciente existente
    this.ConsultasService.editarConsulta(this.ingreso.id, this.ingreso)
      .subscribe(data => {
        this.ingreso = data;
        this.router.navigate(['/ingresos']);
      })

    // Editar el paciente existente
    this.PacientesService.editPaciente(this.p.expediente, this.p)
      .subscribe(data => {
        this.p = data;
        this.router.navigate(['/ingresos']);
      })
  }

  cambiarEstado() {

    // const confirmacion = confirm('¿Estás seguro de cambiar el estado?');
    // if (confirmacion) {
      if (this.p.estado === 'm') {
        this.p.estado = 'v';
      } else {
        this.p.estado = 'm';
        this.p.fechaDefuncion = ""; // Asignar la fecha actual como fecha de defunción
      }
    // }
  }





  formatPhoneNumber(inputValue: string) {
    const numericAndSpaceValue = inputValue.replace(/[^\d\s]/g, '');
    const formattedValue = numericAndSpaceValue.replace(/(\d{8})(?=\d)/g, '$1 ');
    this.p.telefono = formattedValue;
  }

  status() {
    this.ingreso.fecha_egreso = this.fechaActual;
    this.ingreso.status = 2;


  }

  recepcion() {
    this.ingreso.fecha_recepcion = this.fechaRecepcion
  }

  limpiaregreso() {
    this.ingreso.fecha_egreso = null;
    this.ingreso.status = 1;
  }

  limpiarrecepcion() {
    this.ingreso.fecha_recepcion = null;

  }


}
