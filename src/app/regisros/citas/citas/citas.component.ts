import { Component, OnInit } from '@angular/core';
import { CitasService } from 'src/app/services/citas.service';
import { Icitas } from 'src/app/models/Icitas';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-citas', // Asegúrate de usar el selector correcto aquí
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  today: string = "";
  selectDate: Date = new Date();
  public citas: Icitas[] = [];
  public citas_medicina_consulta: Icitas[] = [];
  public citas_medicina_preop: Icitas[] = [];
  public citas_medicina_especial: Icitas[] = [];
  public citas_pedia_consulta: Icitas[] = [];
  public citas_gine_consulta: Icitas[] = [];
  public citas_gine_preop: Icitas[] = [];
  public citas_gine_usg_obs: Icitas[] = [];
  public citas_gine_usg_pel: Icitas[] = [];
  public citas_gine_colpo: Icitas[] = [];
  public citas_gine_especial: Icitas[] = [];
  public citas_ciru_consulta: Icitas[] = [];
  public citas_trauma_consulta: Icitas[] = [];
  public citas_nutricion_consulta: Icitas[] = [];
  public citas_psicologia_consulta: Icitas[] = [];









  public x: string = this.today;
  public y: number = 0;
  public contador: number = 0;
  public rutaAnterior: string = '../';
  // const currentDate = new Date().getDate();
  day: string = new Date().getDate().toString().padStart(2, '0');
  month: string = (new Date().getMonth()+1).toString().padStart(2, '0');
  year: string = new Date().getFullYear().toString();
  slectDay: string = '';
  slectMonth: string = '';
  slectYear: string = '';

  constructor(
    private CitasService: CitasService,
    private _location: Location,
    private activateRoute: ActivatedRoute,
    private router: Router,
  ) { }



  ngOnInit(): void {
      this.citas;

      this.x = `${this.year}-${this.month}-${this.day}`;
      this.medicina_consulta(this.x);
      this.medicina_preop(this.x);
      this.medicina_especial(this.x);
      this.pedia_consulta(this.x);
      this.gine_consulta(this.x);
      this.gine_preop(this.x);
      this.gine_usgObs(this.x);
      this.gine_usgPel(this.x);
      this.gine_colpo(this.x);
      this.gine_especial(this.x);
      this.ciru_consulta(this.x);
      this.trauma_consulta(this.x);
      this.nutri_consulta(this.x);
      this.psico_consulta(this.x);



    }

    updateDate() {
      // Convierte los valores de día, mes y año a números enteros
      const dayInt = parseInt(this.day, 10);
      const monthInt = parseInt(this.month, 10);
      const yearInt = parseInt(this.year, 10);

      // Verifica que los valores sean válidos (por ejemplo, día entre 1 y 31, mes entre 1 y 12, etc.)
      if (dayInt >= 1 && dayInt <= 31 && monthInt >= 1 && monthInt <= 12 && yearInt >= 1900) {
        // Actualiza la fecha si los valores son válidos
        this.x = `${this.year}-${this.month}-${this.day}`;

        //vaciar los arrays
        this.citas_medicina_consulta =[];
        this.citas_medicina_preop = [];
        this.citas_medicina_especial = [];
        this.citas_pedia_consulta = [];
        this.citas_gine_consulta = [];
        this.citas_gine_preop = [];
        this.citas_gine_usg_obs = [];
        this.citas_gine_usg_pel = [];
        this.citas_gine_colpo = [];
        this.citas_gine_especial = [];
        this.citas_ciru_consulta = [];
        this.citas_trauma_consulta = [];
        this.citas_nutricion_consulta = [];
        this.citas_psicologia_consulta = [];

        // Llama a las funciones para actualizar los datos de las citas
        this.medicina_consulta(this.x);
        this.medicina_preop(this.x);
        this.medicina_especial(this.x);
        this.pedia_consulta(this.x);
        this.gine_consulta(this.x);
        this.gine_preop(this.x);
        this.gine_usgObs(this.x);
        this.gine_usgPel(this.x);
        this.gine_colpo(this.x);
        this.gine_especial(this.x);
        this.ciru_consulta(this.x);
        this.trauma_consulta(this.x);
        this.nutri_consulta(this.x);
        this.psico_consulta(this.x);

        console.log(this.citas)
      } else {
        // Los valores ingresados no son válidos, puedes manejar esto de acuerdo a tus necesidades
        this.citas_medicina_consulta =[];
        this.citas_medicina_preop = [];
        this.citas_medicina_especial = [];
        this.citas_pedia_consulta = [];
        this.citas_gine_consulta = [];
        this.citas_gine_preop = [];
        this.citas_gine_usg_obs = [];
        this.citas_gine_usg_pel = [];
        this.citas_gine_colpo = [];
        this.citas_gine_especial = [];
        this.citas_ciru_consulta = [];
        this.citas_trauma_consulta = [];
        this.citas_nutricion_consulta = [];
        this.citas_psicologia_consulta = [];

      }
    }


  citasTabla(fecha: string, tipo: number, especialidad: number) {
    this.CitasService.getCitaTabla(fecha, especialidad, tipo).subscribe(data => {
      this.citas = data;
    })
  }
  psico_consulta(fecha: string) {
    this.CitasService.getCitaTabla(fecha, 6, 1).subscribe(data => {
      this.citas_psicologia_consulta = data;
      this.citas = data;
    })
  }

  nutri_consulta(fecha: string) {
    this.CitasService.getCitaTabla(fecha, 7, 1).subscribe(data => {
      this.citas_nutricion_consulta = data;
      this.citas = data;
    })
  }

  trauma_consulta(fecha: string) {
    this.CitasService.getCitaTabla(fecha, 5, 1).subscribe(data => {
      this.citas_trauma_consulta = data;
      this.citas = data;
    })
  }

  ciru_consulta(fecha: string) {
    this.CitasService.getCitaTabla(fecha, 4, 1).subscribe(data => {
      this.citas_ciru_consulta = data;
      this.citas = data;
    })
  }

  gine_especial(fecha: string) {
    this.CitasService.getCitaTabla(fecha, 3, 9).subscribe(data => {
      this.citas_gine_especial = data;
      this.citas = data;
    })
  }

  gine_colpo(fecha: string) {
    this.CitasService.getCitaTabla(fecha, 3, 4).subscribe(data => {
      this.citas_gine_colpo = data;
      this.citas = data;
    })
  }

  gine_usgPel(fecha: string) {
    this.CitasService.getCitaTabla(fecha, 3, 4).subscribe(data => {
      this.citas_gine_usg_pel = data;
      this.citas = data;
    })
  }

  gine_usgObs(fecha: string) {
    this.CitasService.getCitaTabla(fecha, 3, 3).subscribe(data => {
      this.citas_gine_usg_obs = data;
      this.citas = data;
    })
  }

  gine_preop(fecha: string) {
    this.CitasService.getCitaTabla(fecha, 3, 2).subscribe(data => {
      this.citas_gine_preop = data;
      this.citas = data;
    })
  }

  gine_consulta(fecha: string) {
    this.CitasService.getCitaTabla(fecha, 3, 1).subscribe(data => {
      this.citas_gine_consulta = data;
      this.citas = data;
    })
  }

  pedia_consulta(fecha: string) {
    this.CitasService.getCitaTabla(fecha, 2, 1).subscribe(data => {
      this.citas_pedia_consulta = data;
      this.citas = data;
    })
  }

  medicina_especial(fecha: string) {
    this.CitasService.getCitaTabla(fecha, 1, 9).subscribe(data => {
      this.citas_medicina_especial = data;
      this.citas = data;
    })
  }

  medicina_preop(fecha: string) {
    this.CitasService.getCitaTabla(fecha, 1, 2).subscribe(data => {
      this.citas_medicina_preop = data;
      this.citas = data;
    })
  }

  medicina_consulta(fecha: string) {
    this.CitasService.getCitaTabla(fecha, 1, 1).subscribe(data => {
      this.citas_medicina_consulta = data;
      this.citas = data;
    })
  }




  regresar(){
    this.router.navigate(['/coex']);
  }




}

