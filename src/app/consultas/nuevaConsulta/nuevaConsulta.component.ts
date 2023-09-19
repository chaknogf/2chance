import { FechaService } from './../../services/fecha.service';
import { servicio } from './../../enums/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, HostBinding } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { IenumEspecialidad } from 'src/app/models/Ienum';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Iconcultas } from 'src/app/models/Iconsultas';


@Component({
  selector: 'nuevaConsulta',
  templateUrl: './nuevaConsulta.component.html',
  styleUrls: ['./nuevaConsulta.component.css']
})
export class NuevaConsultaComponent implements OnInit {

  public resumen: Iconcultas[] = [];
  edit: boolean = false;
  new: boolean = false;
  fechaActual: string = "";
  horaActual: string = "";
  idCopiado: number = 0;

  coex: Iconcultas = {
   id: 0,
   hoja_emergencia: null,
   expediente: null,
   fecha_consulta: this.fechaActual,
   hora: this.horaActual,
   nombre: "",
   apellidos: "",
   nacimiento: "",
   edad: "",
   sexo: "",
   dpi: "",
   direccion: "",
   acompa: "",
   telefono: "",
   especialidad: 0,
   recepcion: false,
   fecha_recepcion: "",
   fecha_egreso: "",
   tipo_consulta: 1,
   nota: "",
   name: "",
   lastname: "",

  }

  constructor(private ConsultasService: ConsultasService, private PacientesService: PacientesService, private router: Router,
    private activateRoute: ActivatedRoute, private formBuilder: FormBuilder,private fechaService: FechaService ) { }

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
            this.coex = data;
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

}
