import { ConsultasService } from './../../services/consultas.service';
import { Component, OnInit } from '@angular/core';
import { IenumEspecialidad } from 'src/app/models/Ienum';
import { servicio } from './../../enums/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'coex',
  templateUrl: './coex.component.html',
  styleUrls: ['./coex.component.css']
})
export class CoexComponent implements OnInit {

  day: string = new Date().getDate().toString().padStart(2, '0');
  month: string = (new Date().getMonth()+1).toString().padStart(2, '0');
  year: string = new Date().getFullYear().toString();
  today: string = "";
  public x: string = this.today;
  public pacientes: [] = [];
  public citas: [] = [];
  public citasPedia: [] = [];
  public citasTrauma: [] = [];
  public citasCiru: [] = [];
  public citasGine: [] = [];
  public citasPsico: [] = [];
  public citasNutri: [] = [];
  public citasHoy: [] = [];
  public citasMedi: [] = [];
  public contador: number = 0;
  public expedienteBuscar: any = '';
  public nombreBuscar: string = '';
  public apellidoBuscar: string = '';
  public dpiBuscar: any = '';


  e: IenumEspecialidad = {
    servicio: servicio
  }
  constructor(private pacientesService: PacientesService, ConsultasService: ConsultasService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
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

      // Llama a las funciones para actualizar los datos de las citas
      // this.citasmedicina(this.x);
      // this.citaspedia(this.x);
      // this.citaciru(this.x);
      // this.citapsico(this.x);
      // this.citastrauma(this.x);
      // this.citagine(this.x);
    } else {
      // Los valores ingresados no son válidos, puedes manejar esto de acuerdo a tus necesidades

    }
  }

  buscarPacientes() {
    // if (this.expedienteBuscar !== 0) {
    //   this.pacientesService.getPaciente(this.expedienteBuscar).subscribe(data => {
    //     if (data) {
    //       this.pacientes = [data]; // Establece el arreglo de pacientes para mostrar solo el resultado de la búsqueda
    //       this.paginarPacientes(); // Pagina los resultados
    //     } else {
    //       // No se encontró ningún paciente con el número de expediente proporcionado
    //       this.pacientes = [];
    //       this.filteredPacientes = [];
    //       this.totalRegistros = 0;
    //     }
    //   });
    // } else {
    //   // ExpedienteBuscar es 0 o un valor inválido, muestra todos los pacientes
    //   this.getPacientes();
    // }
  }


}
