import { tipo, Tipos, status, encamamiento } from '../../../../enums/enums';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { PageReloadService } from 'src/app/services/PageReload.service';
import { FechaService } from 'src/app/services/fecha.service';
import { Ienum, OtrosEnums, encamamientos } from 'src/app/models/Ienum';
import { nation, etnias, ecivil, academic, parents, lenguaje, servicio, servicios } from 'src/app/enums/enums';
import { municipio } from 'src/app/enums/vencindad';


@Component({
  selector: 'app-recepción',
  templateUrl: './recepción.component.html',
  styleUrls: ['./recepción.component.css']
})
export class RecepciónComponent implements OnInit {

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
  public idBuscar: any = '';
  public nombreBuscar: string = '';
  public apellidoBuscar: string = '';
  public tipoBuscar: string = '';
  public dpiBuscar: any = '';
  public hojaBuscar: any = '';
  public fechaBuscar: any = '';
  public statusBuscar: any = 1;
  public fechaEgreso: string = this.FechaService.FechaActual();
  public selectdate: string = '';
  public maxdate: string = '';
  public idCopiado: number = 0;
  public porcentajeDeProgreso: number = 0; // Variable para el progreso
  private sortColumn: string | undefined;
  private ascendingOrder: boolean = false;
  public detalleVisible: boolean = false;
  public consult: Iconcultas | undefined;
  public contador: number = 0;
  public fechaActual: string = this.FechaService.FechaActual();




  consulta_: Iconcultas = {
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

  e: encamamientos = {
    servicio: servicio,
    serv: servicios,
    encamamiento: encamamiento
  }

  enums: OtrosEnums = {
    tipo: tipo,
    status: status
  }

  ngOnInit() {
    this.consultar()
    // Obtiene la fecha actual en el formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];
    this.maxdate = currentDate;
    this.PageReloadService.reload$.subscribe(() => {
      this.consultar();
    });

  }



  consultar() {
    const filters = {


      fecha_recepcion: null,
      status: 1 || 3 || 4

    };

    this.porcentajeDeProgreso = 0.5;
    this.ConsultasService.filterConsultas(filters).subscribe(data => {
      this.consultas = data//.sort((a: { id: number; }, b: { id: number; }): number => b.id - a.id);
      this.porcentajeDeProgreso = 75;
      this.resumen = data;
      this.paginar();//Llama a la función aquí para paginar automáticamente
      this.porcentajeDeProgreso = 100;
      setTimeout(() => {
        this.porcentajeDeProgreso = -1; // Puedes establecerlo en -1 o cualquier otro valor para ocultar la barra
      }, 700);

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


  onPageChange(pageNumber: number) {
    this.paginaActual = pageNumber;
    this.paginar();
  }

  paginar() {
    const tamanoPagina = 12;
    const indiceInicio = (this.paginaActual - 1) * tamanoPagina;
    const indiceFin = indiceInicio + tamanoPagina;
    this.resumen = this.consultas.slice(indiceInicio, indiceFin);
    this.totalRegistros = this.consultas.length; // Agrega esta línea para actualizar el número total de registros por página
  }

  getPaginas(): number[] {
    const totalPaginas = Math.ceil(this.consultas.length / this.totalRegistros);

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
      fecha_recepcion: this.fechaBuscar,
      nombres: this.nombreBuscar,
      apellidos: this.apellidoBuscar,
      dpi: this.dpiBuscar,
      fecha_egreso: '',
      tipo_consulta: this.tipoBuscar,
      status: this.statusBuscar,

    };

    this.ConsultasService.filterConsultas(filters).subscribe((result) => {
      this.resumen = result;
      this.consultas = result;
      this.paginar();
    });



  }


  limpiarInput() {
    this.expedienteBuscar = ''; // Limpia el contenido del input
    this.nombreBuscar = '';
    this.apellidoBuscar = '';
    this.dpiBuscar = '';
    this.hojaBuscar = '';
    this.fechaBuscar = '';
    this.tipoBuscar = '';
    this.statusBuscar = '';
    this.consultar();
    // Obtén todos los pacientes nuevamente
  }

  private actualizar(data: any[]) {
    if (data.length > 0) {
      // this.pacientes = data.sort((a: { expediente: number; }, b: { expediente: number; }) => b.expediente - a.expediente);
      this.resumen = data;
      console.log(this.resumen)
      this.paginar();

    } else {
      this.consultas = [];
      this.totalRegistros = 0;
    }
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

  detalle(x: number) {
    this.ConsultasService.Consulta(x).subscribe(data => {
      this.consult = data;
      this.detalleVisible = true;
    })
  }

  egreso() {
    this.consulta_.fecha_egreso = this.fechaEgreso;

  }

  consultaro(id: number) {
    console.log(id)
    this.ConsultasService.Consulta(id).subscribe(data => {
      this.consulta_ = data;

      console.log(data)
    }

    )
  }

  darEgreso() {
    this.consulta_.fecha_egreso = this.fechaEgreso;
    this.consulta_.status = 4;
  }

  guardarEgreso() {
    this.consulta_.fecha_egreso = this.fechaEgreso;
    this.consulta_.status = 4;
    this.ConsultasService.editarConsulta(this.consulta_.id, this.consulta_)
      .subscribe(data => {
        this.consulta_ = data; // Actualiza la consulta con la respuesta del servidor

        // En lugar de recargar la página, notificamos la actualización
        this.PageReloadService.reloadPage();
      });
  }



}
