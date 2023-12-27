import { tipo } from '../../../../../enums/enums';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iconcultas } from 'src/app/models/Iconsultas';




@Component({
  selector: 'tablaEmergencia',
  templateUrl: './tablaEmergencia.component.html',
  styleUrls: ['./tablaEmergencia.component.css']
})
export class TablaEmergenciaComponent implements OnInit {

  constructor(
    private ConsultasService: ConsultasService,
    private router: Router,
    private activateRoute: ActivatedRoute,

  ) { }

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
  public idBuscar: any = '';
  public fechaEgreso: any = '';
  public tipoConsulta: any = 3;




  ngOnInit() {
    this.emergencias()
    // Obtiene la fecha actual en el formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];
    this.maxdate = currentDate;

  }


  emergencias() {
    this.ConsultasService.consulTipo(3)
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
    // Recopila los valores de entrada del formulario
    const filters = {
      id: this.idBuscar,
      hoja: this.hojaBuscar,
      expediente: this.expedienteBuscar,
      fecha_consulta: this.fechaBuscar,
      nombres: this.nombreBuscar,
      apellidos: this.apellidoBuscar,
      dpi: this.dpiBuscar,
      fecha_egreso: this.fechaEgreso,
      tipo_consulta: this.tipoConsulta,
    };

    this.ConsultasService.filterConsultas(filters).subscribe((result) => {
      this.resumen = result;
    });



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
    this.emergencias();
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

}
