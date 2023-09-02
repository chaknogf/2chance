import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Ipaciente } from 'src/app/models/Ipaciente';

@Component({
  selector: 'buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  public detalleVisible: boolean = false;
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
