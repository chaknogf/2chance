
import { PageReloadService } from '../../../../services/PageReload.service';
import { Component, Renderer2,EventEmitter, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { ActivatedRoute, Router } from '@angular/router';
import {  Ienum } from 'src/app/models/Ienum';
import { etnias, ecivil, academic, parents, lenguaje, servicio, servicios, nation } from 'src/app/enums/enums';
import { municipio, departamentos, vecindad } from 'src/app/enums/vencindad';
import { FechaService } from 'src/app/services/fecha.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { FormBuilder } from '@angular/forms';
import { EnumsService } from 'src/app/services/enums.service';


@Component({
  selector: 'tabEmerExp',
  templateUrl: './tabEmerExp.component.html',
  styleUrls: ['./tabEmerExp.component.css']
})
export class TabEmerExpComponent implements OnInit {
  public pacientes: Ipaciente[] = []; // Registros a mostrar en la página actual
  public filteredPacientes: Ipaciente[] = [];
  public searchText: string = '';
  public totalRegistros: number = 12; // Total de registros en la lista
  public paginaActual: number = 1; // Página actual
  public expedienteBuscar: any = '';
  public resumen: Iconcultas[] = [];
  public paciente: Ipaciente | undefined;
  public nuevaDireccion: string = '';
  edit: boolean = false;
  new: boolean = false;
  fechaActual: string = "";
  horaActual: string = "";
  idCopiado: number = 0;
  mostrarModal = false;

  @Input() nombreBuscar: any;
  @Input() apellidoBuscar: any;
  @Input() dpiBuscar: any;


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
  emergencia: Iconcultas = {
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
    archived_by: null,
    created_at: '',
    updated_at: '',
    created_by: null,
    medico: null
  }

  @Output() idPaciente = new EventEmitter<number>();
  @Output() nombre = new EventEmitter<string>();
  @Output() apellido = new EventEmitter<string>();
  @Output() nacimiento = new EventEmitter<string>();
  @Output() sexo = new EventEmitter<string>();
  @Output() dpi = new EventEmitter<any>();
  @Output() direccion = new EventEmitter<string>();
  @Output() municipio = new EventEmitter<any>();




  constructor(private pacientesService: PacientesService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private ConsultasService: ConsultasService,
    private formBuilder: FormBuilder,
    private fechaService: FechaService,
    private PageReloadService: PageReloadService,
    private renderer: Renderer2,
    private el: ElementRef,
    private enums: EnumsService,
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
            this.emergencia = data;
            this.new = true;
            //console.table(data)
          },
          error => console.log(error)
        )
    }
    this.resumen;
  }

  copiarId(exp: number, nom: string, ape: string, nac: string, sex: string, cui: any, mun: any) {
    this.idPaciente.emit(exp);
    this.nombre.emit(nom);
    this.apellido.emit(ape);
    this.nacimiento.emit(nac);
    this.sexo.emit(sex);
    this.dpi.emit(cui);
    this.direccion.emit(this.nuevaDireccion);
    this.municipio.emit(mun)
    console.log(exp, mun)
    // this.emergencia.expediente = exp;

  }

  getPacientes() {
    this.pacientesService.getPersonas().subscribe(data => {
      this.pacientes = data;
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
    // Recopila los valores de entrada del formulario
    const filters = {
      expediente: this.expedienteBuscar,
      nombre: this.nombreBuscar,
      apellido: this.apellidoBuscar,
      dpi: this.dpiBuscar,
    };

    this.pacientesService.filterPersona(filters).subscribe((result) => {
      // this.actualizarPacientes([result]);
      this.filteredPacientes = result;
      console.log(result.municipio)
      let vecin = this.enums.Vecin(result.municipio);
      this.nuevaDireccion = result.direccion + ', ' + vecin;
      console.table(result)
      // console.log(this.nuevaDireccion, vecin, result.municipio)
    });

    this.paginarPacientes()



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
      //console.log(this.filteredPacientes)
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



  reloadPage() {
    // Llama al servicio para recargar la página
    this.PageReloadService.reloadPage();
  }


}

