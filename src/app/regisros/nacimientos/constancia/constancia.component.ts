import { CNacService } from './../../../services/c-nac.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageReloadService } from './../../../services/PageReload.service';
import { FechaService } from 'src/app/services/fecha.service';
import {  Ienum } from 'src/app/models/Ienum';
import { IconsNac } from 'src/app/models/IconsNac';
@Component({
  selector: 'app-constancia',
  templateUrl: './constancia.component.html',
  styleUrls: ['./constancia.component.css']
})
export class ConstanciaComponent implements OnInit {


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
  public dpiBuscar: any = '';
  public hojaBuscar: any = '';
  public fechaBuscar: any = '';
  public selectdate: string = '';
  public maxdate: string = '';
  public idCopiado: number = 0;
  public idBuscar: number = 0;
  public documentoBuscar: any = '';
  mostrarModal = false;
  public derecha: number = 0;
  public izquierda: number = 1;


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
    certifica: 0,
    create_by: null,
    expediente: 0,
    nacionalidad: null,
    pais: null
  }


  ngOnInit() {
    this.ingresos()
    // Obtiene la fecha actual en el formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];
    this.maxdate = currentDate;

  }


  ingresos() {
    this.nacServ.getConstancias().subscribe(data => {
        this.resumen = data.sort((a: { id: number; }, b: { id: number; }): number => b.id - a.id);
        this.constancias = data;
        // console.log(this.constancias);
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





  limpiarInput() {
    this.expedienteBuscar = ''; // Limpia el contenido del input
    this.nombreBuscar = '';
    this.aoBuscar = '';
    this.dpiBuscar = '';
    this.documentoBuscar = '';

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

  ladoDerecho() {
    this.izquierda = 0;
    this.derecha = 1;
  }

  ladoIzquierdo() {
    this.izquierda = 1;
    this.derecha = 0;
  }


}
