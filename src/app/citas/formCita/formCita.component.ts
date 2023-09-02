import { CitasService } from './../../services/citas.service';
import { servicio } from './../../enums/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Icitas } from 'src/app/models/Icitas';
import { IenumEspecialidad } from 'src/app/models/Ienum';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-cita',
  templateUrl: './formCita.component.html',
  styleUrls: ['./formCita.component.css']
})
export class FormCitaComponent implements OnInit {

  public cita: Icitas[] = [];
  @HostBinding('class') clases = 'row';
  selectedDate: Date = new Date();
  bsConfig = { dateInputFormat: 'DD-MM-YYYY' };
  edit: boolean = false;

  c: Icitas = {
    id: 0,
    expediente: 0,
    fecha: new Date,
    especialidad: 0,
    nota: '',
    estado: false,
    nombre: ''
  }
  e: IenumEspecialidad = {
    servicio: servicio
  }

  constructor (public CitasService: CitasService,  private router: Router,
    private activateRoute: ActivatedRoute, private formBuilder: FormBuilder ){}


  ngOnInit() {
    // const params = this.activateRoute.snapshot.params;

    // // Verificar si se proporcionó un ID de paciente
    // if (params['id']) {
    //   this.CitasService.getCitas(params['id'])
    //     .subscribe(
    //       data => {
    //         this.c = data;
    //         this.edit = true;
    //       },
    //       error => console.log(error)
    //     )
    // }


  }

  crearCita(): void {
    this.CitasService.agendar(this.c).subscribe(data => {
      this.c = data;
      this.router.navigate(['/citas']);
    })
  }



  // Declaración del array de citas
  citas = [
    {
      id: 1,
      fecha: '2023-08-10',
      expediente: 'EXP001',
      especialidad: 'Traumatología',
      nota: 'Primera consulta',
      estado: 'Programada'
    },
    {
      id: 2,
      fecha: '2023-08-12',
      expediente: 'EXP002',
      especialidad: 'Cardiología',
      nota: 'Seguimiento',
      estado: 'Programada'
    },
    // Agrega más citas según sea necesario
  ];



  selectAllText(event: any) {
    event.target.select(); // Selecciona todo el texto en el input
  }



}
