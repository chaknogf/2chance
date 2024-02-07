import { Component, OnInit } from '@angular/core';
import { Iusuarios } from 'src/app/models/Iusers';
import { UsersService } from 'src/app/services/user.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { PageReloadService } from 'src/app/services/PageReload.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  constructor(
    private user: UsersService,
    private usuario: UsuariosService,
    private router: Router,
    private PageReloadService: PageReloadService,
  ) { }


  //variables para usuario
  public usuarioActual: Iusuarios[] = [];
  public username = this.user.getUsernameLocally();

  us: Iusuarios = {
    id: 0,
    code: 0,
    username: '',
    name: '',
    dpi: 0,
    email: '',
    password: '',
    rol: 0
  }


  ngOnInit() {

    this.usuario.obteneruser(this.username).subscribe(
      result => {
        this.usuarioActual = result;


      }
    )
  }

  reloadPage() {
    // Llama al servicio para recargar la página
    this.PageReloadService.reloadPage();
  }

  guardar() {
    this.usuario.actualizar(this.username, this.us).subscribe(
      (response) => {
       //manejar la respuesta exitosa
       console.log('Exito al crear', response);
       //mostrar alert
       const alertDiv = document.createElement('div');
       alertDiv.classList.add('alert', 'alert-success', 'fixed-top');
       alertDiv.textContent = 'Cita Agendada con éxito';
       document.body.appendChild(alertDiv);
       this.router.navigate(['/constanciasNac'])
       // Retrasar la recarga de la página por, por ejemplo, 1 segundo
       setTimeout(() => {
         this.reloadPage();
       }, 2000); // 1000 ms = 1 segundo
     }
   );
 }


}
