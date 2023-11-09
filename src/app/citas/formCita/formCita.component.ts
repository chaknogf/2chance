import { CitasService } from './../../services/citas.service';
import { Ienum } from 'src/app/models/Ienum';
import { nation, municipio, etnias, ecivil, academic, parents, lenguaje, servicio, servicios } from 'src/app/enums/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Icitas, IVistaCitas } from 'src/app/models/Icitas';
import { PageReloadService } from './../../services/PageReload.service';

import { FormBuilder } from '@angular/forms';
import { FechaService } from 'src/app/services/fecha.service';

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

  fechaActual: string = "";

  c: Icitas = {
    id: 0,
    expediente: '',
    fecha: "",
    especialidad: 0,
    cirugia_programada: null,
    nota: '',
    estado: false,
    name: ''
  }
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

  constructor(public CitasService: CitasService,
    private router: Router,
    private fechaService: FechaService,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private PageReloadService: PageReloadService
  ) { }


  ngOnInit() {


    this.fechaActual = this.fechaService.FechaActual();
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
    this.CitasService.agendar(this.c).subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí, si es necesario
        console.log('Consulta creada con éxito', response);

        // Mostrar una alerta de éxito con estilo Bootstrap
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', 'alert-success', 'fixed-top');
        alertDiv.textContent = 'Cita Agendada con éxito';
        document.body.appendChild(alertDiv);
        this.router.navigate(['/citas'])
        // Retrasar la recarga de la página por, por ejemplo, 1 segundo
        setTimeout(() => {
          this.reloadPage();
        }, 2000); // 1000 ms = 1 segundo
      },
      (error) => {
        // Manejar errores aquí
        console.error('Error!! al cita ya estaba registrada o se ha llegado al limite de citas', error);

        // Mostrar una alerta de error con estilo Bootstrap
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', 'alert-danger', 'fixed-top');
        alertDiv.textContent = 'Error!! al cita ya estaba registrada o se ha llegado al limite de citas';
        document.body.appendChild(alertDiv);

        // Retrasar la recarga de la página por, por ejemplo, 1 segundo
        setTimeout(() => {
          this.reloadPage();
        }, 2000); // 1000 ms = 1 segundo


      }
    );

  }

  reloadPage() {
    // Llama al servicio para recargar la página
    this.PageReloadService.reloadPage();
  }



  editar() {
    this.CitasService.editarCita(this.c.id, this.c)
      .subscribe(data => {
        this.c = data;
        this.router.navigate(['/citas'])
    })
  }

  borrar() {
    this.CitasService.borrarCita(this.c.id)
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

 showAlert(message: string) {
  alert(message);
}







}
