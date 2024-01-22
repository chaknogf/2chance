import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcedimientosMedicosService } from 'src/app/services/procedimientosMedicos.service';
import { IproceMedico } from 'src/app/models/IprocedimientosMedicos';
import { Ienum, serv_espc } from 'src/app/models/Ienum';
import { PageReloadService } from 'src/app/services/PageReload.service';
import { serv, servicio } from 'src/app/enums/enums';
import { FechaService } from 'src/app/services/fecha.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registroProce',
  templateUrl: './registroProce.component.html',
  styleUrls: ['./registroProce.component.css']
})
export class RegistroProceComponent implements OnInit {

  constructor(
    private activateRoute: ActivatedRoute,
    private PageReloadService: PageReloadService,
    private router: Router,
    private prm: ProcedimientosMedicosService,
    private fch: FechaService,
    private user: UsersService,
  ) { }

  public resumen: IproceMedico[] = [];
  edit: boolean = false;
  public fechaActual: string = '';
  public username = this.user.getUsernameLocally()

  proce: IproceMedico = {
    id: 0,
    fecha: '',
    servicio: 0,
    sexo: '',
    abreviatura: '',
    procedimiento: '',
    especialidad: 0,
    cantidad: 0,
    medico: '',
    created_by: ''
  }


  e: serv_espc = {
    servicio: servicio,
    serv: serv
  }



  ngOnInit() {

    this.proce.fecha = this.fch.FechaActual();
    this.proce.created_by = this.username;

    const params = this.activateRoute.snapshot.params;
    if (params['id']) {
      this.prm.getproce(params['id'])
        .subscribe(
          data => {
            this.proce = data;
            this.edit = true;
          },
          error => console.log(error)
      )
    }
    this.resumen;
    this.procedimiento();
  }

  reloadPage() {
    // Llama al servicio para recargar la página
    this.PageReloadService.reloadPage();
  }

  crear(): void {
    this.prm.registrar(this.proce).subscribe(
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
    this.prm.editProceMedic(this.proce.id, this.proce)
      .subscribe(data => {
        this.proce = data;
        this.router.navigate(['/listProce'])
    })
  }

  borrar() {
    this.prm.eliminarProce(this.proce.id)
      .subscribe(data => {
        this.proce = data;
        this.router.navigate(['/listProce'])
    })
  }

  procedimiento() {
    this.prm.getabreviatura(this.proce.abreviatura)
      .subscribe(data => {
        this.proce.procedimiento = data.procedimiento;
        console.log(this.proce.procedimiento)
    })
  }

  ngOnchages() {
    this.procedimiento();


  }


}
