import { ConsultasService } from 'src/app/services/consultas.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { PageReloadService } from '../../../services/PageReload.service';
import { FechaService } from 'src/app/services/fecha.service';
import {  Ienum } from 'src/app/models/Ienum';
import { nation, municipio, etnias, ecivil, academic, parents, lenguaje, servicio, servicios } from 'src/app/enums/enums';

@Component({
  selector: 'ingresoTabla',
  templateUrl: './ingresoTabla.component.html',
  styleUrls: ['./ingresoTabla.component.css']
})
export class IngresoTablaComponent implements OnInit {

  constructor(
    private ConsultasService: ConsultasService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private FechaService: FechaService,
    private PageReloadService: PageReloadService

  ) { }

  @Output() idConsulta = new EventEmitter<number>();
  public consultas: Iconcultas[] = [];
  public resumen: Iconcultas[] = [];
  public searchText: string = '';
  public totalRegistros: number = 12; // Total de registros en la lista
  public paginaActual: number = 1; // Página actual
  public expedienteBuscar: any = '';
  public nombreBuscar: string = '';
  public apellidoBuscar: string = '';
  public dpiBuscar: any = '';
  public hojaBuscar: any = '';
  public fechaBuscar: any = '';
  public selectdate: string = '';
  public maxdate: string = '';
  public idCopiado: number = 0;


  ingreso: Iconcultas = {
    id: 0,
    hoja_emergencia: null,
    expediente: null,
    fecha_consulta: '',
    hora: '',
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
    recepcion: false,
    fecha_recepcion: null,
    fecha_egreso: null,
    tipo_consulta: 1,
    nota: "",
    name: null,
    lastname: null,


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
    this.ingresos()
    // Obtiene la fecha actual en el formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];
    this.maxdate = currentDate;

  }


  ingresos() {
    this.ConsultasService.consulTipo(2)
      .subscribe(data => {
        this.resumen = data.sort((a: { id: number; }, b: { id: number; }): number => b.id - a.id);
        this.consultas = data;
        console.log(this.consultas);
    })
  }

  onPageChange(pageNumber: number) {
    this.paginaActual = pageNumber;
    this.paginar();
  }

  paginar() {
    const tamanoPagina = 12;
    const indiceInicio = (this.paginaActual - 1) * tamanoPagina;
    const indiceFin = indiceInicio + tamanoPagina;
    this.resumen = this.consultas.slice(indiceInicio, indiceFin);
    this.totalRegistros = this.resumen.length; // Agrega esta línea para actualizar el número total de registros por página
  }

  getPaginas(): number[] {
    const totalPaginas = Math.ceil(this.resumen.length / this.totalRegistros);

    // Verificar si totalPaginas es válido antes de crear el array
    if (totalPaginas <= 0) {
      return [];
    }

    return Array.from({ length: 10 }, (_, index) => index + 1);
  }

  totalPaginas(): number {
    return Math.ceil(this.consultas.length / this.totalRegistros);

  }

  filtro() {

    if (this.hojaBuscar !="") {
      this.ConsultasService.hoja(this.hojaBuscar).subscribe(data => {
        if (data) {
          this.actualizar([data]);
          this.resumen.push(data);
        }
      });
    }

    if (this.expedienteBuscar) {
      this.ConsultasService.expediente(this.expedienteBuscar).subscribe(data => {
        if (data) {
          this.actualizar([data]);
          this.resumen.push(data);
        }
      });
    }

    if (this.dpiBuscar) {
      this.ConsultasService.dpi(this.dpiBuscar).subscribe(data => {
        if (data) {
          this.actualizar([data]);
        }
      });
    }

    if (this.fechaBuscar) {
      this.ConsultasService.tipoConsulta(this.fechaBuscar, 3).subscribe(data => {
        if (data && data.length > 0) {
          this.actualizar(data);
        }
      });
    }

    if (this.nombreBuscar || this.apellidoBuscar) {
      this.ConsultasService.nombre(this.nombreBuscar, this.apellidoBuscar).subscribe(data => {
        if (data && data.length > 0) {
          this.actualizar(data);
        }
      });
    }
  }






  buscarPorExpediente() {
    this.ConsultasService.expediente(this.expedienteBuscar).subscribe(
      (data) => this.actualizar(data)

    );
  }

  buscarPorNombre() {
    this.ConsultasService.nombre(this.nombreBuscar, this.apellidoBuscar).subscribe(
      (data) => this.actualizar(data)
    );
  }

  buscarPorDPI() {
    this.ConsultasService.dpi(this.dpiBuscar).subscribe(
      (data) => this.actualizar(data)
    );
  }

  buscarPorHojaEmergencia() {
    this.ConsultasService.hoja(this.hojaBuscar).subscribe(data => {
      if (data) {
        this.actualizar([data]);
        this.resumen = [data];
      }
    })

  }

  buscarPorFecha() {
    this.ConsultasService.tipoConsulta(this.fechaBuscar, 3).subscribe(
      (data) => this.actualizar(data)
    );
  }




  limpiarInput() {
    this.expedienteBuscar = ''; // Limpia el contenido del input
    this.nombreBuscar = '';
    this.apellidoBuscar = '';
    this.dpiBuscar = '';
    this.hojaBuscar = '';
    this.fechaBuscar = '';
    this.ingresos();
     // Obtén todos los pacientes nuevamente
  }

  private actualizar(data: any[]) {
    if (data.length > 0) {
      // this.pacientes = data.sort((a: { expediente: number; }, b: { expediente: number; }) => b.expediente - a.expediente);
      this.resumen = data;
      console.log(this.resumen)
      this.paginar();
      this.dpiBuscar = '';
      this.nombreBuscar = '';
      this.apellidoBuscar = '';
      this.expedienteBuscar = '';
      this.hojaBuscar = '';
      this.fechaBuscar = '';

    } else {
      this.consultas = [];
      this.totalRegistros = 0;
    }
  }

  eliminar(id: number) {
    this.ConsultasService.eliminar(id)
      .subscribe(data => {
        this.ingreso = data;
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
