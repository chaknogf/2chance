import { Component, Input } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/user.service';
import { HttpHeaders } from '@angular/common/http';
import { FechaService } from 'src/app/services/fecha.service';
import { PageReloadService } from 'src/app/services/PageReload.service';



@Component({
  selector: 'tablaPacientes',
  templateUrl: './tablaPacientes.component.html',
  styleUrls: ['./tablaPacientes.component.css']
})
export class TablaPacientesComponent {
  public pacientes: Ipaciente[] = []; // Registros a mostrar en la página actual
  public resumen: Ipaciente[] = [];
  public searchText: string = '';
  public totalRegistros: number = 12; // Total de registros en la lista
  public paginaActual: number = 1; // Página actual
  public expedienteBuscar: any = '';
  public nombreBuscar: string = '';
  public apellidoBuscar: any = '';
  public dpiBuscar: any = '';
  public paciente_: Ipaciente | undefined;
  public porcentajeDeProgreso: number = 0; // Variable para el progreso
  private sortColumn: string | undefined;
  private ascendingOrder: boolean = false;
  public edad: number = 0;
  patient: Ipaciente | undefined;

  detalleVisible: boolean | undefined;



  constructor(private pacientesService: PacientesService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private userService: UsersService,
    private fecha: FechaService,
    private reloadService: PageReloadService
  ) { }
  reset: boolean = false;

  ngOnInit() {
    this.getPacientes();

    this.paginar();


  }




  getPacientes() {
    this.porcentajeDeProgreso = 0.5;
    this.pacientesService.getPacientes().subscribe(data => {
      this.pacientes = data.sort((a: { expediente: number; }, b: { expediente: number; }): number => b.expediente - a.expediente);
      this.porcentajeDeProgreso = 75;
      this.resumen = data;
      this.paginar();
      this.porcentajeDeProgreso = 100;
      setTimeout(() => {
        this.porcentajeDeProgreso = -1;
      }, 200);
      //console.table(data)
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
    this.resumen = this.pacientes.slice(indiceInicio, indiceFin);
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
    return Math.ceil(this.pacientes.length / this.totalRegistros);

  }


  calcularEdad(nac: any): number {
    this.edad = this.fecha.años(nac);
    return this.edad;
  }

  delete(id: number) {
    this.pacientesService.deletePaciente(id).subscribe(data => {
      this.pacientes = data;
      this.ngOnInit();
    });
  }

  busqueda: string = '';
  order: string = 'asc';


  sortTable(column: keyof Ipaciente) {
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







  buscarPaciente() {
    if (this.expedienteBuscar !== 0) {
      this.pacientesService.getPaciente(this.expedienteBuscar).subscribe(data => {
        if (data) {
          this.pacientes = [data]; // Establece el arreglo de pacientes para mostrar solo el resultado de la búsqueda
          this.paginar(); // Pagina los resultados
        } else {
          // No se encontró ningún paciente con el número de expediente proporcionado
          this.pacientes = [];
          this.resumen = [];
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
    this.apellidoBuscar = '';
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
      this.resumen = data;
      this.paginar();
      // this.dpiBuscar = '';
      // this.nombreBuscar = '';
      // this.apellidoBuscar = ''
    } else {
      this.pacientes = [];
      this.resumen = [];
      this.totalRegistros = 0;
    }
  }



  filtro() {
    // Recopila los valores de entrada del formulario
    const filters = {
      // id: this.idBuscar,
      expediente: this.expedienteBuscar,
      nombre: this.nombreBuscar,
      apellido: this.apellidoBuscar,
      dpi: this.dpiBuscar,
    };

    this.pacientesService.filterPaciente(filters).subscribe(result => {
      this.pacientes = result;
      this.resumen = result;
      this.paginar()
    });
  }




  abrirModal(paciente: Ipaciente) {
    this.pacientesService.getIdPaciente(paciente.id).subscribe(data => {
      this.patient = data;
      console.table(this.patient, data);
      // Abre el modal aquí, puedes establecer una propiedad para controlar la visibilidad del modal.
      this.detalleVisible = true;
    });
  }





}

