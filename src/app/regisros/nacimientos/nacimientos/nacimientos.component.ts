import { PageReloadService } from './../../../services/PageReload.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { FechaService } from 'src/app/services/fecha.service';
import { Location } from '@angular/common';
import { CNacService } from 'src/app/services/c-nac.service';import { IconsNac } from 'src/app/models/IconsNac';
import { MedicoService } from 'src/app/services/medico.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-nacimientos',
  templateUrl: './nacimientos.component.html',
  styleUrls: ['./nacimientos.component.css']
})
export class NacimientosComponent implements OnInit {
  public detalleVisible: boolean = true;
  public patient: Ipaciente | undefined;
  public documetos: IconsNac | undefined;
  public fechaActual: string = "";
  public horaActual: string = "";
  public rutaAnterior: string = '../';
  public e: any = '';
  public pronombre: string = '';
  public certificador: string = '';

  constructor(
    private pacientesService: PacientesService,
    private route: ActivatedRoute,
    private fechaService: FechaService,
    private PageReloadService: PageReloadService,
    private _location: Location,
    private cnacs: CNacService,
    private medic: MedicoService,
    private userSe: UsuariosService,

  ) { }

  ngOnInit() {
    this.fechaActual = this.fechaService.FechaActual();
    this.horaActual = this.fechaService.HoraActual();

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const id = +idParam;
        this.cnacs.getConstancia(id).subscribe(data => {
          this.documetos = data;
          // console.table(data);
          this.detalleVisible = true;
          this.medic.getMedicoCol(data.colegiado).subscribe(
            result => {
              console.log(result.sexo)
              if (result.sexo === 'F') {
                this.pronombre = 'la doctora';
              } else {
                this.pronombre = 'el doctor';
              }
            }
          );

        });
      }
    });




  }

  reloadPage() {
    // Llama al servicio para recargar la página
    this.PageReloadService.reloadPage();
  }

  imprimir() {

    window.print();
  }

  regresar(){
    this._location.back();
  }

  pronombres(col: number) {
    this.medic.getMedicoCol(col).subscribe(
      data => {
        if (data == "F") {
          this.pronombre = 'la doctora';
        } else {
          this.pronombre = 'el doctor';
        }
      }
    )
  }



}
