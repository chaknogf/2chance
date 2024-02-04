import { Cie10Service } from 'src/app/services/cie10.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Icie10 } from 'src/app/models/Icie10';
import { PageReloadService } from 'src/app/services/PageReload.service';
import { serv_espc} from 'src/app/models/Ienum';
import { servicio, serv } from 'src/app/enums/enums';

@Component({
  selector: 'app-formcie10',
  templateUrl: './formcie10.component.html',
  styleUrls: ['./formcie10.component.css']
})
export class Formcie10Component implements OnInit {

  public resumen: Icie10[] = [];
  edit: boolean = false;

  cie: Icie10 = {
    id: 0,
    cod: '',
    grupo: '',
    dx: '',
    abreviatura: '',
    especialidad: 0
  }
  e: serv_espc = {
    servicio: servicio,
    serv: serv
  }

  constructor(
    private Cie10Service: Cie10Service,
    private activateRoute: ActivatedRoute,
    private PageReloadService: PageReloadService,
    private router: Router,

  ) { }

  ngOnInit() {

    const params = this.activateRoute.snapshot.params;

    // Verificar si se proporcionó un ID de paciente
    if (params['id']) {
      this.Cie10Service.getCodigo(params['id'])
        .subscribe(
          data => {
            this.cie = data;
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
    this.Cie10Service.crearCie10(this.cie).subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí, si es necesario
        console.log('Consulta creada con éxito', response);

        // Mostrar una alerta de éxito con estilo Bootstrap
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', 'alert-success', 'fixed-top');
        alertDiv.textContent = 'Cie 10 creado con éxito';
        document.body.appendChild(alertDiv);
        this.router.navigate(['/cie10'])
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

        // Retrasar la recarga de la página por, por ejemplo, 1 segundo
        setTimeout(() => {
          this.reloadPage();
        }, 2000); // 1000 ms = 1 segundo


      }
    );

  }

  editar(){
    this.Cie10Service.editarCie10(this.cie.id, this.cie)
      .subscribe(data => {
        this.cie = data;
        this.router.navigate(['/cie10'])
    })
  }

  borrar() {
    this.Cie10Service.eliminarCie10(this.cie.id)
      .subscribe(data => {
        this.cie = data;
        this.router.navigate(['/cie10'])
    })
  }


}
