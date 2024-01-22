import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcedimientosMedicosService } from 'src/app/services/procedimientosMedicos.service';
import { Iabreviaturas } from 'src/app/models/IprocedimientosMedicos';
import { PageReloadService } from 'src/app/services/PageReload.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-nuevoProce',
  templateUrl: './nuevoProce.component.html',
  styleUrls: ['./nuevoProce.component.css']
})
export class NuevoProceComponent implements OnInit {
  constructor(
    private activateRoute: ActivatedRoute,
    private PageReloadService: PageReloadService,
    private router: Router,
    private prm: ProcedimientosMedicosService,
    private _location: Location,
  ) { }

  public resumen: Iabreviaturas[] = [];
  edit: boolean = false;



  proce: Iabreviaturas  = {
    id: 0,
    abreviatura: '',
    procedimiento: ''
  }






  ngOnInit() {

    const params = this.activateRoute.snapshot.params;
    if (params['id']) {
      this.prm.getabreviaturaid(params['id'])
        .subscribe(
          data => {
            this.proce = data;
            this.edit = true;
          },
          error => console.log(error)
      )
    }
    this.resumen;

  }

  reloadPage() {
    // Llama al servicio para recargar la página
    this.PageReloadService.reloadPage();
  }

  crear(): void {
    this.prm.nuevo(this.proce).subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí, si es necesario
        console.log('Registrado con éxito', response);

        // Mostrar una alerta de éxito con estilo Bootstrap
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', 'alert-success', 'fixed-top');
        alertDiv.textContent = 'Registro con éxito';
        document.body.appendChild(alertDiv);
        // this.router.navigate(['/'])
        // Retrasar la recarga de la página por, por ejemplo, 1 segundo
        setTimeout(() => {
          this.reloadPage();
        }, 2000); // 1000 ms = 1 segundo
      },
      (error) => {
        // Manejar errores aquí
        console.error('Error!! ', error);


        // Mostrar una alerta de error con estilo Bootstrap
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', 'alert-danger', 'fixed-top');
        alertDiv.textContent = 'Error!!  ya estaba registrada';
        document.body.appendChild(alertDiv);

        // // Retrasar la recarga de la página por, por ejemplo, 1 segundo
        // setTimeout(() => {
        //   this.reloadPage();
        // }, 2000); // 1000 ms = 1 segundo


      }
    );

  }

  editar(){
    this.prm.editAbreviatura(this.proce.id, this.proce)
      .subscribe(data => {
        this.proce = data;
        this.router.navigate(['/labreviaturas'])
    })
  }

  borrar() {
    this.prm.eliminarAbreviatura(this.proce.id)
      .subscribe(data => {
        this.proce = data;
        this.router.navigate(['/abreviaturas'])
    })
  }

  regresar(){
    this._location.back();
  }



}
