import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { environment } from 'src/assets/enviroments/enviroment';
import { UsersService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private token = this.auth.getTokenLocally(); // Obtén el token almacenado
  private urlapi = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private auth: UsersService
  ) { }

  excel_consultas(inicio: string, final: string): Observable<HttpResponse<Blob>> {
    const url = `${this.urlapi}/report_consult/?fecha_inicio=${inicio}&fecha_final=${final}&token=${this.token}`;
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }


  excel_uisau(fecha: string): Observable<any> {
    const url = `${this.urlapi}/report_uisau/?fecha_reporte=${fecha}&token=${this.token}`;
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }

  excel_pacientes(): Observable<any> {
    const url = `${this.urlapi}/report_paciente/?token=${this.token}`;
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }

  excel_procedimientos(inicio: string, final: string): Observable<HttpResponse<Blob>> {
    const url = `${this.urlapi}/report_procedimiento/?fecha_inicio=${inicio}&fecha_final=${final}&token=${this.token}`;
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }

  excel_dco(inicio: string, final: string): Observable<HttpResponse<Blob>> {
    const url = `${this.urlapi}/censo_camas/?fecha_inicio=${inicio}&fecha_final=${final}&token=${this.token}`;
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }


}
