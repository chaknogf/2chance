import { Component, OnInit, HostBinding, Output, EventEmitter } from '@angular/core';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultasService } from 'src/app/services/consultas.service';
import { FechaService } from 'src/app/services/fecha.service';
import { UsersService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Iuisau, Iuisau_v } from 'src/app/models/Iuisau';
import { UisauService } from 'src/app/services/uisau.service';


@Component({
  selector: 'app-detalleUisau',
  templateUrl: './detalleUisau.component.html',
  styleUrls: ['./detalleUisau.component.css']
})
export class DetalleUisauComponent implements OnInit {
  constructor(
    private ConsultasService: ConsultasService,
    private FechaService: FechaService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private user: UsersService,
    private _location: Location,
    private pt: PacientesService,
    private route: ActivatedRoute,
    private au: UisauService,


  ) { }

  public consultas: Iconcultas[] = [];
  public fechaActual: string = this.FechaService.FechaActual();
  public horaActual: string = this.FechaService.HoraActual();
  public fechaRecepcion: string = this.FechaService.registroTiempo();
  public fechaEgreso: string = this.FechaService.FechaActual();
  view: boolean = false;
  public selectdate: string = '';
  public maxdate: string = '';
  private nuevoStatus: number = 0;
  public username = this.user.getUsernameLocally()
  public rutaAnterior: string = '../';
  public paciente: Ipaciente | undefined;
  public consulta: Iconcultas | any;
  public resumen: Iuisau_v[] = [];
  public infos_: Iuisau_v[] = [];
  private sortColumn: string | undefined;
  private ascendingOrder: boolean = false;
  public paginaActual: number = 1; // Página actual
  private totalRegistros: number = 5;

  @Output() idConsulta = new EventEmitter<number>();

  info: Iuisau = {
    id: 0,
    expediente: 0,
    nombres: '',
    apellidos: '',
    estado: 0,
    situacion: 0,
    lugar_referencia: 0,
    fecha_referencia: '',
    estadia: 0,
    cama: 0,
    especialidad: 0,
    servicio: 0,
    informacion: '',
    contacto: '',
    parentesco: 0,
    telefono: 0,
    fecha: '',
    nota: '',
    estudios: '',
    evolucion: '',
    id_consulta: 0,
    created_by: '',
    hora: '',
    fecha_contacto: '',
    hora_contacto: '',
    update_by: '',
    created_at: '',
    update_at: '',
    receta_por: '',
    shampoo: false,
    toalla: false,
    peine: false,                    
    jabon: false,                  
    cepillo_dientes: false,                             
    pasta_dental: false,                          
    sandalias: false,                               
    agua: false,                              
    papel: false,                                       
    panales: false,  
  }



  ngOnInit() {

    // Obtiene la fecha actual en el formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];
    this.maxdate = currentDate;


    // Obtener los parámetros de la ruta
    const params = this.activateRoute.snapshot.params;

    if (params['id']) {
      this.ConsultasService.Consulta(params['id'])
        .subscribe(
          data => {
            this.consulta = data;
            this.view = true;
            this.au.InfoConsulta(this.consulta?.id)
        .subscribe(
          data => {
            this.infos_ = data;
            this.resumen = data.sort((a: { id: number; }, b: { id: number; }): number => b.id - a.id);
            // console.table(this.resumen)
          })
            this.pt.getPaciente(this.consulta?.expediente)
              .subscribe(
                dta => {
                  this.paciente = dta;
                  // console.table(dta, data)

              }
            )
          },
          error => console.log(error)
        )
    }

    this.paginar();


  }


  regresar(){
    this._location.back();
  }

  onPageChange(pageNumber: number) {
    this.paginaActual = pageNumber;
    this.paginar();
  }


  paginar() {

    const tamanoPagina = 5;
    // console.log(tamanoPagina)
    const indiceInicio = (this.paginaActual - 1) * tamanoPagina;
    // console.log(indiceInicio)
    const indiceFin = indiceInicio + tamanoPagina;
    // console.log(indiceFin)
    this.resumen = this.infos_.slice(indiceInicio, indiceFin);
    // console.log(this.infos_, this.resumen)
    // this.totalRegistros = this.resumen.length; // Agrega esta línea para actualizar el número total de registros por página
    // console.log(this.totalRegistros)
  }

  getPaginas(): number[] {
    const totalPaginas = this.totalPaginas();
    // console.log(totalPaginas)

    // Verificar si totalPaginas es válido antes de crear el array
    if (totalPaginas <= 0) {
      return [];
    }

    // Generar un array de números basado en el número total de páginas
    return Array.from({ length: totalPaginas }, (_, index) => index + 1);
  }

  totalPaginas(): number {
    return Math.ceil(this.resumen.length / this.totalRegistros);

  }





}
