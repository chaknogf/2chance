import { Ienum } from 'src/app/models/Ienum';
import { PacientesService } from './../../services/pacientes.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { nacionalidades } from 'src/app/enums/enums';
import { municipio } from 'src/app/enums/enums';
import { etnias } from 'src/app/enums/enums';
import { ecivil } from 'src/app/enums/enums';
import { academic } from 'src/app/enums/enums';
import { parents } from 'src/app/enums/enums';
import { lenguaje } from 'src/app/enums/enums';

//import { FortmatPhone } from 'src/app/pipe/telefono.pipe';

@Component({
  selector: 'formulario-paciente',
  templateUrl: './formulario-paciente.component.html',
  styleUrls: ['./formulario-paciente.component.css']
})
export class FormularioPacienteComponent implements OnInit {

  public pacientes: Ipaciente[] = [];
  public selectdate: string = '';
  public maxdate: string = '';

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
    user: "admin",
    fechaDefuncion: "",  // Variable para la fecha de defunción
    municipio: "",
    nation: "",
    people: "",
    ecivil: "",
    academic: "",
    parents: "",
    lenguage: ""

  };
  e: Ienum = {
    municipio: municipio,
    nation: nacionalidades,
    people: etnias,
    ecivil: ecivil,
    academic: academic,
    parents: parents,
    lenguage: lenguaje,


  }


  edit: boolean = false;
  isDead: boolean = false; // Variable para el estado de fallecido (checkbox)

  constructor(public PacientesService: PacientesService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {

    // Obtiene la fecha actual en el formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];
    this.maxdate = currentDate;
    // Obtener el expediente del paciente
    //this.NuevoExp()


    // Obtener los parámetros de la ruta
    const params = this.activateRoute.snapshot.params;

    // Verificar si se proporcionó un ID de paciente
    if (params['id']) {
      this.PacientesService.getIdPaciente(params['id'])
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

        // this.router.navigate(['/pacientes']);
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
