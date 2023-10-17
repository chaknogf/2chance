import { PageReloadService } from '../../../services/PageReload.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { ConsultasService } from 'src/app/services/consultas.service';
import {  Ienum } from 'src/app/models/Ienum';
import { servicio, parents, municipio, nacionalidades, etnias, ecivil, academic, lenguaje, servicios } from 'src/app/enums/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import { FechaService } from 'src/app/services/fecha.service';
import { Ipaciente } from 'src/app/models/Ipaciente';

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


  ) {

     // Calcula la fecha máxima (puedes ajustar esto según tus necesidades)
    const fechaActual = new Date();
    fechaActual.setFullYear(fechaActual.getFullYear() - 1); // Restar un año
    this.maxdate = fechaActual.toISOString().split('T')[0];
  }

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
    nacimiento: new Date(),
    edad: `${this.edadA} años ${this.edadMeses} meses ${this.edadDias} dias`,
    sexo: null,
    dpi: null,
    direccion: "",
    acompa: "",
    parente: null,
    telefono: null,
    especialidad: 0,
    servicio: null,
    recepcion: false,
    fecha_recepcion: null,
    fecha_egreso: null,
    tipo_consulta: 2,
    nota: null,
    name: null,
    lastname: null,

  }

  e: Ienum = {
    municipio: municipio,
    nation: nacionalidades,
    people: etnias,
    ecivil: ecivil,
    academic: academic,
    parents: parents,
    lenguage: lenguaje,
    servicios: servicios,
    servicio: servicio
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
    user: "admin",
    fechaDefuncion: "",  // Variable para la fecha de defunción
    municipio: "",
    nation: "",
    people: "",
    ecivil: "",
    academic: "",
    parents: "",
    lenguage: ""

  };



  ngOnInit() {
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
             console.log(data, this.ingreso.expediente)
             if (data) {
               this.getpaciente(this.ingreso.expediente)
               console.log(this.ingreso.expediente)
             }
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

  getpaciente(exp: number) {
    this.PacientesService.getIdPaciente(exp)
        .subscribe(
          data => {
            this.p = data;
            console.log(data)
            console.log(exp)

          },
          error => console.log(error)
        )
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
        this.router.navigate(['/emergencias']);
      })

    // Editar el paciente existente
    this.PacientesService.editPaciente(this.p.expediente, this.p)
      .subscribe(data => {
        this.p = data;
        this.router.navigate(['/pacientes']);
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




}
