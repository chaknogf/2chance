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
  public citasPedia: Icitas[] = [];
  public citasTrauma: Icitas[] = [];
  public citasCiru: Icitas[] = [];
  public citasGine: Icitas[] = [];
  public citasObst: Icitas[] = [];
  public citasPsico: Icitas[] = [];
  public citasNutri: Icitas[] = [];
  public citasHoy: Icitas[] = [];
  public citasMedi: Icitas[] = [];
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
      this.citasMedi;
      this.citasPedia;
      this.citasTrauma;
      this.citasGine;
      this.citasCiru;
      this.citasNutri;
      this.citasObst;
      this.x = `${this.year}-${this.month}-${this.day}`;
      this.citasmedicina(this.x);
      this.citaspedia(this.x);
      this.citaciru(this.x);
      this.citapsico(this.x);
      this.citastrauma(this.x);
      this.citagine(this.x);
      this.citanutri(this.x);
      this.citaobst(this.x);




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
        this.citasMedi = [];
        this.citasPedia = [];
        this.citasTrauma = [];
        this.citasCiru = [];
        this.citasGine = [];
        this.citasPsico = [];
        this.citasNutri = [];
        this.citasObst = [];

        // Llama a las funciones para actualizar los datos de las citas
        this.citasmedicina(this.x);
        this.citaspedia(this.x);
        this.citaciru(this.x);
        this.citapsico(this.x);
        this.citastrauma(this.x);
        this.citagine(this.x);
        this.citanutri(this.x);
        this.citaobst(this.x);
        console.log(this.citas)
      } else {
        // Los valores ingresados no son válidos, puedes manejar esto de acuerdo a tus necesidades
        this.citasMedi = [];
        this.citasPedia = [];
        this.citasTrauma = [];
        this.citasCiru = [];
        this.citasGine = [];
        this.citasPsico = [];
        this.citasNutri = [];
        this.citasObst = [];
      }
    }




  citasmedicina(fecha:string) {
    this.CitasService.getCitaMedi(fecha).subscribe(data => {
      this.citasMedi = data;
      this.citas = data;
    })
  }
  citaspedia(fecha:string) {
    this.CitasService.getCitaPedia(fecha).subscribe(data => {
      this.citasPedia = data;
      this.citas = data;
    })
  }

  citastrauma(fecha:string) {
    this.CitasService.getCitaTrauma(fecha).subscribe(data => {
      this.citasTrauma = data;
      this.citas = data;
    })
  }
  citaciru(fecha:string) {
    this.CitasService.getCitaCiru(fecha).subscribe(data => {
      this.citasCiru = data;
      this.citas = data;
    })
  }

  citagine(fecha:string) {
    this.CitasService.getCitaGine(fecha).subscribe(data => {
      this.citasGine = data;
      this.citas = data;
    })
  }

  citapsico(fecha:string) {
    this.CitasService.getCitaPsico(fecha).subscribe(data => {
      this.citasPsico = data;
      this.citas = data;
    })
  }

  citanutri(fecha:string) {
    this.CitasService.getCitaNutri(fecha).subscribe(data => {
      this.citasNutri = data;
      this.citas = data;
    })
  }

  citaobst(fecha:string) {
    this.CitasService.getCitaObst(fecha).subscribe(data => {
      this.citasObst = data;
      this.citas = data;
    })
  }

  regresar(){
    this.router.navigate(['/coex']);
  }


}

