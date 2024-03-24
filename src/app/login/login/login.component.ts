import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/user.service';
import { Router} from "@angular/router";

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


  public username: string = "";
  public password: string = "";


  private userlog: string = 'username';

  ngOnInit() {
    this.logout();

  }

  login() {
    const user = { username: this.username, password: this.password };
    this.userService.login(user).subscribe(
      (response) => {
        const token = response.access_token;
        const user = response.username;

        // Almacena el token en una cookie llamada 'token'
        this.userService.setToken(token);
        // Almacena el token en el almacenamiento local del navegador
        this.userService.storeTokenLocally(token);

        this.userService.setUser(user);
        // Almacena el nombre de usuario en el almacenamiento local
        this.userService.storeUsernameLocally(user);



        this.router.navigateByUrl("home");
      },
      (error) => {
        // Manejo de errores, por ejemplo, mostrar un mensaje de error al usuario
      }
    );
  }

  logout() {
    this.userService.logout();
  }

}
