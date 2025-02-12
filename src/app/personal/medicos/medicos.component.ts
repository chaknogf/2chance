
import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/medico.service';
import { Imedico } from 'src/app/models/Imedico';
import { serv_espc } from 'src/app/models/Ienum';
import { servicio, serv } from 'src/app/enums/enums';
import { PageReloadService } from 'src/app/services/PageReload.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  public resumen: Imedico[] = []
  public Medicos: Imedico[] = [];
  public buscarcolegiado: any = '';
  public buscarDPI: string = '';
  public buscarName: string = '';
  public buscarespecialidad: any = '';
  public totalRegistros: number = 12; // Total de registros en la lista
  public paginaActual: number = 1; // Página actual
  private sortColumn: string | undefined;
  private ascendingOrder: boolean = false;
  public porcentajeDeProgreso: number = 0; // Variable para el progreso


  constructor(
    private medicSer: MedicoService,
    private PageReloadService: PageReloadService,

  ) { }


  medicoM: Imedico = {
    id: 0,
    colegiado: 0,
    name: null,
    dpi: undefined,
    especialidad: null,
    sexo: ''
  }
  e: serv_espc = {
    servicio: servicio,
    serv: serv
  }



  ngOnInit() {
    this.consult();


  }

  paginar() {
    const tamanoPagina = 12;
    const indiceInicio = (this.paginaActual - 1) * tamanoPagina;
    const indiceFin = indiceInicio + tamanoPagina;
    this.resumen = this.Medicos.slice(indiceInicio, indiceFin);
    this.totalRegistros = this.resumen.length; // Agrega esta línea para actualizar el número total de registros por página
  }

  getPaginas(): number[] {
    const totalPaginas = Math.ceil(this.resumen.length / this.totalRegistros);

    // Verificar si totalPaginas es válido antes de crear el array
    if (totalPaginas <= 0) {
      return [];
    }

    return Array.from({ length: 10 }, (_, index) => index + 1);
  }

  totalPaginas(): number {
    return Math.ceil(this.Medicos.length / this.totalRegistros);

  }

  filtro() {
    // Recopila los valores de entrada del formulario
    const filters = {
      colegiado: this.buscarcolegiado,
      especialidad: this.buscarespecialidad,
      dpi: this.buscarDPI,
      name: this.buscarName,
    };

    this.medicSer.filtrarmedico(filters).subscribe((result) => {
      this.resumen = result;
      this.Medicos = result;
      this.paginar();
    });

  }

  limpiarInput() {
    this.buscarcolegiado = '';
    this.buscarDPI = '';
    this.buscarName = '';
    this.buscarespecialidad = '';
    this.consult();
  }


  onPageChange(pageNumber: number) {
    this.paginaActual = pageNumber;
    this.paginar();
  }


  consult() {
    this.porcentajeDeProgreso = 0.5;
    this.medicSer.getMedicos().subscribe(data => {
      this.Medicos = data.sort((a: { id: number; }, b: { id: number; }): number => b.id - a.id);
      this.porcentajeDeProgreso = 75;
      this.resumen = data;
      this.paginar();//Llama a la función aquí para paginar automáticamente
      this.porcentajeDeProgreso = 100;
      setTimeout(() => {
        this.porcentajeDeProgreso = -1; // Puedes establecerlo en -1 o cualquier otro valor para ocultar la barra
      }, 1000);

    });
  }


  reloadPage() {
    // Llama al servicio para recargar la página
    this.PageReloadService.reloadPage();
  }

  crear(): void {
    this.medicSer.crearMedico(this.medicoM).subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí, si es necesario
        console.log('Consulta creada con éxito', response);

        // Mostrar una alerta de éxito con estilo Bootstrap
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', 'alert-success', 'fixed-top');
        alertDiv.textContent = 'Medico creado con éxito 🤓';
        document.body.appendChild(alertDiv);

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
        alertDiv.textContent = 'Error!!  😫';
        document.body.appendChild(alertDiv);

        // Retrasar la recarga de la página por, por ejemplo, 1 segundo
        setTimeout(() => {
          this.reloadPage();
        }, 2000); // 1000 ms = 1 segundo


      }
    );

  }

  editar() {
    this.medicSer.editarMedico(this.medicoM.id, this.medicoM)
      .subscribe(data => {
        this.medicoM = data;
        this.reloadPage();
      })
  }

  borrar(id: number) {
    this.medicSer.eliminarMedico(id)
      .subscribe(data => {
        this.medicoM = data;
        this.reloadPage();
      })
  }


  obtenerMedico(id: number) {
    this.medicSer.getMedico(id).subscribe(data => {
      this.medicoM = data;
    })
  }

  borrarFormulario() {
    this.medicoM.id = 0,
      this.medicoM.colegiado = 0,
      this.medicoM.name = '',
      this.medicoM.dpi = '',
      this.medicoM.especialidad = 0,
      this.medicoM.sexo = ''
  }

}


