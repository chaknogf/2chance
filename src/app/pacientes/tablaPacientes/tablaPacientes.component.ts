import { Component } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'tablaPacientes',
  templateUrl: './tablaPacientes.component.html',
  styleUrls: ['./tablaPacientes.component.css']
})
export class TablaPacientesComponent{
  public pacientes: Ipaciente[] = []; // Registros a mostrar en la página actual
  public filteredPacientes: Ipaciente[] = [];
  public searchText: string = '';
  public totalRegistros: number = 12; // Total de registros en la lista
  public paginaActual: number = 1; // Página actual
  public expedienteBuscar: any = '';
  public nombreBuscar: string = '';
  public apellidoBuscar: string = '';
  public dpiBuscar: any = '';


  constructor(private pacientesService: PacientesService,
    private router: Router,
    private activateRoute: ActivatedRoute,

    ) { }
  reset: boolean = false;

  ngOnInit() {
    this.getPacientes();
    this.paginarPacientes();
  }

  abrirModalDeEdicion(pacienteId: number) {
    // Aquí puedes agregar la lógica para abrir el modal
    // Puedes usar this.modalService para abrir el modal según tu configuración
    // Ejemplo: this.bsModalRef = this.modalService.show(...);

    // Luego, puedes redirigir a la página de edición de paciente utilizando Router
    this.router.navigate(['/paciente/edit', pacienteId]);
  }




  getPacientes() {
    this.pacientesService.getPacientes().subscribe(data => {
      this.pacientes = data.sort((a: { expediente: number; }, b: { expediente: number; }): number => b.expediente - a.expediente);
      this.filteredPacientes = data;
      this.paginarPacientes();//Llama a la función aquí para paginar automáticamente
    });
  }



  delete(id: number) {
    this.pacientesService.deletePaciente(id).subscribe(data => {
      this.pacientes = data;
      this.ngOnInit();
    });
  }




  busqueda: string = '';
  order: string = 'asc';



  sortTable(colu: any) {
    if (this.order === 'asc') {
      this.pacientes.sort((a, b) => a[colu] > b[colu] ? 1 : -1);
      this.order = 'desc';
    } else {
      this.pacientes.sort((a, b) => a[colu] < b[colu] ? 1 : -1);
      this.order = 'asc';
    }
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

  buscarPaciente() {
    if (this.expedienteBuscar !== 0) {
      this.pacientesService.getPaciente(this.expedienteBuscar).subscribe(data => {
        if (data) {
          this.pacientes = [data]; // Establece el arreglo de pacientes para mostrar solo el resultado de la búsqueda
          this.paginarPacientes(); // Pagina los resultados
        } else {
          // No se encontró ningún paciente con el número de expediente proporcionado
          this.pacientes = [];
          this.filteredPacientes = [];
          this.totalRegistros = 0;
        }
      });
    } else {
      // ExpedienteBuscar es 0 o un valor inválido, muestra todos los pacientes
      this.getPacientes();
    }
  }

  limpiarInput() {
    this.expedienteBuscar = ''; // Limpia el contenido del input
    this.nombreBuscar = '';
    this.apellidoBuscar = ''
    this.getPacientes(); // Obtén todos los pacientes nuevamente
  }

  buscarPacientes() {
    if (this.nombreBuscar || this.apellidoBuscar || this.expedienteBuscar) {
      // Si se proporciona nombre, apellido o expediente, intenta buscar por nombre o expediente
      if (this.nombreBuscar && this.apellidoBuscar) {
        this.pacientesService.getNombre(this.nombreBuscar, this.apellidoBuscar).subscribe(data => {
          this.actualizarPacientes(data);
        });
      } else if (this.expedienteBuscar) {
        this.pacientesService.getPaciente(this.expedienteBuscar).subscribe(data => {
          this.actualizarPacientes(data);
        });
      }
    } else if (this.dpiBuscar) {
      // Si se proporciona DPI, busca por DPI
      this.pacientesService.getdpi(this.dpiBuscar).subscribe(data => {
        this.actualizarPacientes(data);
      });
    } else {
      // Si no se proporciona ninguno de los campos, obtiene todos los pacientes
      this.getPacientes();
    }
  }



  private actualizarPacientes(data: any[]) {
    if (data.length > 0) {
      this.pacientes = data.sort((a: { expediente: number; }, b: { expediente: number; }) => b.expediente - a.expediente);
      this.filteredPacientes = data;
      this.paginarPacientes();
      this.dpiBuscar = '';
      this.nombreBuscar = '';
      this.apellidoBuscar = ''
    } else {
      this.pacientes = [];
      this.filteredPacientes = [];
      this.totalRegistros = 0;
    }
  }


}

