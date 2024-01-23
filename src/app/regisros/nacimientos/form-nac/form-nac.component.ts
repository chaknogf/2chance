import { PacientesService } from './../../../services/pacientes.service';
import { lugares } from './../../../models/Ienum';
import { FechaService } from './../../../services/fecha.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CNacService } from './../../../services/c-nac.service';
import { Component, OnInit } from '@angular/core';
import { IconsNac } from 'src/app/models/IconsNac';
import { PageReloadService } from 'src/app/services/PageReload.service';
import { UsersService } from 'src/app/services/user.service';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { Location } from '@angular/common';
import { departamentos, municipio } from 'src/app/enums/enums';
import { Imedico } from 'src/app/models/Imedico';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-form-nac',
  templateUrl: './form-nac.component.html',
  styleUrls: ['./form-nac.component.css']
})
export class FormNacComponent implements OnInit {
  [x: string]: any;

  constructor(
    private ns: CNacService,
    private pserv: PacientesService,
    private activateRoute: ActivatedRoute,
    private PageRe: PageReloadService,
    private usr: UsersService,
    private fs: FechaService,
    private router: Router,
    private _location: Location,
    private mserv: MedicoService,

  ) { }

  public constancias: IconsNac[] = [];
  public medicos: Imedico[] = [];
  public _medico: Imedico | undefined;
  public paciente: Ipaciente | undefined;
  edit: boolean = false;
  public username = this.usr.getUsernameLocally();
  public fechaActual: string = "";
  selectExpediente: any;
  public expediente: any = '';
  selectedDate: Date | null = null; // Declaración de la propiedad selectedDate
  bsConfig = { dateInputFormat: 'DD-MM-YYYY' };
  public document: number = 1;



  cNac: IconsNac = {
    id: 0,
    fecha: '',
    cor: null,
    ao: null,
    doc: null,
    fecha_parto: null,
    madre: null,
    dpi: null,
    passport: null,
    libro: null,
    folio: null,
    partida: null,
    muni: null,
    edad: null,
    vecindad: null,
    sexo_rn: null,
    lb: null,
    onz: null,
    hora: null,
    medico: null,
    colegiado: 0,
    dpi_medico: null,
    hijos: null,
    vivos: null,
    muertos: null,
    tipo_parto: null,
    clase_parto: null,
    certifica: null,
    create_by: null,
    depto: null,
    expediente: null
  }
  d: lugares = {
    departamentos: departamentos,
    municipio: municipio
  }



  ngOnInit() {
    this.NuevoCor();

    this.cNac.create_by = this.username;
    this.fechaActual = this.fs.FechaActual();
    this.cNac.fecha = this.fechaActual
    this.municipiosFiltrados = this.d.municipio.filter(muni => muni.depto == this.cNac.depto);
    this.mserv.getMedicos().subscribe(
      data => {
        this.medicos = data;
      }
    )

    //obtener parametros de la ruta
    const params = this.activateRoute.snapshot.params;

    //verificar si se proporciono un ID
    if (params['id']) {
      this.ns.getConstancia(params['id'])
        .subscribe(
          data => {
            this.cNac = data;
            this.edit = true
          },
          error => console.log(error)
      )
    }
    this.constancias;

  }



  public corAño: string = ""
  public corOrden: string = ""

  NuevoCor() {
    this.ns.correlativo().subscribe(data => {
      if (this.edit == false) {
        // Actualiza el correlativo y año en tu objeto cNac
        this.cNac.cor = data.cor;
        this.cNac.ao = data.año;
      }
      this.cNac.doc = `${this.cNac.cor}-${this.cNac.ao}`
      // console.table(data)
    });
  }

  seleccionarPaciente(exp: any) {
    this.pserv.getPaciente(exp).subscribe(data => {
      console.table(data);
      this.cNac.madre = data.nombre + " " + data.apellido;
      this.cNac.dpi = data.dpi;
      this.cNac.edad = this.calcularEdad(data.nacimiento);
      this.cNac.depto = data.depto;
      this.cNac.vecindad = data.municipio;

    })
  }



  calcularEdad(fechaNacimiento: string): number {
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - fechaNac.getFullYear();

  // Ajusta la edad si aún no ha pasado el cumpleaños en el año actual
  if (hoy < new Date(hoy.getFullYear(), fechaNac.getMonth(), fechaNac.getDate())) {
    edad--;
  }

    return edad;
  }




  reloadPage() {
    // Llama al servicio para recargar la página
    this.PageRe.reloadPage();
  }

  crear(): void {
    this.ns.crearConstancias(this.cNac).subscribe(
      (response) => {
        console.table(this.cNac);
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

  editar() {
    this.ns.editarConstancia(this.cNac.id, this.cNac)
      .subscribe(data => {
        this.cNac = data;
        this.router.navigate(['/constaciasNac'])
    })
  }

  borrar() {
    this.ns.borrarConstancia(this.cNac.id)
      .subscribe(data => {
        this.cNac = data;
        this.router.navigate(['/constaciasNac'])
    })
  }

  verResumen() {
    this.ns.getConstancias()
      .subscribe(data => {
        this.constancias = data;
        console.table(this.constancias);
    })
  }

  selectAllText(event: any) {
    event.target.select(); // Selecciona todo el texto en el input
  }

 // Método para manejar el cambio en la fecha seleccionada
 onDateChange(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const inputValue = inputElement.value;

  if (inputValue) {
    this.selectedDate = new Date(inputValue); // Convierte la cadena en un objeto Date
  } else {
    this.selectedDate = null; // Establece selectedDate en null si no hay valor
  }
 }

 showAlert(message: string) {
  alert(message);
  }

  regresar(){
    this._location.back();
  }


  municipiosFiltrados: any[] = []; // Lista de municipios filtrados

  filtrarMunicipios() {
    // Filtrar la lista de municipios basándote en el departamento seleccionado
    this.municipiosFiltrados = this.d.municipio.filter(muni => muni.depto == this.cNac.depto);
    console.log(this.municipiosFiltrados, this.cNac.depto)
  }

  medico() {
    this.mserv.getMedicoCol(this.cNac.colegiado).subscribe(data => {
        this._medico = data;
        this.cNac.medico = data.name;
        this.cNac.dpi_medico = data.dpi;
      }
    )
  }


}

