import { Component, AfterViewInit, OnInit } from '@angular/core';
import { UsersService } from '../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public userService: UsersService) {}



  ngOnInit() {


  }



}
