import { Component, OnInit } from '@angular/core';
import { IconsNac } from 'src/app/models/IconsNac';
@Component({
  selector: 'app-form-nac',
  templateUrl: './form-nac.component.html',
  styleUrls: ['./form-nac.component.css']
})
export class FormNacComponent implements OnInit {

  constructor() { }

  cNac: IconsNac = {
    id: 0,
    fecha: '',
    cor: null,
    año: null,
    doc: null,
    fecha_parto: null,
    madre: null,
    dpi: null,
    passport: null,
    libro: null,
    folio: null,
    partida: null,
    muni: null,
    edad: null,
    vecindad: null,
    sexo_rn: null,
    lb: null,
    onz: null,
    hora: null,
    medico: null,
    colegiado: null,
    dpi_medico: null,
    hijos: null,
    vivos: null,
    muertos: null,
    tipo_parto: null,
    clase_parto: null,
    certifica: null
  }

  ngOnInit() {
  }

}
