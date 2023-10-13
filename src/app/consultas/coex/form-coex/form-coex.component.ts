import { Component, OnInit, HostBinding } from '@angular/core';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultasService } from 'src/app/services/consultas.service';
import { FechaService } from 'src/app/services/fecha.service';
import { IenumEspecialidad } from 'src/app/models/Ienum';
import { servicio } from '../../../enums/enums'

@Component({
  selector: 'form-coex',
  templateUrl: './form-coex.component.html',
  styleUrls: ['./form-coex.component.css']
})
export class FormCoexComponent implements OnInit {


  constructor(
    private ConsultasService: ConsultasService,
    private FechaService: FechaService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,

  ) { }

  public consultas: Iconcultas[] = [];
  public resumen: Iconcultas[] = [];
  public fechaActual: string = this.FechaService.FechaActual();
  public horaActual: string = this.FechaService.HoraActual();
  public fechaRecepcion: string = this.FechaService.registroTiempo();
  edit: boolean = false;
  public selectdate: string = '';
  public maxdate: string = '';



  @HostBinding('class') clases = 'row';

  coex: Iconcultas = {
    id: 0,
    hoja_emergencia: null,
    expediente: null,
    fecha_consulta: "",
    hora: "",
    nombres: "",
    apellidos: "",
    nacimiento: "",
    edad: "",
    sexo: "",
    dpi: null,
    direccion: "",
    acompa: null,
    parente: null,
    telefono: null,
    especialidad: 0,
    recepcion: false,
    fecha_recepcion: this.fechaRecepcion,
    fecha_egreso: null,
    tipo_consulta: 1,
    nota: "",
    name: null,
    lastname: null,


   }

  e: IenumEspecialidad = {
    servicio: servicio
  }

  ngOnInit() {

    // Obtiene la fecha actual en el formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];
    this.maxdate = currentDate;
    // Obtener los parámetros de la ruta
    const params = this.activateRoute.snapshot.params;

    // Verificar si se proporcionó un ID de paciente
    if (params['id']) {
      this.ConsultasService.Consulta(params['id'])
        .subscribe(
          data => {
            this.coex = data;
            this.edit = true;


          },
          error => console.log(error)
        )
    }
    this.resumen;


  }

  onSubmit() {

    this.ConsultasService.editarConsulta(this.coex.id, this.coex)
      .subscribe(data => {
        this.coex = data;
        this.router.navigate(['/coex']);
      })

  }

  changeRecepcion() {
    if (this.coex.recepcion !== true) {
      this.coex.fecha_recepcion = this.fechaRecepcion
    }
    else {
      this.coex.fecha_recepcion = null
    }

  }

}
