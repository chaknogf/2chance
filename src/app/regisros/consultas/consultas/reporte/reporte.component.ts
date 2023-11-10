import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Iconcultas } from 'src/app/models/Iconsultas';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  public detalleVisible: boolean = false;
  public consult: Iconcultas | undefined;

  constructor(
    private ConsultasService: ConsultasService,
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
