import { FechaService } from 'src/app/services/fecha.service';
import { ConsultasService } from '../../../../services/consultas.service';
import { Component, OnInit } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { ActivatedRoute } from '@angular/router';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { Iconcultas } from 'src/app/models/Iconsultas';

@Component({
  selector: 'ingresoH',
  templateUrl: './ingresoH.component.html',
  styleUrls: ['./ingresoH.component.css']
})
export class IngresoHComponent implements OnInit {

  public detalleVisible: boolean = false;
  public patient: Ipaciente | undefined;
  public consulta: Iconcultas | undefined;
  public fechaActual: string = "";
  public horaActual: string = "";

  constructor(
    private pacientesService: PacientesService,
    private consultasService: ConsultasService,
    private fechaService: FechaService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.fechaActual = this.fechaService.FechaActual();
    this.horaActual = this.fechaService.HoraActual();

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const id = +idParam;
        this.consultasService.Consulta(id).subscribe(data => {
          this.consulta = data;
          this.detalleVisible = true;
          this.pacientesService.getPaciente(this.consulta?.expediente)
            .subscribe(
              data => {
                this.patient = data;
            }
          )
        });
      }
    });



  }

  imprimir() {

    window.print();
  }

}
