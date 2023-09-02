import { Icitas } from './../models/Icitas';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs';
import { Ipaciente } from '../models/Ipaciente';

@Injectable({
  providedIn: 'root'
})


export class CitasService {



  private urlapi = "http://localhost:8000";
  constructor(private http: HttpClient) { }


  getCitas(): Observable<any> {
    return this.http.get(this.urlapi + "/cita/id/")
  }

  agendar(cita: Icitas): Observable<any>{
    return this.http.post(this.urlapi + "/cita/", cita);
   }



}
