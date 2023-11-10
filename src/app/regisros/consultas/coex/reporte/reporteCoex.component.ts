import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FechaService } from 'src/app/services/fecha.service';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { municipio, nation, etnias, ecivil, academic, parents, lenguaje, servicios, servicio } from 'src/app/enums/enums';
import { Ienum } from 'src/app/models/Ienum';
import { ConsultasService } from 'src/app/services/consultas.service';

@Component({
  selector: 'app-reporteCoex',
  templateUrl: './reporteCoex.component.html',
  styleUrls: ['./reporteCoex.component.css']
})
export class ReporteCoexComponent implements OnInit {

  constructor(
    private _location: Location,
    private fechaService: FechaService,
    private ConsultasService: ConsultasService,
  ) { }


  public rutaAnterior: string = '../';
  public fechaActual: string = "";
  public horaActual: string = "";
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
  public today = this.fechaService.FechaActual();


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
    this.fechaActual = this.fechaService.FechaActual();
    this.horaActual = this.fechaService.HoraActual();


    this.consultasmedicina(this.today);
    this.consultaspedia(this.today);
    this.consultasgine(this.today);
    this.consultasciru(this.today);
    this.consultastrauma(this.today);
    this.consultaspsico(this.today);
    this.consultasnutri(this.today);
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

  regresar(){
    this._location.back();
  }

  imprimir() {

    window.print();
  }



}
