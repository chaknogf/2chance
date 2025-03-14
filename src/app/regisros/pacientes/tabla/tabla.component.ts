import { PageReloadService } from '../../../services/PageReload.service';
import { Component, Renderer2, EventEmitter, OnInit, Output, ViewChild, ElementRef, Input } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { ActivatedRoute, Router } from '@angular/router';
import { IconsultasPor, Ienum } from 'src/app/models/Ienum';
import { etnias, ecivil, academic, parents, lenguaje, servicio, servicios, nation, tipo_citas, consult_coex } from 'src/app/enums/enums';
import { municipio } from 'src/app/enums/vencindad';
import { FechaService } from 'src/app/services/fecha.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/user.service';

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
  private sortColumn: string | undefined;
  private ascendingOrder: boolean = false;
  public username = this.user.getUsernameLocally();
  public edad: number = 0;
  public validar: boolean = false;

  @Input() patient: Ipaciente | undefined;

  detalleVisible: boolean | undefined;


  e: Ienum = {
    municipio: municipio,
    nation: nation,
    people: etnias,
    ecivil: ecivil,
    academic: academic,
    parents: parents,
    lenguage: lenguaje,
    servicios: servicios,
    servicio: servicio
  }

  cnsult: IconsultasPor = {
    consult: consult_coex
  }
  coex: Iconcultas = {
    id: 0,
    hoja_emergencia: null,
    expediente: null,
    fecha_consulta: this.fechaActual,
    hora: this.horaActual,
    nombres: "",
    apellidos: "",
    nacimiento: new Date(),
    edad: "",
    sexo: "",
    dpi: null,
    direccion: "",
    acompa: null,
    parente: null,
    telefono: null,
    especialidad: 0,
    servicio: null,
    status: 1,
    fecha_recepcion: null,
    fecha_egreso: null,
    tipo_consulta: 1,
    nota: "",
    name: null,
    lastname: null,
    prenatal: null,
    lactancia: null,
    dx: null,
    folios: null,
    consulta_por: 1,
    archived_by: null,
    created_at: null,
    updated_at: null,
    created_by: '',
    medico: null,
    bomberos: false,
    transito: false,
    arma_blanca: false,
    arma_fuego: false,
    estudiante_publica: false,
    accidente_laboral: false,
    personal_hospital: false
  }

  @Output() idPaciente = new EventEmitter<number>();
  @Output() nombrePaciente = new EventEmitter<string>();
  @Output() apellidoPaciente = new EventEmitter<string>();
  @Output() edadPaciente = new EventEmitter<string>();
  @Output() nacimientoPaciente = new EventEmitter<Date>();
  @Output() sexoPaciente = new EventEmitter<string>();
  @Output() direccionPaciente = new EventEmitter<string>();
  @Output() telefonoPaciente = new EventEmitter<string>();
  @ViewChild('edadCell', { static: false }) edadCell: ElementRef = new ElementRef(null);

  constructor(
    private pacientesService: PacientesService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private ConsultasService: ConsultasService,
    private formBuilder: FormBuilder,
    private fechaService: FechaService,
    private PageReloadService: PageReloadService,
    private renderer: Renderer2,
    private el: ElementRef,
    private user: UsersService,
  ) { }
  reset: boolean = false;
  busqueda: string = '';
  order: string = 'asc';


  ngOnInit() {


    this.fechaActual = this.fechaService.FechaActual();
    this.horaActual = this.fechaService.HoraActual();

    this.coex.created_by = this.username;
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

  copiarId(exp: number, nombre: string, apellido: string, nacimiento: Date, sexo: string, direccion: string, telefono: string) {
    this.idPaciente.emit(exp);
    this.nombrePaciente.emit(nombre);
    this.apellidoPaciente.emit(apellido);
    this.nacimientoPaciente.emit(nacimiento);
    this.sexoPaciente.emit(sexo);
    this.direccionPaciente.emit(direccion);
    this.telefonoPaciente.emit(telefono);

    const valorCelda = this.edadCell.nativeElement.textContent;
    console.log('Valor copiado:', valorCelda);
    //this.edadPaciente.emit(edad);
    this.coex.expediente = exp;
    this.coex.nombres = nombre;
    this.coex.apellidos = apellido;
    this.coex.nacimiento = nacimiento;
    this.coex.fecha_consulta = this.fechaActual;
    this.coex.hora = this.horaActual;
    this.coex.edad = valorCelda;
    this.coex.sexo = sexo;
    this.coex.direccion = direccion;
    this.coex.telefono = telefono;

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
    } else if (this.dpiBuscar != "") {
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
      // this.dpiBuscar = '';
      // this.nombreBuscar = '';
      // this.apellidoBuscar = '';
      // this.expedienteBuscar = '';

    } else {
      this.pacientes = [];
      //this.filteredPacientes = [];
      this.totalRegistros = 0;
    }
  }

  registrarCoex(): void {
    if (!this.coex.especialidad) {
      console.log('Especialidad no seleccionada');
      return;
    }

    this.ConsultasService.crear(this.coex).subscribe(
      (response) => {
        console.log('Consulta creada con éxito', response);
        console.table(response);
        this.mostrarAlerta('Consulta creada con éxito', 'success');

        setTimeout(() => {
          window.location.reload();
        }, 1000); // 1 segundo antes de recargar
      },
      (error) => {
        console.error('Error al crear consulta', error);
        this.mostrarAlerta('Error al crear consulta', 'danger');

        setTimeout(() => {
          window.location.reload();
        }, 2000); // 2 segundos antes de recargar
      }
    );
  }

  private mostrarAlerta(mensaje: string, tipo: 'success' | 'danger') {
    // Elimina cualquier alerta previa para evitar duplicados
    document.querySelectorAll('.alert').forEach(alert => alert.remove());

    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', `alert-${tipo}`, 'fixed-top', 'text-center', 'fw-bold');
    alertDiv.textContent = mensaje;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.remove(); // Elimina la alerta después de unos segundos
    }, 3000);
  }

  reloadPage() {
    // Llama al servicio para recargar la página
    this.PageReloadService.reloadPage();
  }

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

  calcularEdad(nac: any): number {
    this.edad = this.fechaService.años(nac);
    return this.edad;
  }

  abrirModal(paciente: Ipaciente) {
    this.pacientesService.getIdPaciente(paciente.id).subscribe(data => {
      this.patient = data;
      console.table(this.patient, data);
      // Abre el modal aquí, puedes establecer una propiedad para controlar la visibilidad del modal.
      this.detalleVisible = true;
    });
  }

  validador() {
    this.validar = true;
  }

  closeModal() {
    this.detalleVisible = false;
  }

  reloadComponent() {
    this.router.navigateByUrl('/dummy-route', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(this.router.url); // Vuelve a la página original
    });
  }

}

