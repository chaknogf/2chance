import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { ActivatedRoute, Router } from '@angular/router';
import { IenumEspecialidad } from 'src/app/models/Ienum';
import { servicio } from 'src/app/enums/enums';
import { FechaService } from 'src/app/services/fecha.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { FormBuilder } from '@angular/forms';


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
  public resumen: Iconcultas[] = [];
  public paciente: Ipaciente | undefined;
  edit: boolean = false;
  new: boolean = false;
  fechaActual: string = "";
  horaActual: string = "";
  idCopiado: number = 0;
  mostrarModal = false;



  e: IenumEspecialidad = {
    servicio: servicio
  }
  coex: Iconcultas = {
    id: 0,
    hoja_emergencia: null,
    expediente: null,
    fecha_consulta: this.fechaActual,
    hora: this.horaActual,
    nombres: "",
    apellidos: "",
    nacimiento: "",
    edad: "",
    sexo: "",
    dpi: "",
    direccion: "",
    acompa: "",
    telefono: "",
    especialidad: 0,
    recepcion: false,
    fecha_recepcion: "",
    fecha_egreso: "",
    tipo_consulta: 1,
    nota: "",
    name: "",
    lastname: "",

   }

  @Output() idPaciente = new EventEmitter<number>();
  @Output() nombrePaciente = new EventEmitter<string>();
  @Output() apellidoPaciente = new EventEmitter<string>();
  @Output() edadPaciente = new EventEmitter<string>();
  @ViewChild('edadCell') edadCell: ElementRef|undefined;

  constructor(private pacientesService: PacientesService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private ConsultasService: ConsultasService,
    private formBuilder: FormBuilder,
    private fechaService: FechaService
  ) { }
  reset: boolean = false;
  busqueda: string = '';
  order: string = 'asc';

  ngOnInit() {


    this.fechaActual = this.fechaService.FechaActual();
    this.horaActual= this.fechaService.HoraActual();

    // Obtener los parámetros de la ruta
    const params = this.activateRoute.snapshot.params;

    // Verificar si se proporcionó un ID de paciente
    if (params['id']) {
      this.ConsultasService.Consulta(params['id'])
        .subscribe(
          data => {
            this.coex = data;
            this.new = true;
          },
          error => console.log(error)
        )
    }
    this.resumen;
  }

  copiarId(exp: number, nombre: string, apellido: string) {
    this.idPaciente.emit(exp,);
    this.nombrePaciente.emit(nombre);
    this.apellidoPaciente.emit(apellido);
    const valorCelda = this.edadCell.nativeElement.textContent;
    console.log('Valor copiado:', valorCelda);
    //this.edadPaciente.emit(edad);
    this.coex.expediente = exp;
    this.coex.nombres = nombre;
    this.coex.apellidos = apellido;
    this.coex.fecha_consulta = this.fechaActual;
    this.coex.hora = this.horaActual;
    this.coex.edad = valorCelda;

    // console.log(exp)
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

