import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';


@Component({
  selector: 'app-report_estd',
  templateUrl: './report_estd.component.html',
  styleUrls: ['./report_estd.component.css']
})
export class Report_estdComponent implements OnInit {

  public opcion: number = 0;
  public fecha_inicio_consultas: string = "";
  public fecha_final_consultas: string = "";
  public fecha_inicio_uisau: string = "";
  public fecha_final_uisau: string = "";
  cargando: boolean = false;

  constructor(
    private rp: ReportsService,
  ) { }

  ngOnInit() {
  }

  descargarConsultas() {
    this.rp.excel_consultas(this.fecha_inicio_consultas, this.fecha_final_consultas).subscribe(
      (response: any) => {
        const blob = new Blob([response.body], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = 'consultas.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error al descargar el archivo', error);
        // Manejar el error según sea necesario
      }
    );
  }

  descargarUisau() {
    this.rp.excel_uisau(this.fecha_inicio_uisau, this.fecha_final_uisau).subscribe(
      (response: any) => {
        const blob = new Blob([response.body], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = 'uisau.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error al descargar el archivo', error);
        // Manejar el error según sea necesario
      }
    );
  }

  descargarPacientes() {
    this.cargando = true; // Activar el loader
    this.rp.excel_pacientes().subscribe(
      (response: HttpResponse<Blob>) => {
        this.descargarArchivo(response.body, 'pacientes.xlsx');
        this.cargando = false; // Desactivar el loader después de la descarga
      },
      error => {
        console.error('Error al descargar el archivo', error);
        this.cargando = false; // Desactivar el loader en caso de error
        // Manejar el error según sea necesario
      }
    );
  }

  descargarArchivo(data: any, nombreArchivo: string) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = nombreArchivo;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  descargarProcedimientos() {
    this.rp.excel_procedimientos(this.fecha_inicio_consultas, this.fecha_final_consultas).subscribe(
      (response: any) => {
        const blob = new Blob([response.body], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = 'Procedimientos.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error al descargar el archivo', error);
        // Manejar el error según sea necesario
      }
    );
  }
}
