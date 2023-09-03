import { Component, OnInit } from '@angular/core';
import { CitasService } from 'src/app/services/citas.service';
import { Icitas } from 'src/app/models/Icitas';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-citas', // Asegúrate de usar el selector correcto aquí
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  today: Date = new Date();
  selectDate: Date = new Date();
  public citas: Icitas[] = [];
  public filterCitas: Icitas[] = [];





  constructor(private CitasService: CitasService, private router: Router, private activateRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.mostrarCitas(this.selectDate)
   }

  mostrarCitas(value: Date) {
    this.CitasService.getCitasFecha(value).subscribe(data => {
      this.citas = data;
      this.filterCitas = data;
    })
  }




}

