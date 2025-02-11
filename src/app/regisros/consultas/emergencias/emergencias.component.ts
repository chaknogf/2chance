import { PageReloadService } from '../../../services/PageReload.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Ienum } from 'src/app/models/Ienum';
import { nation, etnias, ecivil, academic, parents, lenguaje, servicio, servicios } from 'src/app/enums/enums';
import { municipio } from 'src/app/enums/vencindad';
import { ActivatedRoute, Router } from '@angular/router';
import { FechaService } from 'src/app/services/fecha.service';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/services/user.service';
import { EnumsService } from 'src/app/services/enums.service';

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
    private PageReloadService: PageReloadService,
    private _location: Location,
    private user: UsersService,
    private enums: EnumsService


  ) {


    // Calcula la fecha máxima (puedes ajustar esto según tus necesidades)
    const fechaActual = new Date();
    fechaActual.setFullYear(fechaActual.getFullYear() - 1); // Restar un año
    this.maxdate = fechaActual.toISOString().split('T')[0];
  }



  public username = this.user.getUsernameLocally()
  public emergencias: Iconcultas[] = [];
  public expedienteBuscar: any = '';
  public nombreBuscar: string = '';
  public apellidoBuscar: string = '';
  public dpiBuscar: any = '';
  public fechaActual: string = this.FechaService.FechaActual();
  public horaActual: string = this.FechaService.HoraActual();
  public idCopiado: number = 0;
  public fechaRecepcion: string = this.FechaService.registroTiempo();
  public edadA: any = '';
  public edadMeses: any = '';
  public edadDias: any = '';
  public selectdate: string = '';
  public maxdate: string = '';
  edit: boolean = false;
  public tuNumero: any = 0;
  public fechaEgreso: string = this.FechaService.FechaActual();


  emergencia: Iconcultas = {
    id: 0,
    hoja_emergencia: this.tuNumero.toString(),
    expediente: null,
    fecha_consulta: this.fechaActual,
    hora: this.horaActual,
    nombres: '',
    apellidos: '',
    nacimiento: new Date(),
    edad: `${this.edadA} años ${this.edadMeses} meses ${this.edadDias} dias`,
    sexo: null,
    dpi: '',
    direccion: '',
    acompa: null,
    parente: null,
    telefono: null,
    especialidad: 0,
    servicio: null,
    status: 1,
    fecha_recepcion: null,
    fecha_egreso: null,
    tipo_consulta: 3,
    nota: null,
    name: null,
    lastname: null,
    prenatal: null,
    lactancia: null,
    dx: null,
    folios: null,
    archived_by: null,
    created_at: null,
    updated_at: null,
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
    this.emergencia.created_by = this.username;
    this.emergencia.hoja_emergencia = this.tuNumero.toString();
    //console.table(this.emergencia)

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
            this.emergencia = data;
            this.edit = true;
          },
          error => console.log(error)
        )
    }


  }

  regresar() {
    this._location.back();
  }

  agregardata(data: any) {
    this.emergencia.expediente = data;
  }

  calcularedad() {
    this.edadA = this.FechaService.años(this.emergencia.nacimiento);
    this.edadMeses = this.FechaService.meses(this.emergencia.nacimiento);
    this.edadDias = this.FechaService.dias(this.emergencia.nacimiento);
    this.emergencia.edad = `${this.edadA} años ${this.edadMeses} meses ${this.edadDias} dias`;
  }

  calcularNacimiento() {
    if (this.edadA >= 0 && this.edadMeses >= 0 && this.edadDias >= 0) {
      const hoy = new Date();
      const fechaNacimiento = new Date(hoy);
      fechaNacimiento.setFullYear(hoy.getFullYear() - this.edadA);
      fechaNacimiento.setMonth(hoy.getMonth() - this.edadMeses);
      fechaNacimiento.setDate(hoy.getDate() - this.edadDias);

      this.emergencia.nacimiento = fechaNacimiento.toISOString().split('T')[0];
    } else {
      console.error("Valores de edad no válidos");
    }
  }


  registrarEmergencia(): void {
    this.ConsultasService.registrar(this.emergencia)
      .subscribe((response) => {
        console.table(this.emergencia, response)
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
          console.table(this.emergencia)
        }, 2000); // 1000 ms = 1 segundo
      },
        (error) => {
          // Manejar errores aquí
          console.error('Error al crear consulta', error);
          console.table(this.emergencia, error)
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

  // formatDPI(inputValue: string): void {
  //   const numericAndSpaceValue = inputValue.replace(/[^\d\s]/g, '');
  //   const formattedValue = numericAndSpaceValue.replace(/(\d{4})(?=\d)/g, '$1 ');
  //   this.emergencia.telefono = formattedValue;

  // }

  editar() {
    // Editar el paciente existente
    this.ConsultasService.editarConsulta(this.emergencia.id, this.emergencia)
      .subscribe(data => {
        this.emergencia = data;
        this.router.navigate(['/emergencias']);
      })
  }

  archivar() {
    this.emergencia.archived_by = this.username;
    this.emergencia.fecha_recepcion = this.fechaRecepcion;
    this.emergencia.fecha_egreso = this.fechaEgreso;
    this.emergencia.status = 2
  }

}
