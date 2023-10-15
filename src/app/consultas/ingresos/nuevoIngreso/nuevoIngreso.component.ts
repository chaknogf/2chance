import { FechaService } from '../../../services/fecha.service';
import { servicio } from '../../../enums/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { IenumEspecialidad } from 'src/app/models/Ienum';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Asegúrate de importar NgbModal


@Component({
  selector: 'nuevoIngreso',
  templateUrl: './nuevoIngreso.component.html',
  styleUrls: ['./nuevoIngreso.component.css']
})
export class NuevoIngresoComponent implements OnInit {

  public resumen: Iconcultas[] = [];
  public paciente: Ipaciente | undefined;
  edit: boolean = false;
  new: boolean = false;
  fechaActual: string = "";
  horaActual: string = "";
  idCopiado: number = 0;
  mostrarModal = false;


  ingreso: Iconcultas = {
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
    acompa: null,
    parente: null,
    telefono: "",
    especialidad: 0,
    servicio: null,
    recepcion: false,
    fecha_recepcion: "",
    fecha_egreso: "",
    tipo_consulta: 2,
    nota: "",
    name: "",
    lastname: "",

   }
   e: IenumEspecialidad = {
     servicio: servicio
   }

  constructor(
    private modalService: NgbModal,
    private ConsultasService: ConsultasService,
    private PacientesService: PacientesService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private fechaService: FechaService) { }

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
              this.ingreso = data;
              this.new = true;
            },
            error => console.log(error)
          )
      }
      this.resumen;
    }

    recibirId(id: number) {
      this.idCopiado = id;
    }
    // Cuando se copia el valor al campo "Expediente"
    // Esta función manejará la lógica para mostrar el modal
    mostrarModalDespuesDeCopiar() {
      // Aquí puedes realizar cualquier validación o lógica que desees
      if (this.idCopiado) {
        this.mostrarModal = true; // Muestra el modal si se ha copiado un valor al campo "Expediente"
        // this.abrirModal(); // Abre el modal
      }
      console.log(this.idCopiado, this.mostrarModal)
    }

    // abrirModal() {
    //   // Usa el servicio NgbModal para abrir el modal
    //   this.modalService.open('formularioCrear', { centered: true }); // Reemplaza 'myModal' con el ID correcto de tu modal
    // }

  }
