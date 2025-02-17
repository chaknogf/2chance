// Importa los módulos y servicios necesarios
import { FechaService } from '../../services/fecha.service';
import { PageReloadService } from '../../services/PageReload.service';
import { Component, OnInit } from '@angular/core';
import {
  parents,
  servicio,
  servicios,
  estado,
  estadia,
  referencia,
  situacion,
} from 'src/app/enums/enums';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/services/user.service';

import { Iuisau } from 'src/app/models/Iuisau';
import { UisauService } from 'src/app/services/uisau.service';
import { uisauEnum } from 'src/app/models/Ienum';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Iconcultas } from 'src/app/models/Iconsultas';

@Component({
  selector: 'app-editUisau',
  templateUrl: './editUisau.component.html',
  styleUrls: ['./editUisau.component.css'],
})
export class EditUisauComponent implements OnInit {
  // Inyección de servicios en el constructor
  constructor(
    private activateRoute: ActivatedRoute,
    private Fecha: FechaService,
    private PageReloadService: PageReloadService,
    private _location: Location,
    private user: UsersService,
    private au: UisauService,
    private consultas: ConsultasService
  ) { }

  // Variables y propiedades del componente
  public username = this.user.getUsernameLocally();
  public resumen: Iuisau[] = [];
  public maxdate: string = '';
  public mindate: any = '';
  public fechaActual: string = this.Fecha.FechaActual();
  public horaActual: string = this.Fecha.HoraActual();
  public registro: string = this.Fecha.registroTiempo();
  public idCopiado: number = 0;
  private new: boolean = false;
  private consu: Iconcultas | any;
  public message: string = '';
  showAlertSuccess = false;
  showAlertWarning = false;
  public diagnotico = '';

  // Modelo para la información de la consulta
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
    fecha_contacto: this.fechaActual,
    hora_contacto: this.horaActual,
    update_by: '',
    dxA: '',
    dxB: '',
    dxC: '',
    dxD: '',
    dxE: '',
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
  };

  // Modelo para la consulta inicial
  c: Iconcultas = {
    id: 0,
    hoja_emergencia: null,
    expediente: undefined,
    fecha_consulta: '',
    hora: null,
    nombres: null,
    apellidos: null,
    nacimiento: null,
    edad: null,
    sexo: null,
    dpi: null,
    direccion: null,
    acompa: null,
    parente: null,
    telefono: '',
    especialidad: null,
    servicio: null,
    status: null,
    fecha_recepcion: null,
    fecha_egreso: null,
    tipo_consulta: null,
    nota: null,
    name: null,
    lastname: null,
    prenatal: null,
    lactancia: null,
    dx: null,
    folios: null,
    medico: null,
    archived_by: null,
    created_at: null,
    updated_at: null,
    created_by: null,

  };

  // Opciones enumeradas para formularios
  op: uisauEnum = {
    estadia: estadia,
    situacion: situacion,
    estado: estado,
    referencia: referencia,
    especialidad: servicio,
    parentesco: parents,
    servicios: servicios,
  };

  ngOnInit() {
    // Configuración de fechas
    this.maxdate = this.Fecha.FechaActual();

    // Configuración inicial de la información
    this.info.update_by = this.username;
    this.info.fecha_contacto = this.fechaActual;
    this.info.hora_contacto = this.horaActual;



    // Obtiene los parámetros de la ruta
    const params = this.activateRoute.snapshot.params;
    console.log(
      this.info.update_by,
      this.info.fecha_contacto,
      this.info.hora_contacto
    );

    // Verifica si es una nueva consulta o una consulta existente
    if (params['id']) {
      // Obtiene la información de la consulta existente
      this.au.InfoId(params['id']).subscribe((data) => {
        this.info = data;
        this.resumen = data;
        this.info.update_by = this.username;
        this.info.fecha_contacto = this.fechaActual;
        this.info.hora_contacto = this.horaActual;
        this.diagnotico = `${this.info.dxA}-${this.info.dxB}-${this.info.dxC}-${this.info.dxD}-${this.info.dxE}`;
      });
    }
  }

  // Método para regresar a la página anterior
  regresar() {
    this._location.back();
  }

  // Método para cerrar las alertas
  closeAlert(): void {
    this.showAlertSuccess = false;
    this.showAlertWarning = false;
  }

  // Método para registrar la edición de la consulta
  registrar(): void {
    this.au.editar(this.info.id, this.info).subscribe(
      (response) => {
        console.log('Consulta registrada con éxito', response);
        this.message = 'Consulta registrada con éxito';
        this.showAlertSuccess = true;

        // Redirecciona después de 2 segundos
        setTimeout(() => {
          this.regresar();
        }, 2000); // 1000 ms = 1 segundo
      },
      (error) => {
        console.error('Error al crear consulta', error);
        this.message = 'Error al crear consulta';
        this.showAlertWarning = true;

        // Recarga la página después de 2 segundos en caso de error
        setTimeout(() => {
          this.reloadPage();
        }, 1000); // 1000 ms = 1 segundo
      }
    );
  }

  // Método para recargar la página
  reloadPage() {
    this.PageReloadService.reloadPage();
  }

  // Lista de municipios filtrados para referencia
  refFiltrados: any[] = [];
  ref: number = 0;

  // Método para mostrar referencias según la situación
  mostrarRef() {
    if (this.info.situacion == 4) {
      this.refFiltrados = this.op.referencia;
      console.log(this.refFiltrados, this.info.situacion);
    } else {
      this.refFiltrados = [];
    }
  }
}
