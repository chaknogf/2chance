import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  public pacientes: Ipaciente[] = []; // Registros a mostrar en la página actual
  public filteredPacientes: Ipaciente[] = [];
  public searchText: string = '';
  public totalRegistros: number = 12; // Total de registros en la lista
  public paginaActual: number = 1; // Página actual
  public expedienteBuscar: any = '';
  public nombreBuscar: string = '';
  public apellidoBuscar: string = '';
  public dpiBuscar: any = '';


  @Output() idPaciente = new EventEmitter<number>();

  constructor(private pacientesService: PacientesService, private router: Router, private activateRoute: ActivatedRoute) { }
  reset: boolean = false;
  busqueda: string = '';
  order: string = 'asc';

  ngOnInit() {

  }

  copiarId(id: number) {
    this.idPaciente.emit(id);
  }

  getPacientes() {
    this.pacientesService.getPacientes().subscribe(data => {
      this.pacientes = data.sort((a: { expediente: number; }, b: { expediente: number; }): number => b.expediente - a.expediente);
      this.filteredPacientes = data;
      this.paginarPacientes();//Llama a la función aquí para paginar automáticamente
    });
  }

  onPageChange(pageNumber: number) {
    this.paginaActual = pageNumber;
    this.paginarPacientes();
  }

  paginarPacientes() {
    const tamanoPagina = 12;
    const indiceInicio = (this.paginaActual - 1) * tamanoPagina;
    const indiceFin = indiceInicio + tamanoPagina;
    this.filteredPacientes = this.pacientes.slice(indiceInicio, indiceFin);
    this.totalRegistros = this.filteredPacientes.length; // Agrega esta línea para actualizar el número total de registros por página
  }


  getPaginas(): number[] {
    const totalPaginas = Math.ceil(this.filteredPacientes.length / this.totalRegistros);

    // Verificar si totalPaginas es válido antes de crear el array
    if (totalPaginas <= 0) {
      return [];
    }

    return Array.from({ length: 10 }, (_, index) => index + 1);
  }

  totalPaginas(): number {
    return Math.ceil(this.pacientes.length / this.totalRegistros);

  }

  filtro() {
    if (this.expedienteBuscar !== "") {
      this.pacientesService.getPaciente(this.expedienteBuscar).subscribe(data => {
        if (data) {
          this.actualizarPacientes([data]);
          this.filteredPacientes = [data];

        } else {
          this.actualizarPacientes([]);
          this.filteredPacientes = [];
        }
      });
    } else if (this.nombreBuscar || this.apellidoBuscar) {
      this.pacientesService.getNombre(this.nombreBuscar, this.apellidoBuscar).subscribe(data => {
        if (data && data.length > 0) {
          this.actualizarPacientes(data);
          this.filteredPacientes = data;
        } else {
          this.actualizarPacientes([]);
          this.filteredPacientes = [];
        }
      });
    } else if (this.dpiBuscar !="" ) {
      this.pacientesService.getdpi(this.dpiBuscar).subscribe(data => {
        if (data) {
          this.actualizarPacientes([data]);
          this.filteredPacientes = data;
          console.log(this.filteredPacientes)
        } else {
          this.actualizarPacientes([]);
          this.filteredPacientes = [];
        }
      });
    } else {
      // Limpiar resultados si no se proporciona ningún criterio de búsqueda
      this.actualizarPacientes([]);
      this.filteredPacientes = [];
    }
  }

  limpiarInput() {
    this.expedienteBuscar = ''; // Limpia el contenido del input
    this.nombreBuscar = '';
    this.apellidoBuscar = '';
    this.dpiBuscar = '';
    this.filteredPacientes = [];
     // Obtén todos los pacientes nuevamente
  }

  private actualizarPacientes(data: any[]) {
    if (data.length > 0) {
      // this.pacientes = data.sort((a: { expediente: number; }, b: { expediente: number; }) => b.expediente - a.expediente);
      this.filteredPacientes = data;
      console.log(this.filteredPacientes)
      this.paginarPacientes();
      this.dpiBuscar = '';
      this.nombreBuscar = '';
      this.apellidoBuscar = '';
      this.expedienteBuscar = '';

    } else {
      this.pacientes = [];
      //this.filteredPacientes = [];
      this.totalRegistros = 0;
    }
  }


}

