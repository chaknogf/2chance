import { PageReloadService } from '../../../services/PageReload.service';
import {  Ienum } from 'src/app/models/Ienum';
import { nation, municipio, etnias, ecivil, academic, parents, lenguaje, servicio, servicios } from 'src/app/enums/enums';
import { PacientesService } from '../../../services/pacientes.service';
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/user.service';


@Component({
  selector: 'crearModal',
  templateUrl: './crearModal.component.html',
  styleUrls: ['./crearModal.component.css']
})
export class CrearModalComponent implements OnInit {
  public pacientes: Ipaciente[] = [];
  public selectdate: string = '';
  public maxdate: string = '';
  public username = this.user.getUsernameLocally()
  @HostBinding('class') clases = 'row';

  // Objeto del paciente
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
    municipio: "",
    nation: "",
    people: "",
    ecivil: "",
    academic: "",
    parents: "",
    lenguage: "",
    created_at: "",
    update_at: ""
  };
  e: Ienum = {
    municipio: municipio,
    nation: nation,
    people: etnias,
    ecivil: ecivil,
    academic: academic,
    parents: parents,
    lenguage: lenguaje,
    servicio: servicio,
    servicios: servicios,


  }


  edit: boolean = false;
  isDead: boolean = false; // Variable para el estado de fallecido (checkbox)

  @Input() idPaciente: number | undefined

  constructor(
    public PacientesService: PacientesService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private pageReload: PageReloadService,
    private user: UsersService,
    ) { }

  ngOnInit() {

    this.p.created_by = this.username;
     // Obtiene la fecha actual en el formato YYYY-MM-DD
     const currentDate = new Date().toISOString().split('T')[0];
     this.maxdate = currentDate;


    // Obtener el expediente del paciente
    //this.NuevoExp()


    // Obtener los parámetros de la ruta
    const params = this.activateRoute.snapshot.params;

    // Verificar si se proporcionó un ID de paciente
    if (params['idPaciente']) {
      this.PacientesService.getIdPaciente(params['idPaciente'])
        .subscribe(
          data => {
            this.p = data;
            this.edit = true;
          },
          error => console.log(error)
        )
    }
  }

  crearPaciente(): void {
    // Crear un nuevo paciente
    this.PacientesService.crearPaciente(this.p).subscribe(data => {
      this.p = data;
      this.pageReload.reloadPage()


      })
  }

  editar() {
    // Editar el paciente existente
    this.PacientesService.editPaciente(this.p.expediente, this.p)
      .subscribe(data => {
        this.p = data;
        this.router.navigate(['/pacientes']);
      })
  }

  delete() {
    const confirmacion = confirm('¿Estás seguro de Eliminar al Paciente?');
    if (confirmacion) {
      this.PacientesService.deletePaciente(this.p.id)
        .subscribe(data => {
          this.pacientes = data;
          this.ngOnInit();// Actualizar la vista (si es necesario)
        },
          error => {
            console.error('Error al eliminar paciente:', error);
          }
        );
    }
  }
  //Variables para el expediente
  public nuevoExp: number = 0;
  exp = this.NuevoExp()

  NuevoExp() {
    // Obtener el expediente del paciente inicialmente
    this.PacientesService.Expediente().subscribe(data => {
      if (this.edit == false) {
        this.nuevoExp = data;
        this.p.expediente = this.nuevoExp;
      }
    });

    // Actualizar el expediente cada 3 segundos
    // interval(3000).subscribe(() => {
    //   this.PacientesService.Expediente().subscribe(data => {
    //     this.nuevoExp = data;
    //     this.p.expediente = this.nuevoExp;
    //   });
    // });
  }



  cambiarEstado() {

    // const confirmacion = confirm('¿Estás seguro de cambiar el estado?');
    // if (confirmacion) {
      if (this.p.estado === 'm') {
        this.p.estado = 'v';
      } else {
        this.p.estado = 'm';
        this.p.fechaDefuncion = ""; // Asignar la fecha actual como fecha de defunción
      }
    // }
  }

  formatPhoneNumber(inputValue: string) {
    const numericAndSpaceValue = inputValue.replace(/[^\d\s]/g, '');
    const formattedValue = numericAndSpaceValue.replace(/(\d{8})(?=\d)/g, '$1 ');
    this.p.telefono = formattedValue;
  }



}
