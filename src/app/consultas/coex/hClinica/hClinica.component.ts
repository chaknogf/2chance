import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { FechaService } from 'src/app/services/fecha.service';

@Component({
  selector: 'hClinica',
  templateUrl: './hClinica.component.html',
  styleUrls: ['./hClinica.component.css']
})
export class HClinicaComponent implements OnInit {
  public detalleVisible: boolean = false;
  public patient: Ipaciente | undefined;
  public fechaActual: string = "";
  public horaActual: string = "";

  constructor(
    private pacientesService: PacientesService,
    private route: ActivatedRoute,
    private fechaService: FechaService,

  ) { }

  ngOnInit() {
    this.fechaActual = this.fechaService.FechaActual();
    this.horaActual= this.fechaService.HoraActual();

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
