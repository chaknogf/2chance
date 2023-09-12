import { CitasService } from './../../services/citas.service';
import { servicio } from './../../enums/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Icitas, IVistaCitas } from 'src/app/models/Icitas';
import { IenumEspecialidad } from 'src/app/models/Ienum';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-cita',
  templateUrl: './formCita.component.html',
  styleUrls: ['./formCita.component.css']
})
export class FormCitaComponent implements OnInit {

  public cita: Icitas[] = [];
  public resumen: IVistaCitas[] = [];
  @HostBinding('class') clases = 'row';
  selectedDate: Date | null = null; // Declaración de la propiedad selectedDate
  bsConfig = { dateInputFormat: 'DD-MM-YYYY' };
  edit: boolean = false;
  selectExpediente: any;
  hoy: string = new Date().getDate().toString()

  c: Icitas = {
    id: 0,
    expediente: 0,
    fecha: new Date,
    especialidad: 0,
    cirugia_programada: null,
    nota: '',
    estado: false,
    name: ''
  }
  e: IenumEspecialidad = {
    servicio: servicio
  }

  constructor (public CitasService: CitasService,  private router: Router,
    private activateRoute: ActivatedRoute, private formBuilder: FormBuilder ){}


  ngOnInit() {
    // const params = this.activateRoute.snapshot.params;

    // Obtener los parámetros de la ruta
    const params = this.activateRoute.snapshot.params;

    // Verificar si se proporcionó un ID de paciente
    if (params['id']) {
      this.CitasService.getCita(params['id'])
        .subscribe(
          data => {
            this.c = data;
            this.edit = true;
          },
          error => console.log(error)
        )
    }
    this.resumen;

  }

  crearCita(): void {
    this.CitasService.agendar(this.c).subscribe(data => {
      this.c = data;
      console.log(this.c)
      this.router.navigate(['/citas']);
    })
  }

  editar() {
    this.CitasService.editarCita(this.c.id, this.c)
      .subscribe(data => {
        this.c = data;
        this.router.navigate(['/citas'])
    })
  }



  verResumen(especiliadad: number) {
    this.CitasService.getResumenCitas(especiliadad).subscribe(data => {
      this.resumen = data;
    })
  }



  selectAllText(event: any) {
    event.target.select(); // Selecciona todo el texto en el input
  }

 // Método para manejar el cambio en la fecha seleccionada
 onDateChange(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const inputValue = inputElement.value;

  if (inputValue) {
    this.selectedDate = new Date(inputValue); // Convierte la cadena en un objeto Date
  } else {
    this.selectedDate = null; // Establece selectedDate en null si no hay valor
  }
 }









}
