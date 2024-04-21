import { Component, Input } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/user.service';
import { HttpHeaders } from '@angular/common/http';
import { FechaService } from 'src/app/services/fecha.service';



@Component({
  selector: 'personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent{
  public pacientes: Ipaciente[] = []; // Registros a mostrar en la página actual
  public filteredPacientes: Ipaciente[] = [];
  public searchText: string = '';
  public totalRegistros: number = 12; // Total de registros en la lista
  public paginaActual: number = 1; // Página actual
  public expedienteBuscar: any = '';
  public nombreBuscar: string = '';
  public apellidoBuscar: string = '';
  public dpiBuscar: any = '';
  public paciente: Ipaciente | undefined;
  public porcentajeDeProgreso: number = 0; // Variable para el progreso
  private sortColumn: string | undefined;
  private ascendingOrder: boolean = false;
  public edad: number = 0;
  @Input() patient: Ipaciente | undefined;

  detalleVisible: boolean | undefined;



  constructor(private pacientesService: PacientesService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private userService: UsersService,
    private fecha: FechaService,
    ) { }
  reset: boolean = false;

  ngOnInit() {
    this.getPacientes();
    this.paginarPacientes();


  }


  calcularEdad(nac: any): number {
    this.edad = this.fecha.años(nac);
    return this.edad;
  }



  getPacientes() {
    this.porcentajeDeProgreso = 0.5;

    // Obten el token de autenticación guardado en las cookies
    const token = this.userService.getToken();

    // Configura las cabeceras con el token de autenticación
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    this.pacientesService.getPersonas().subscribe(data => {
      this.pacientes = data.sort((a: { expediente: number; }, b: { expediente: number; }): number => b.expediente - a.expediente);
      this.porcentajeDeProgreso = 75;
      this.filteredPacientes = data;
      this.paginarPacientes();
      this.porcentajeDeProgreso = 100;
      setTimeout(() => {
        this.porcentajeDeProgreso = -1;
      }, 1000);
      //console.table(data)
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



  sortTable(column: keyof Ipaciente) {
    if (this.sortColumn === column) {
      this.ascendingOrder = !this.ascendingOrder;
    } else {
      this.sortColumn = column;
      this.ascendingOrder = true;
    }

    this.filteredPacientes.sort((a, b) => {
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
    this.apellidoBuscar = '';
    this.dpiBuscar = '';
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
      this.pacientes = data//.sort((a: { expediente: number; }, b: { expediente: number; }) => b.expediente - a.expediente);
      this.filteredPacientes = data;
      this.paginarPacientes();
      // this.dpiBuscar = '';
      // this.nombreBuscar = '';
      // this.apellidoBuscar = ''
    } else {
      this.pacientes = [];
      this.filteredPacientes = [];
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

    this.pacientesService.filterPersona(filters).subscribe((result) => {
      this.pacientes = result;
      this.filteredPacientes= result;
    });



  }


  // filtroo() {
  //   if (this.expedienteBuscar !== "") {
  //     this.pacientesService.getPaciente(this.expedienteBuscar).subscribe(data => {
  //       if (data) {
  //         this.actualizarPacientes([data]);
  //         this.filteredPacientes = [data];

  //       } else {
  //         this.actualizarPacientes([]);
  //         this.filteredPacientes = [];
  //       }
  //     });
  //   } else if (this.nombreBuscar || this.apellidoBuscar) {
  //     this.pacientesService.getNombre(this.nombreBuscar, this.apellidoBuscar).subscribe(data => {
  //       if (data && data.length > 0) {
  //         this.actualizarPacientes(data);
  //         this.filteredPacientes = data;
  //       } else {
  //         this.actualizarPacientes([]);
  //         this.filteredPacientes = [];
  //       }
  //     });
  //   } else if (this.dpiBuscar !="" ) {
  //     this.pacientesService.getdpi(this.dpiBuscar).subscribe(data => {
  //       if (data) {
  //         this.actualizarPacientes([data]);
  //         this.filteredPacientes = data;
  //         console.log(this.filteredPacientes)
  //       } else {
  //         this.actualizarPacientes([]);
  //         this.filteredPacientes = [];
  //       }
  //     });
  //   } else {
  //     // Limpiar resultados si no se proporciona ningún criterio de búsqueda
  //     this.actualizarPacientes([]);
  //     this.filteredPacientes = [];
  //   }
  // }


  abrirModal(paciente: Ipaciente) {
    this.pacientesService.getIdPaciente(paciente.id).subscribe(data => {
      this.patient = data;
      console.table(this.patient, data);
      // Abre el modal aquí, puedes establecer una propiedad para controlar la visibilidad del modal.
      this.detalleVisible = true;
    });
  }




}

