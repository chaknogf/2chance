import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-citas', // Asegúrate de usar el selector correcto aquí
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  today: Date = new Date();
  whatsDate: Date = new Date();


  getDayOfWeek(date: Date): string {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }

    ngOnInit(): void {
    this.getDayOfWeek(this.whatsDate)
   }

}


//select expediente from citas where especialidad = trauma;
