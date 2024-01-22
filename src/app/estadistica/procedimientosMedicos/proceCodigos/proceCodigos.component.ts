import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcedimientosMedicosService } from 'src/app/services/procedimientosMedicos.service';
import { Iabreviaturas } from 'src/app/models/IprocedimientosMedicos';
import { PageReloadService } from 'src/app/services/PageReload.service';

@Component({
  selector: 'app-proceCodigos',
  templateUrl: './proceCodigos.component.html',
  styleUrls: ['./proceCodigos.component.css']
})
export class ProceCodigosComponent implements OnInit {
  constructor(
    private activateRoute: ActivatedRoute,
    private PageReloadService: PageReloadService,
    private router: Router,
    private prm: ProcedimientosMedicosService,
  ) { }

  public procedimientos: Iabreviaturas[] = [];
  public resumen: Iabreviaturas[] = [];
  public buscarId: string = '';
  public buscarAbreviatura: string = '';
  public buscarProcedimiento: string = '';
  public totalRegistros: number = 12; // Total de registros en la lista
  public paginaActual: number = 1; // Página actual
  public porcentajeDeProgreso: number = 0; // Variable para el progreso



  proce: Iabreviaturas  = {
    id: 0,
    abreviatura: '',
    procedimiento: ''
  }

  ngOnInit() {
    this.consult()
    this.getCodigos()
  }

  consult() {
    this.porcentajeDeProgreso = 0.5;
    this.prm.abreviaturas().subscribe(data => {
      this.proce = data.sort((a: { id: number; }, b: { id: number; }): number => b.id - a.id);
      this.porcentajeDeProgreso = 75;
      this.resumen = data;
      this.paginar();//Llama a la función aquí para paginar automáticamente
      this.porcentajeDeProgreso = 100;
      setTimeout(() => {
        this.porcentajeDeProgreso = -1; // Puedes establecerlo en -1 o cualquier otro valor para ocultar la barra
      }, 1000);

    });
  }

  paginar() {
    const tamanoPagina = 12;
    const indiceInicio = (this.paginaActual - 1) * tamanoPagina;
    const indiceFin = indiceInicio + tamanoPagina;
    this.resumen = this.procedimientos.slice(indiceInicio, indiceFin);
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
    return Math.ceil(this.procedimientos.length / this.totalRegistros);

  }

  getCodigos() {
    this.prm.abreviaturas().subscribe(data => {
      this.procedimientos = data;
      this.resumen = data;
      this.paginar();
    });
}

filtro() {
  // Recopila los valores de entrada del formulario
  const filters = {
    id: this.buscarId,
    procedimiento: this.buscarProcedimiento,
    abreviatura: this.buscarAbreviatura,
  };

  this.prm.filtrarProce(filters).subscribe((result) => {
    this.resumen = result;
  });

}

  limpiarInput() {
  this.buscarId = '';
  this.buscarAbreviatura = '';
  this.buscarProcedimiento = '';
  this.consult();
}


onPageChange(pageNumber: number) {
  this.paginaActual = pageNumber;
  this.paginar();
}


}
