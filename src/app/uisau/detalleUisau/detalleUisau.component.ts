import { Component, OnInit, HostListener } from '@angular/core';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ConsultasService } from 'src/app/services/consultas.service';
import { FechaService } from 'src/app/services/fecha.service';
import { UsersService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Iuisau } from 'src/app/models/Iuisau';
import { UisauService } from 'src/app/services/uisau.service';
import { Ipaciente, ItelPaciente } from 'src/app/models/Ipaciente';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-detalleUisau',
  templateUrl: './detalleUisau.component.html',
  styleUrls: ['./detalleUisau.component.css']
})
export class DetalleUisauComponent implements OnInit {
  public consultas: Iconcultas[] = [];
  public fechaActual: string = this.FechaService.FechaActual();
  public horaActual: string = this.FechaService.HoraActual();
  public fechaRecepcion: string = this.FechaService.registroTiempo();
  public fechaEgreso: string = this.FechaService.FechaActual();
  public selectdate: string = '';
  public view: boolean = false;
  public maxdate: string = '';
  private nuevoStatus: number = 0;
  public username = this.user.getUsernameLocally();
  public rutaAnterior: string = '../';
  public paciente: Ipaciente | undefined;
  public consulta: Iconcultas | any;
  public resumen: Iuisau[] = [];
  public infos_: Iuisau[] = [];
  private sortColumn: string | undefined;
  private ascendingOrder: boolean = false;
  public paginaActual: number = 1; // Página actual
  private totalRegistros: number = 5;
  public mostrarInfo: boolean = false;
  public isDesktop: boolean = false;
  listGroup: boolean = false;
  expandedItemId: number | null = null;
  public editContact: boolean = false;

  constructor(
    private ConsultasService: ConsultasService,
    private FechaService: FechaService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private user: UsersService,
    private _location: Location,
    private pt: PacientesService,
    private au: UisauService
  ) { }

  p: Ipaciente = {
    id: 0,
    expediente: 0,
    nombre: "",
    apellido: "",
    dpi: 0,
    pasaporte: "",
    sexo: "",
    nacimiento: new Date(),
    nacionalidad: 1,
    lugar_nacimiento: 0,
    estado_civil: 0,
    educacion: 0,
    pueblo: 0,
    idioma: 0,
    ocupacion: "",
    direccion: "",
    telefono: "",
    email: "user@example.com",
    padre: "",
    madre: "",
    responsable: "",
    parentesco: 0,
    dpi_responsable: 0,
    telefono_responsable: 0,
    estado: "v",
    exp_madre: 0,
    created_by: '',
    fechaDefuncion: "",
    hora_defuncion: "",
    municipio: 0,
    created_at: "",
    update_at: "",
    depto: 0,
    gemelo: '',
    depto_nac: 0,
    conyugue: '',
    exp_ref: null
  };

  ngOnInit() {
    this.fechaActual = this.FechaService.FechaActual();
    this.horaActual = this.FechaService.HoraActual();
    this.fechaRecepcion = this.FechaService.registroTiempo();
    this.fechaEgreso = this.FechaService.FechaActual();
    const currentDate = new Date().toISOString().split('T')[0];
    this.maxdate = currentDate;

    this.verificarPantalla();

    const params = this.activateRoute.snapshot.params;
    if (params['id']) {
      this.ConsultasService.Consulta(params['id']).subscribe(
        consulta => {
          this.consulta = consulta;
          this.view = true;
          // Ahora se hace la consulta para la información adicional de la consulta
          this.au.InfoConsulta(this.consulta?.id).subscribe(
            infoConsulta => {
              if (infoConsulta && Array.isArray(infoConsulta)) {
                this.infos_ = infoConsulta.sort((a: { id: number; }, b: { id: number; }): number => b.id - a.id);
                this.resumen = infoConsulta;
              } else {
                console.error('Info consulta no válida:', infoConsulta);
              }
            },
            error => {
              console.error('Error al obtener la información de la consulta:', error);
            }
          );

          // Obtener datos del paciente
          this.pt.getPaciente(this.consulta?.expediente).subscribe(
            pacienteData => {
              this.paciente = pacienteData;
            },
            error => {
              console.error('Error al obtener el paciente:', error);
            }
          );
        },
        error => {
          console.error('Error al obtener la consulta:', error);
        }
      );
    }
    this.paginar();
  }

  regresar() {
    this._location.back();
  }

  onPageChange(pageNumber: number) {
    this.paginaActual = pageNumber;
    this.paginar();
  }

  paginar() {
    const indiceInicio = (this.paginaActual - 1) * this.totalRegistros;
    const indiceFin = indiceInicio + this.totalRegistros;
    this.resumen = this.infos_.slice(indiceInicio, indiceFin);
  }

  getPaginas(): number[] {
    const totalPaginas = this.totalPaginas();
    return totalPaginas > 0 ? Array.from({ length: totalPaginas }, (_, index) => index + 1) : [];
  }

  totalPaginas(): number {
    return Math.ceil(this.resumen.length / this.totalRegistros);
  }

  @HostListener('window:resize', [])
  verificarPantalla() {
    this.isDesktop = window.innerWidth >= 768;
    this.mostrarInfo = this.isDesktop;
  }

  handleMostrarData(itemId: number) {
    this.expandedItemId = this.expandedItemId === itemId ? null : itemId;
  }

  editarTelefono() {
    if (!this.paciente?.expediente) {
      console.warn('No se puede actualizar el teléfono: expediente no definido.');
      return;
    }

    this.pt.telefono(this.paciente?.expediente, this.p)
      .subscribe({
        next: (data) => {
          if (data) {
            this.p = data;
            console.log('Teléfono actualizado correctamente:', data);
          } else {
            console.warn('La respuesta de la API no contiene datos válidos.');
          }
        },
        error: (err) => {
          console.error('Error al actualizar el teléfono:', err);
        }
      });
  }

  updateTel() {
    this.p.telefono = this.paciente?.telefono || '';
    this.editContact = true;
  }

}





