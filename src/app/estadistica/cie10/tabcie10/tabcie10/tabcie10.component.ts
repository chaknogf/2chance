import { servicio, serv } from 'src/app/enums/enums';
import { serv_espc } from 'src/app/models/Ienum';
import { Icie10 } from '../../../../models/Icie10';
import { Cie10Service } from '../../../../services/cie10.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabcie10',
  templateUrl: './tabcie10.component.html',
  styleUrls: ['./tabcie10.component.css']
})
export class Tabcie10Component implements OnInit {


  public cie10: Icie10[] = [];
  public resumen: Icie10[] = [];
  public buscarcodigo: string = '';
  public buscardx: any = '';
  public buscarabreviatura: any = '';
  public buscargrupo: any = '';
  public buscarespecialidad: any = '';
  public totalRegistros: number = 12; // Total de registros en la lista
  public paginaActual: number = 1; // Página actual
  private sortColumn: string | undefined;
  private ascendingOrder: boolean = false;
  public porcentajeDeProgreso: number = 0; // Variable para el progreso


  constructor(
    private router: Router,
    private cie: Cie10Service,
  ) { }

  cie_10: Icie10 = {
    id: 0,
    cod: '',
    grupo: '',
    dx: '',
    abreviatura: '',
    especialidad: 0
  }
  e: serv_espc = {
    servicio: servicio,
    serv: serv
  }

  ngOnInit() {
    this.consult()

  }

  getCodigos() {
    this.cie.getCodigos().subscribe(data => {
      this.cie10 = data;
      this.resumen = data;
      this.paginar();
    });
}

  paginar() {
    const tamanoPagina = 12;
    const indiceInicio = (this.paginaActual - 1) * tamanoPagina;
    const indiceFin = indiceInicio + tamanoPagina;
    this.resumen = this.cie10.slice(indiceInicio, indiceFin);
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
    return Math.ceil(this.cie10.length / this.totalRegistros);

  }

  filtro() {
    // Recopila los valores de entrada del formulario
    const filters = {
      cod: this.buscarcodigo,
      dx: this.buscardx,
      abreviatura: this.buscarabreviatura,
      especialidad: this.buscarespecialidad,
      grupo: this.buscargrupo,
    };

    this.cie.filtrarDX(filters).subscribe((result) => {
      this.resumen = result;
    });

  }

  limpiarInput() {
    this.buscarcodigo = '';
    this.buscarabreviatura = '';
    this.buscardx = '';
    this.buscarespecialidad = '';
    this.buscargrupo = '';
    this.consult();
  }


  onPageChange(pageNumber: number) {
    this.paginaActual = pageNumber;
    this.paginar();
  }

  consult() {
    this.porcentajeDeProgreso = 0.5;
    this.cie.getCodigos().subscribe(data => {
      this.cie10 = data.sort((a: { id: number; }, b: { id: number; }): number => b.id - a.id);
      this.porcentajeDeProgreso = 75;
      this.resumen = data;
      this.paginar();//Llama a la función aquí para paginar automáticamente
      this.porcentajeDeProgreso = 100;
      setTimeout(() => {
        this.porcentajeDeProgreso = -1; // Puedes establecerlo en -1 o cualquier otro valor para ocultar la barra
      }, 1000);

    });
  }


}
