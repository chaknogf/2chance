import { EdadService } from 'src/app/services/edad.service';
import { PageReloadService } from '../../../services/PageReload.service';
import { Component, Renderer2, EventEmitter, OnInit, Output, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService } from 'src/app/services/medico.service';
import { FechaService } from 'src/app/services/fecha.service';
import { CNacService } from 'src/app/services/c-nac.service';
import { FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/user.service';
import { IconsNac } from 'src/app/models/IconsNac';
import { AnyToTextPipe } from 'src/app/pipe/anyToText.pipe';
import { Location } from '@angular/common';
import { departamentos, municipio, vecindad } from 'src/app/enums/vencindad'
import { Imedico } from 'src/app/models/Imedico';
import { lugares, deptos } from './../../../models/Ienum';
import { TextoService } from 'src/app/services/texto.service';
import { from } from 'rxjs';


@Component({
  selector: 'tabMadres',
  templateUrl: './tabMadres.component.html',
  styleUrls: ['./tabMadres.component.css']
})
export class TabMadresComponent implements OnInit  {

  constructor(
    private pacientesService: PacientesService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private cnacSer: CNacService,
    private formBuilder: FormBuilder,
    private fechaService: FechaService,
    private PageReloadService: PageReloadService,
    private user: UsersService,
    private mserv: MedicoService,
    private Edad: EdadService,
    private texto: TextoService,
  ) { }

  //variables para pacientes
  public pacientes: Ipaciente[] = []; // Registros a mostrar en la página actual
  public filteredPacientes: Ipaciente[] = [];

  public searchText: string = '';
  public totalRegistros: number = 12; // Total de registros en la lista
  public paginaActual: number = 1; // Página actual
  public expedienteBuscar: any = '';
  public nombreBuscar: string = '';
  public apellidoBuscar: string = '';
  public dpiBuscar: any = '';
  detalleVisible: boolean | undefined;
  public paciente: Ipaciente | undefined;
  @Input() madre: Ipaciente | undefined;
  public patient: Ipaciente | undefined;
  public idCopiado: number = 0;
  public mostrarModal = false;

  //variable para constancias
  public username = this.user.getUsernameLocally();
  public corAño: string = ""
  public corOrden: string = ""
  public edit: boolean = false;
  public new: boolean = false;
  public horaActual: string = "";
  public edad: number = 0;
  public fechaActual: string = "";
  public resumen: IconsNac[] = [];

  //variables para medicos
  public medicos: Imedico[] = [];
  public _medico: Imedico | undefined;



//objeto constancias
  d: lugares = {
    departamentos: departamentos,
    municipio: municipio
  }
  constancia: IconsNac = {
    id: 0,
    fecha: undefined,
    cor: null,
    ao: null,
    doc: null,
    fecha_parto: null,
    madre: null,
    dpi: null,
    passport: null,
    libro: null,
    folio: null,
    partida: null,
    depto: null,
    muni: null,
    edad: '',
    vecindad: null,
    sexo_rn: null,
    lb: null,
    onz: null,
    hora: null,
    medico: null,
    colegiado: null,
    dpi_medico: null,
    hijos: null,
    vivos: null,
    muertos: null,
    tipo_parto: null,
    clase_parto: null,
    certifica: null,
    create_by: null,
    expediente: null
  }

  ngOnInit() {
    this.NuevoCor();
    this.constancia.create_by = this.username;
    this.fechaActual = this.fechaService.FechaActual();
    this.horaActual= this.fechaService.HoraActual();
  }

  OnChanges() {
    this.NuevoCor();
  }

  //metodos pacientes

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
    return Math.ceil(this.filteredPacientes.length / this.totalRegistros);

  }

  filtro() {
    // Recopila los valores de entrada del formulario
    const filters = {

      expediente: this.expedienteBuscar,
      nombre: this.nombreBuscar,
      apellido: this.apellidoBuscar,
      dpi: this.dpiBuscar,


    };

    this.pacientesService.mujeres(filters).subscribe((result) => {
      this.pacientes = result;
      this.filteredPacientes = result;
      this.paginarPacientes();
    });

  }


  limpiarInput() {
    this.expedienteBuscar = ''; // Limpia el contenido del input
    this.nombreBuscar = '';
    this.apellidoBuscar = '';
    this.dpiBuscar = '';
    this.filteredPacientes = [];


     // Obtén todos los pacientes nuevamente
  }




  //metodos contancias


  copiarPaciente() {
    this.NuevoCor();




    }

    abrirModal(paciente: Ipaciente) {
      this.pacientesService.getIdPaciente(paciente.id).subscribe(data => {
        this.madre = data;
        console.table(this.madre, data);
        // Abre el modal aquí, puedes establecer una propiedad para controlar la visibilidad del modal.
        this.detalleVisible = true;
        this.constancia.madre = this.texto.capitalizar(`${data.nombre} ${data.apellido}`);
        this.constancia.edad = this.Edad.años(data.nacimiento);
        this.constancia.dpi = data.dpi;
        this.constancia.passport = data.pasaporte;
        this.constancia.vecindad = data.municipio;
        this.constancia.expediente = data.expediente;

      });
    }

    NuevoCor() {
      this.cnacSer.correlativo().subscribe(data => {
        if (this.edit == false) {
          // Actualiza el correlativo y año en tu objeto cNac
          this.constancia.cor = data.cor;
          this.constancia.ao = data.año;
        }
        this.constancia.doc = `${this.constancia.cor}-${this.constancia.ao}`
        // console.table(data)
      });
    }

    medico() {
      this.mserv.getMedicoCol(this.constancia.colegiado).subscribe(data => {
          this._medico = data;
          this.constancia.medico = data.name;
          this.constancia.dpi_medico = data.dpi;
        }
      )
    }



}

