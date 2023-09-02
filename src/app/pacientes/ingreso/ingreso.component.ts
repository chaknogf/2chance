import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Ipaciente } from 'src/app/models/Ipaciente';

@Component({
  selector: 'ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent {public detalleVisible: boolean = false;
  public patient: Ipaciente | undefined;

  constructor(
    private pacientesService: PacientesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const id = +idParam;
        this.pacientesService.getIdPaciente(id).subscribe(data => {
          this.patient = data;
          this.detalleVisible = true;
        });
      }
    });
  }
}
