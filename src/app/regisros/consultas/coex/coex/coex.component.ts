import { PageReloadService } from '../../../../services/PageReload.service';
import { FechaService } from 'src/app/services/fecha.service';
import { ConsultasService } from '../../../../services/consultas.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {  Ienum } from 'src/app/models/Ienum';
import { nation, etnias, ecivil, academic, parents, lenguaje, servicio, servicios } from 'src/app/enums/enums';
import { municipio, departamentos, vecindad } from 'src/app/enums/vencindad';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { ContadorService } from 'src/app/services/Contador.service';


@Component({
  selector: 'coex',
  templateUrl: './coex.component.html',
  styleUrls: ['./coex.component.css']
})
export class CoexComponent implements OnInit {

  today: string = "";
  selectDate: Date = new Date();
  day: string = new Date().getDate().toString().padStart(2, '0');
  month: string = (new Date().getMonth()+1).toString().padStart(2, '0');
  year: string = new Date().getFullYear().toString();
  slectDay: string = '';
  slectMonth: string = '';
  slectYear: string = '';
  public x: string = this.today;
  public y: number = 0;
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
  public especialidad: number = 0;
  public expedienteBuscar: any = '';
  public nombreBuscar: string = '';
  public apellidoBuscar: string = '';
  public dpiBuscar: any = '';
  public fechaActual: string = this.FechaService.FechaActual();
  public horaActual: string = this.FechaService.HoraActual();
  public idCopiado: number = 0;
  public fechaRecepcion: string = this.FechaService.registroTiempo();
  public selectdate: string = '';
  public maxdate: string = '';


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
    servicio: null,
    status: 1,
    fecha_recepcion: null,
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
    medico: null,
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


  @Output() idConsulta = new EventEmitter<number>();
  constructor(

    private ConsultasService: ConsultasService,
    private FechaService: FechaService,
    private PageReloadService: PageReloadService,
    private contadorService: ContadorService

  ) { }

  ngOnInit() {
    // Obtiene la fecha actual en el formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];
    this.maxdate = currentDate;


    this.consultasmedicina;
    this.consultaspedia;
    this.consultasgine;
    this.consultasciru;
    this.consultastrauma;
    this.consultaspsico;
    this.consultasnutri;
    this.x = `${this.year}-${this.month}-${this.day}`;
    this.consultasmedicina(this.x);
    this.consultaspedia(this.x);
    this.consultasgine(this.x);
    this.consultasciru(this.x);
    this.consultastrauma(this.x);
    this.consultaspsico(this.x);
    this.consultasnutri(this.x);


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


    } else {
      // Los valores ingresados no son válidos, puedes manejar esto de acuerdo a tus necesidades
      this.consultasmedicina(this.x);
      this.consultaspedia(this.x);
      this.consultasgine(this.x);
      this.consultasciru(this.x);
      this.consultastrauma(this.x);
      this.consultaspsico(this.x);
      this.consultasnutri(this.x);

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

  isStatusTrue(status: number): boolean {
    return status === 2;
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
    // Emitir el nuevo valor del contador
    this.contadorService.actualizarContador(this.contador);

    console.log(id, this.idCopiado)
  }

  reloadPage() {
    // Llama al servicio para recargar la página
    this.PageReloadService.reloadPage();
  }


  copiarValor(i: number, e: any) {
    // Actualiza el valor del contador en el servicio
    this.contadorService.actualizarContador(this.contador + i + 1);
    //console.log(this.contador + i )
    this.contadorService.repetirEspecialidad(e)
  }






}
