import { PageReloadService } from './../../services/PageReload.service';
import { FechaService } from 'src/app/services/fecha.service';
import { ConsultasService } from './../../services/consultas.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IenumEspecialidad } from 'src/app/models/Ienum';
import { servicio } from './../../enums/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Iconcultas } from 'src/app/models/Iconsultas';


@Component({
  selector: 'coex',
  templateUrl: './coex.component.html',
  styleUrls: ['./coex.component.css']
})
export class CoexComponent implements OnInit {

  day: string = new Date().getDate().toString().padStart(2, '0');
  month: string = (new Date().getMonth()+1).toString().padStart(2, '0');
  year: string = new Date().getFullYear().toString();
  today: string = "";
  public x: string = this.today;
  public pacientes: [] = [];
  public consultas: Iconcultas[] = [];
  public consultasPedia: Iconcultas[] = [];
  public consultasTrauma: Iconcultas[] = [];
  public consultasCiru: Iconcultas[] = [];
  public consultasGine: Iconcultas[] = [];
  public consultasPsico: Iconcultas[] = [];
  public consultasNutri: Iconcultas[] = [];
  public consultasHoy: Iconcultas[] = [];
  public consultasMedi: Iconcultas[] = [];
  public contador: number = 0;
  public expedienteBuscar: any = '';
  public nombreBuscar: string = '';
  public apellidoBuscar: string = '';
  public dpiBuscar: any = '';
  public fechaActual: string = this.FechaService.FechaActual();
  public horaActual: string = this.FechaService.HoraActual();
  public idCopiado: number = 0;
  public fechaRecepcion: string = this.FechaService.registroTiempo();


  coex: Iconcultas = {
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
    recepcion: false,
    fecha_recepcion: null,
    fecha_egreso: null,
    tipo_consulta: 1,
    nota: "",
    name: null,
    lastname: null,


   }

  e: IenumEspecialidad = {
    servicio: servicio
  }

  @Output() idConsulta = new EventEmitter<number>();
  constructor(
    private pacientesService: PacientesService,
    private ConsultasService: ConsultasService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private FechaService: FechaService,
    private PageReloadService: PageReloadService
  ) { }

  ngOnInit() {

    this.today = `${this.year}-${this.month}-${this.day}`;
    this.consultasmedicina(this.today);
    this.consultaspedia(this.today);
    this.consultasgine(this.today);
    this.consultasciru(this.today);
    this.consultastrauma(this.today);
    this.consultaspsico(this.today);
    this.consultasnutri(this.today);
  }

  updateDate() {
    // Convierte los valores de día, mes y año a números enteros
    const dayInt = parseInt(this.day, 10);
    const monthInt = parseInt(this.month, 10);
    const yearInt = parseInt(this.year, 10);

    // Verifica que los valores sean válidos (por ejemplo, día entre 1 y 31, mes entre 1 y 12, etc.)
    if (dayInt >= 1 && dayInt <= 31 && monthInt >= 1 && monthInt <= 12 && yearInt >= 1900) {
      // Actualiza la fecha si los valores son válidos
      this.x = `${this.year}-${this.month}-${this.day}`;

      //vaciar los arrays
      this.consultasMedi = [];
      this.consultasPedia = [];
      this.consultasTrauma = [];
      this.consultasCiru = [];
      this.consultasGine = [];
      this.consultasPsico = [];
      this.consultasNutri = [];

      // Llama a las funciones para actualizar los datos de las citas
      // this.citasmedicina(this.x);
      // this.citaspedia(this.x);
      // this.citaciru(this.x);
      // this.citapsico(this.x);
      // this.citastrauma(this.x);
      // this.citagine(this.x);
    } else {
      // Los valores ingresados no son válidos, puedes manejar esto de acuerdo a tus necesidades

    }
  }

  consultasmedicina(fecha: string) {
    this.ConsultasService.consultando(fecha, 1, 1).subscribe(data => {
      this.consultasMedi = data;
       })
  }

  consultaspedia(fecha: string) {
    this.ConsultasService.consultando(fecha, 1, 2).subscribe(data => {
      this.consultasPedia = data;
       })
  }
  consultasgine(fecha: string) {
    this.ConsultasService.consultando(fecha, 1, 3).subscribe(data => {
      this.consultasGine = data;
       })
  }
  consultasciru(fecha: string) {
    this.ConsultasService.consultando(fecha, 1, 4).subscribe(data => {
      this.consultasCiru = data;
       })
  }
  consultastrauma(fecha: string) {
    this.ConsultasService.consultando(fecha, 1, 5).subscribe(data => {
      this.consultasTrauma = data;
       })
  }
  consultaspsico(fecha: string) {
    this.ConsultasService.consultando(fecha, 1, 6).subscribe(data => {
      this.consultasPsico = data;
       })
  }
  consultasnutri(fecha: string) {
    this.ConsultasService.consultando(fecha, 1, 7).subscribe(data => {
      this.consultasNutri = data;
       })
  }

  changeRecepcion(id: number) {
    let estado: string;
    let registro: string;

    if (this.coex.recepcion === false) {
      estado = 'true';
      registro = this.fechaRecepcion;
      this.showAlert("Recepción activada");
    } else {
      estado = 'false';
      registro = '';
      this.showAlert("Recepción desactivada");
    }

    this.ConsultasService.recepcion(id, estado, registro).subscribe(data => {
      this.consultas = data;
    });
  }

  showAlert(message: string) {
    alert(message);
  }






  eliminar(id: number) {
    this.ConsultasService.eliminar(id)
      .subscribe(data => {
        this.coex = data;
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