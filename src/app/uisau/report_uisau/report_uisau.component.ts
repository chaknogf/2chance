import { UisauService } from './../../services/uisau.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iuisau } from 'src/app/models/Iuisau';
import { FechaService } from 'src/app/services/fecha.service';

@Component({
  selector: 'app-report_uisau',
  templateUrl: './report_uisau.component.html',
  styleUrls: ['./report_uisau.component.css']
})
export class ReportUisauComponent implements OnInit {

  public listado: Iuisau[] = []; // Lista paginada
  public listadoCompleto: Iuisau[] = []; // Copia completa de datos
  public totalRegistros: number = 12; // Total de registros por página
  public paginaActual: number = 1; // Página actual
  private sortColumn: keyof Iuisau | null = null;
  private ascendingOrder: boolean = false;
  public porcentajeDeProgreso: number = 0;
  public dia: string = '';
  public mes: string = '';
  public anio: string = '';
  public fecha: string = '';
  public today: string = '';
  FechaService: any;

  constructor(
    private router: Router,
    private ui: UisauService,
    private fechaService: FechaService
  ) { }

  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0];  // Establece la fecha actual
    this.fecha = this.today;  // Establece la fecha por defecto al día de hoy
    this.obtener();  // Llama al método obtener al inicializar
  }

  obtener(): void {
    const value = this.fecha;  // Obtiene la fecha seleccionada
    console.log(value);

    const filters = { fecha: value };  // Filtros para la API

    this.porcentajeDeProgreso = 0.5;  // Indica que se está cargando
    this.listado = [];  // Limpia la lista antes de cargar nuevos datos

    // Llama al servicio para obtener los datos
    this.ui.filterInfos(filters).subscribe(data => {
      this.porcentajeDeProgreso = 75;  // Carga en progreso
      this.listadoCompleto = data;  // Guarda la respuesta completa
      this.paginar();  // Aplica la paginación (asegúrate de que este método esté implementado)
      this.porcentajeDeProgreso = 100;  // Carga completada

      setTimeout(() => {
        this.porcentajeDeProgreso = -1;  // Resetea el progreso después de 1 segundo
      }, 1000);
    });
  }

  sortTable(column: keyof Iuisau) {
    if (this.sortColumn === column) {
      this.ascendingOrder = !this.ascendingOrder;
    } else {
      this.sortColumn = column;
      this.ascendingOrder = true;
    }



    this.listado = [...this.listadoCompleto]; // Forzar actualización en Angular
    this.paginar();
  }

  // Método para manejar la paginación
  onPageChange(pageNumber: number) {
    this.paginaActual = pageNumber;
    this.paginar();
  }

  paginar() {
    const tamanoPagina = this.totalRegistros;
    const indiceInicio = (this.paginaActual - 1) * tamanoPagina;
    const indiceFin = indiceInicio + tamanoPagina;
    this.listado = this.listadoCompleto.slice(indiceInicio, indiceFin);
  }

  getPaginas(): number[] {
    const totalPaginas = this.totalPaginas();
    return Array.from({ length: totalPaginas }, (_, index) => index + 1);
  }

  totalPaginas(): number {
    return Math.ceil(this.listadoCompleto.length / this.totalRegistros);
  }

  regresar() {
    this.router.navigate(['/uisau']);
  }



}
