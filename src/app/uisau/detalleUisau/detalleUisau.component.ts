import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { Location } from '@angular/common';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Ipaciente } from 'src/app/models/Ipaciente';


@Component({
  selector: 'app-detalleUisau',
  templateUrl: './detalleUisau.component.html',
  styleUrls: ['./detalleUisau.component.css']
})
export class DetalleUisauComponent implements OnInit {
  public detalleVisible: boolean = false;
  public consult: Iconcultas | undefined;
  public patient: Ipaciente | undefined;
  public rutaAnterior: string = '../';

  constructor(
    private ConsultasService: ConsultasService,
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
        this.ConsultasService.Consulta(id).subscribe(data => {
          this.consult = data;
          this.detalleVisible = true;
        });
      }
    });
  }

}
