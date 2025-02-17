import { Ienum, deptos } from 'src/app/models/Ienum';
import { PacientesService } from '../../../services/pacientes.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { ActivatedRoute, Router } from '@angular/router';
import { FechaService } from 'src/app/services/fecha.service';
import { etnias, ecivil, academic, parents, lenguaje, servicio, servicios, nation } from 'src/app/enums/enums';
import { municipio, departamentos } from 'src/app/enums/vencindad';
import { UsersService } from 'src/app/services/user.service';
import { Location } from '@angular/common';


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
  public username = this.user.getUsernameLocally()
  //Variables para el expediente
  public nuevoExp: number = 0;



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
  d: deptos = {
    departamentos: departamentos
  }



  edit: boolean = false;
  modal: boolean = true;
  traslado: boolean = false
  isDead: boolean = false; // Variable para el estado de fallecido (checkbox)
  modalService: any;



  constructor(
    public PacientesService: PacientesService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private fecha: FechaService,
    private user: UsersService,
    private _location: Location,
  ) { }





  ngOnInit() {

    this.p.created_by = this.username;

    // Obtener los parámetros de la ruta
    const params = this.activateRoute.snapshot.params;

    // Verificar si se proporcionó un ID de paciente
    if (params['id']) {
      this.PacientesService.getIdPaciente(params['id'])
        .subscribe(
          data => {
            this.p = data;
            this.edit = true;
            this.modal = false;
            this.munisFiltrados = this.e.municipio.filter(muni => muni.depto == this.p.depto_nac);
            this.municipiosFiltrados = this.e.municipio.filter(muni => muni.depto == this.p.depto);


          },
          error => console.log(error)
        )
    }


  }

  crearPaciente(): void {
    // Crear un nuevo paciente
    this.PacientesService.crearPaciente(this.p).subscribe(data => {
      this.p = data;
      console.log(data);
      this.regresar()
    })
  }

  traslado_exp() {
    const idPacienteViejo = this.p.id;
    this.crearPaciente();
    this.depurado(idPacienteViejo);
  }

  editar() {
    // Editar el paciente existente
    this.PacientesService.editPaciente(this.p.expediente, this.p)
      .subscribe(data => {
        this.p = data;
        this.regresar()
      })
  }

  back(): void {
    this.router.navigate(['/pacientes']);
  }

  depurado(id: number) {
    this.PacientesService.deletePaciente(id).subscribe(data => {
      this.pacientes = data;
      this.back();

    })
  }

  delete() {
    const confirmacion = confirm('¿Estás seguro de Eliminar al Paciente?');
    if (confirmacion) {
      this.PacientesService.deletePaciente(this.p.id)
        .subscribe(data => {
          this.pacientes = data;
          this.back();
        },
          error => {
            console.error('Error al eliminar paciente:', error);
          }
        );
    }
  }

  exp = this.NuevoExp()

  NuevoExp() {

    // Obtener el expediente del paciente inicialmente
    this.PacientesService.Expediente().subscribe(data => {
      if (this.edit == false) {
        this.nuevoExp = data;
        this.p.expediente = this.nuevoExp;

      }
    });


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

  regresar() {
    this._location.back();


  }

  municipiosFiltrados: any[] = []; // Lista de municipios filtrados

  filtrarMunicipios() {
    // Filtrar la lista de municipios basándote en el departamento seleccionado
    this.municipiosFiltrados = this.e.municipio.filter(muni => muni.depto == this.p.depto);
    console.log(this.municipiosFiltrados, this.p.depto)
  }

  munisFiltrados: any[] = []; // Lista de municipios filtrados
  deptoNac: number = this.p.depto_nac;

  filtrarMunis() {
    // Filtrar la lista de municipios basándote en el departamento seleccionado
    this.munisFiltrados = this.e.municipio.filter(muni => muni.depto == this.p.depto_nac);

    console.log(this.municipiosFiltrados, this.p.depto_nac)
  }

  ActualizarTraslado(id: number) {
    this.PacientesService.trasladar(id, this.p)
      .subscribe(data => {
        this.p = data;

      })
  }

  CamposTrasladados() {
    this.traslado = true;
    this.p.exp_ref = this.p.expediente;
    this.PacientesService.Expediente().subscribe(data => {
      if (this.traslado == true) {
        this.nuevoExp = data;
        this.p.expediente = this.nuevoExp;
        console.log(this.p.expediente);

      }
    });
  }

  // Método que muestra el alert de confirmación
  confirmarCambio() {
    const confirmacion = confirm('¿Desea realizar el cambio?');
    if (confirmacion) {
      this.CamposTrasladados();
      this.edit = false;
    }

  }

  confirmarBorrar() {
    const confirmacion = confirm('¿Desea Borrar el Expediente?');
    if (confirmacion) {
      this.delete();
    }
  }


  closeModal() {
    this.modalService.dismissAll();
  }


}
