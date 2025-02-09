import { serv, servicio } from 'src/app/enums/enums';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProcedimientosMedicosService } from 'src/app/services/procedimientosMedicos.service';
import { IproceMedico } from 'src/app/models/IprocedimientosMedicos';
import { serv_espc } from 'src/app/models/Ienum';

@Component({
  selector: 'app-list_ProceMedic',
  templateUrl: './list_ProceMedic.component.html',
  styleUrls: ['./list_ProceMedic.component.css']
})
export class List_ProceMedicComponent implements OnInit {

  constructor(
    private Router: Router,
    private prm: ProcedimientosMedicosService,
  ) { }

  public procedimientos: IproceMedico[] = [];
  public resumen: IproceMedico[] = [];
  public buscarId: string = '';
  public buscharFecha: string = '';
  public buscarServicio: string = '';
  public buscarAbreviatura: string = '';
  public buscarProcedimiento: string = '';
  public buscarEspecialidad: string = '';
  public buscarSexo: string = '';
  public buscarMedico: string = '';
  public totalRegistros: number = 12; // Total de registros en la lista
  public paginaActual: number = 1; // Página actual
  public porcentajeDeProgreso: number = 0; // Variable para el progreso


  proceMedico: IproceMedico = {
    id: 0,
    fecha: null,
    servicio: null,
    sexo: null,
    abreviatura: null,
    procedimiento: null,
    especialidad: null,
    cantidad: null,
    medico: null,
    created_by: null
  }

  e: serv_espc = {
    servicio: servicio,
    serv: serv,
  }

  ngOnInit() {
    this.consult()
    this.getCodigos()
    this.paginar();
  }

  consult() {
    this.porcentajeDeProgreso = 0.5;
    this.prm.proceRealizados().subscribe(data => {
      this.proceMedico = data.sort((a: { id: number; }, b: { id: number; }): number => b.id - a.id);
      this.porcentajeDeProgreso = 75;
      this.resumen = data;
      this.paginar();//Llama a la función aquí para paginar automáticamente
      this.porcentajeDeProgreso = 100;
      setTimeout(() => {
        this.porcentajeDeProgreso = -1; // Puedes establecerlo en -1 o cualquier otro valor para ocultar la barra
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
    this.prm.proceRealizados().subscribe(data => {
      this.procedimientos = data;
      this.resumen = data;
      this.paginar();
    });
  }

  filtro() {
    // Recopila los valores de entrada del formulario
    const filters = {
      id: this.buscarId,
      fecha: this.buscharFecha,
      servicio: this.buscarServicio,
      sexo: this.buscarSexo,
      especialidad: this.buscarEspecialidad,
      abreviatura: this.buscarAbreviatura,
      medico: this.buscarMedico,
    };

    this.prm.filtrarProce(filters).subscribe((result) => {
      this.resumen = result;
      this.procedimientos = result;
      this.paginar();
    });

  }

  limpiarInput() {
    this.buscarId = '';
    this.buscharFecha = '';
    this.buscarServicio = '';
    this.buscarAbreviatura = '';
    this.buscarProcedimiento = '';
    this.buscarEspecialidad = '';
    this.buscarSexo = '';
    this.buscarMedico = '';
    this.consult();
  }





}
