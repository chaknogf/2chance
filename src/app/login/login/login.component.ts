import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/user.service';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UsersService,
    public router: Router

  ) { }


  public email: string = "";
  public password: string = "";



  ngOnInit() {

  }

  login() {
    const user = { email: this.email, password: this.password };
    this.userService.login(user).subscribe(
      (response) => {
        const token = response.access_token;
        this.userService.setToken(token);
        console.log(token);
        this.userService.storeTokenLocally(token);
        this.router.navigateByUrl("pacientes")
        // Redirige al usuario a la página deseada después de iniciar sesión
      },
      (error) => {

        // Manejo de errores, por ejemplo, mostrar un mensaje de error al usuario
      }
    );
  }
}
