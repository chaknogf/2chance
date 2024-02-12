import { CNacService } from 'src/app/services/c-nac.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageReloadService } from './../../../services/PageReload.service';
import { FechaService } from 'src/app/services/fecha.service';
import {  Ienum } from 'src/app/models/Ienum';
import { IconsNac } from 'src/app/models/IconsNac';

@Component({
  selector: 'tablaDocs',
  templateUrl: './tablaDocs.component.html',
  styleUrls: ['./tablaDocs.component.css']
})
export class TablaDocsComponent implements OnInit {

  constructor(
    private nacServ: CNacService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private FechaService: FechaService,
    private PageReloadService: PageReloadService

  ) { }

  @Output() idConsulta = new EventEmitter<number>();
  public constancias: IconsNac[] = [];
  public resumen: IconsNac[] = [];
  public searchText: string = '';
  public totalRegistros: number = 12; // Total de registros en la lista
  public paginaActual: number = 1; // Página actual
  public expedienteBuscar: any = '';
  public nombreBuscar: string = '';
  public aoBuscar: any = '';
  public fechaBuscar: any = '';
  public maxdate: string = '';
  public idCopiado: number = 0;
  public idBuscar: number = 0;
  public documentoBuscar: any = '';
  mostrarModal = false;


  constancia: IconsNac = {
    id: 0,
    fecha: undefined,
    cor: null,
    ao: null,
    doc: null,
    fecha_parto: null,
    madre: null,
    dpi: null,
    passport: null,
    libro: null,
    folio: null,
    partida: null,
    depto: null,
    muni: null,
    edad: null,
    vecindad: null,
    sexo_rn: null,
    lb: null,
    onz: null,
    hora: null,
    medico: null,
    colegiado: null,
    dpi_medico: null,
    hijos: 0,
    vivos: 0,
    muertos: 0,
    tipo_parto: null,
    clase_parto: null,
    certifica: null,
    create_by: null,
    expediente: 0
  }


  ngOnInit() {
    this.constanciasEmitidas();
    // Obtiene la fecha actual en el formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];
    this.maxdate = currentDate;

  }


  constanciasEmitidas() {
    this.nacServ.getConstancias()
      .subscribe(data => {
        this.resumen = data;
        this.constancias = data;
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
    this.resumen = this.constancias.slice(indiceInicio, indiceFin);
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
    return Math.ceil(this.constancias.length / this.totalRegistros);

  }

  filtro() {
    // Recopila los valores de entrada del formulario
    const filters = {
      id: this.idBuscar,
      doc: this.documentoBuscar,
      expediente: this.expedienteBuscar,
      madre: this.nombreBuscar,
      ao: this.aoBuscar,

      tipo_consulta: 2,
    };

    this.nacServ.filterDocs(filters).subscribe((result) => {
      this.resumen = result;
      this.constancias = result;
    });



  }




  limpiarInput() {
    this.expedienteBuscar = ''; // Limpia el contenido del input
    this.nombreBuscar = '';
    this.aoBuscar = '';
    this.documentoBuscar = '';


  }

  private actualizar(data: any[]) {
    if (data.length > 0) {
      // this.pacientes = data.sort((a: { expediente: number; }, b: { expediente: number; }) => b.expediente - a.expediente);
      this.resumen = data;
      console.log(this.resumen)
      this.paginar();
      this.nombreBuscar = '';
      this.aoBuscar = '';
      this.expedienteBuscar = '';
      this.documentoBuscar = '';

    } else {
      this.constancias = [];
      this.totalRegistros = 0;
    }
  }

  eliminar(id: number) {
    this.nacServ.borrarConstancia(id)
      .subscribe(data => {
        this.constancia = data;
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

  mostrarModalDespuesDeCopiar() {
    // Aquí puedes realizar cualquier validación o lógica que desees
    if (this.idCopiado) {
      this.mostrarModal = true; // Muestra el modal si se ha copiado un valor al campo "Expediente"
      // this.abrirModal(); // Abre el modal
    }
    console.log(this.idCopiado, this.mostrarModal)
  }





}
