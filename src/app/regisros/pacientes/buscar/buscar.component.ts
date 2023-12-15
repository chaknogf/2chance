import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,} from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { Location } from '@angular/common';




@Component({
  selector: 'buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  public detalleVisible: boolean = false;
  public patient: Ipaciente | undefined;
  public rutaAnterior: string = '../';

  constructor(
    private pacientesService: PacientesService,
    private route: ActivatedRoute,
    private _location: Location

  ) { }

  regresar(){
    this._location.back();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const id = +idParam;
        this.pacientesService.getIdPaciente(id).subscribe(data => {
          this.patient = data;
          console.table(this.patient, data)
          this.detalleVisible = true;
        });
      }
    });
  }
}
