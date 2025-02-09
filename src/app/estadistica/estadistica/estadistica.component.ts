import { Tabcie10Component } from './../cie10/tabcie10/tabcie10/tabcie10.component';
import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  routes: Routes = [
    { path: 'cie10', component: Tabcie10Component },
  ];

}
