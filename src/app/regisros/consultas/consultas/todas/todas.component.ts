import { ConsultasService } from 'src/app/services/consultas.service';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { PageReloadService } from '../../../../services/PageReload.service';
import { FechaService } from 'src/app/services/fecha.service';
import { Ienum, OtrosEnums } from 'src/app/models/Ienum';
import { nation, etnias, ecivil, academic, parents, lenguaje, servicio, servicios, tipo } from 'src/app/enums/enums';
import { municipio } from 'src/app/enums/vencindad';

@Component({
  selector: 'todas',
  templateUrl: './todas.component.html',
  styleUrls: ['./todas.component.css']
})
export class TodasComponent implements OnInit {
  [x: string]: any;

  constructor(
    private ConsultasService: ConsultasService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private FechaService: FechaService,
    private PageReloadService: PageReloadService

  ) { }

  isExpanded = false;
  @ViewChild('navbarButton')
  navbarButton!: ElementRef;
  @Output() idConsulta = new EventEmitter<number>();
  public consultas: Iconcultas[] = [];
  public resumen: Iconcultas[] = [];
  public searchText: string = '';
  public totalRegistros: number = 12; // Total de registros en la lista
  public paginaActual: number = 1; // Página actual
  public expedienteBuscar: any = '';
  public idBuscar: any = '';
  public nombreBuscar: string = '';
  public apellidoBuscar: string = '';
  public dpiBuscar: any = '';
  public hojaBuscar: any = '';
  public fechaBuscar: any = '';
  public fechaEgreso: any = '';
  public selectdate: string = '';
  public maxdate: string = '';
  public idCopiado: number = 0;
  public porcentajeDeProgreso: number = 0; // Variable para el progreso
  private sortColumn: string | undefined;
  private ascendingOrder: boolean = false;
  public tipoBuscar: string = '';
  public statusBuscar: any = '';
  public detalleVisible: boolean = false;
  public consult: Iconcultas | undefined;
  private hoy: string = '';




  consulta: Iconcultas = {
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

  enums: OtrosEnums = {
    tipo: tipo
  }
  ngOnInit() {
    this.consultar()
    // Obtiene la fecha actual en el formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];
    this.maxdate = currentDate;
    this.paginar();
    this.fechaBuscar = currentDate;
    this.hoy = currentDate;
  }



  consultar() {
    this.porcentajeDeProgreso = 0.5;
    this.ConsultasService.Consultas().subscribe(data => {
      this.consultas = data.sort((a: { id: number; }, b: { id: number; }): number => b.id - a.id);
      this.porcentajeDeProgreso = 75;
      this.resumen = data;
      this.paginar();
      this.porcentajeDeProgreso = 100;
      setTimeout(() => {
        this.porcentajeDeProgreso = -1;
      }, 1000);

    });
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
      hoja_emergencia: this.hojaBuscar,
      expediente: this.expedienteBuscar,
      fecha_consulta: this.fechaBuscar,
      nombres: this.nombreBuscar,
      apellidos: this.apellidoBuscar,
      dpi: this.dpiBuscar,
      fecha_egreso: this.fechaEgreso,
      tipo_consulta: this.tipoBuscar,
      status: this.statusBuscar,
    };

    this.ConsultasService.filterConsultas(filters).subscribe((result) => {
      this.consultas = result;
      this.resumen = result;
      this.paginar()
    });



  }


  sortTable(column: keyof Iconcultas) {
    if (this.sortColumn === column) {
      this.ascendingOrder = !this.ascendingOrder;
    } else {
      this.sortColumn = column;
      this.ascendingOrder = true;
    }

    this.resumen.sort((a, b) => {
      const order = this.ascendingOrder ? 1 : -1;
      if (a[column] < b[column]) {
        return -order;
      } else if (a[column] > b[column]) {
        return order;
      } else {
        return 0;
      }
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
    this.fechaBuscar = this.hoy;
    this.consultar();
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
        this.consulta = data;
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

  hideMenu() {
    if (this.navbarButton && this.navbarButton.nativeElement) {
      this.navbarButton.nativeElement.click();
    }
  }

  detalle(x: number) {
    this.ConsultasService.Consulta(x).subscribe(data => {
      this.consult = data;
      this.detalleVisible = true;
    })
  }

}
