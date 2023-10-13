import { PageReloadService } from './../../services/PageReload.service';
import { Component, OnInit } from '@angular/core';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { ConsultasService } from 'src/app/services/consultas.service';
import { IenumEspecialidad, Ienum } from 'src/app/models/Ienum';
import { servicio, parents, municipio, nacionalidades, etnias, ecivil, academic, lenguaje,  } from 'src/app/enums/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import { FechaService } from 'src/app/services/fecha.service';
import { Ipaciente } from 'src/app/models/Ipaciente';

@Component({
  selector: 'emergencias',
  templateUrl: './emergencias.component.html',
  styleUrls: ['./emergencias.component.css']
})
export class EmergenciasComponent implements OnInit {


  constructor(
    private ConsultasService: ConsultasService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private FechaService: FechaService,
    private PageReloadService: PageReloadService


  ) { }


  public emergencias: Iconcultas[] = [];
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

  emergencia: Iconcultas = {
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
    acompa: null,
    parente: null,
    telefono: null,
    especialidad: 0,
    recepcion: false,
    fecha_recepcion: null,
    fecha_egreso: null,
    tipo_consulta: 3,
    nota: null,
    name: null,
    lastname: null,

  }
  e: IenumEspecialidad = {
    servicio: servicio

  }

  enum: Ienum = {
    municipio: municipio,
    nation: nacionalidades,
    people: etnias,
    ecivil: ecivil,
    academic: academic,
    parents: parents,
    lenguage: lenguaje,
  }



  ngOnInit() {



  }

  calcularedad() {
    this.edadA = this.FechaService.años(this.emergencia.nacimiento);
    this.edadMeses = this.FechaService.meses(this.emergencia.nacimiento);
    this.edadDias = this.FechaService.dias(this.emergencia.nacimiento);
    this.emergencia.edad = `${this.edadA} años ${this.edadMeses} meses ${this.edadDias} dias`;
  }

  calcularnacimiento() {
    // Verificar que tengamos valores válidos en años, meses y días
    if (this.edadA >= 0 && this.edadMeses >= 0 && this.edadDias >= 0) {
      const hoy = new Date(); // Fecha actual
      const fechaNacimiento = new Date(hoy);

      // Restar años, meses y días a la fecha actual
      fechaNacimiento.setFullYear(hoy.getFullYear() - this.edadA);
      fechaNacimiento.setMonth(hoy.getMonth() - this.edadMeses);
      fechaNacimiento.setDate(hoy.getDate() - this.edadDias);

      // Asignar 'fechaNacimiento' a 'this.emergencia.nacimiento'
      this.emergencia.nacimiento = fechaNacimiento.toISOString(); // Esto asigna la fecha como una cadena ISO (ejemplo: '2023-10-23T00:00:00.000Z')
    } else {
      // Manejar un error o mostrar un mensaje de advertencia si los valores no son válidos
      console.error("Valores de edad no válidos");
    }
  }



  registrarEmergencia(): void {
    this.ConsultasService.registrar(this.emergencia)
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

  formatPhoneNumber(inputValue: string) {
    const numericAndSpaceValue = inputValue.replace(/[^\d\s]/g, '');
    const formattedValue = numericAndSpaceValue.replace(/(\d{8})(?=\d)/g, '$1 ');
    this.emergencia.telefono = formattedValue;
  }

  formatDPI(inputValue: string) {
    const numericAndSpaceValue = inputValue.replace(/[^\d\s]/g, '');
    const formattedValue = numericAndSpaceValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    this.emergencia.telefono = formattedValue;
  }


}
