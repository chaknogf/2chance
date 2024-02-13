import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/medico.service';
import { Imedico } from 'src/app/models/Imedico';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  constructor(
    private medicSer: MedicoService,

  ) { }

  public resumen: Imedico[] = []

  medicoM: Imedico = {
    id: 0,
    colegiado: 0,
    name: null,
    dpi: undefined,
    especialidad: null
  }



  ngOnInit() {

    this.medicSer.getMedicos().subscribe(data => {
      this.resumen = data;
    })

  }

}
