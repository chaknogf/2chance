
import { EdadService } from 'src/app/services/edad.service';
import { PageReloadService } from '../../../services/PageReload.service';
import { Component, Renderer2, EventEmitter, OnInit, Output, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Ipaciente } from 'src/app/models/Ipaciente';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService } from 'src/app/services/medico.service';
import { FechaService } from 'src/app/services/fecha.service';
import { CNacService } from 'src/app/services/c-nac.service';
import { FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/user.service';
import { IconsNac } from 'src/app/models/IconsNac';
import { Location } from '@angular/common';
import { departamentos, municipio, vecindad } from 'src/app/enums/vencindad'
import { Imedico } from 'src/app/models/Imedico';
import { lugares, deptos, vecindades, partos } from './../../../models/Ienum';
import { TextoService } from 'src/app/services/texto.service';
import { claseParto, tipoParto } from 'src/app/enums/parto';
import { UsuariosService } from 'src/app/services/usuarios.service';import { Iusuarios } from 'src/app/models/Iusers';



@Component({
  selector: 'app-form-nac',
  templateUrl: './form-nac.component.html',
  styleUrls: ['./form-nac.component.css']
})
export class FormNacComponent implements OnInit {
  constructor(
    private pacientesService: PacientesService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private cnacSer: CNacService,
    private formBuilder: FormBuilder,
    private fechaService: FechaService,
    private PageReloadService: PageReloadService,
    private user: UsersService,
    private mserv: MedicoService,
    private Edad: EdadService,
    private texto: TextoService,
    private usuario: UsuariosService,
  ) { }

  //variables para pacientes
  public pacientes: Ipaciente[] = []; // Registros a mostrar en la página actual
  public filteredPacientes: Ipaciente[] = [];

  public searchText: string = '';
  public totalRegistros: number = 12; // Total de registros en la lista
  public paginaActual: number = 1; // Página actual
  public expedienteBuscar: any = '';
  public nombreBuscar: string = '';
  public apellidoBuscar: string = '';
  public dpiBuscar: any = '';
  detalleVisible: boolean | undefined;
  public paciente: Ipaciente | undefined;
  @Input() madre: Ipaciente | undefined;
  public patient: Ipaciente | undefined;
  public idCopiado: number = 0;
  public mostrarModal = false;

  //variable para constancias
  public username = this.user.getUsernameLocally();
  public corAño: string = ""
  public corOrden: string = ""
  public edit: boolean = false;
  public new: boolean = false;
  public horaActual: string = "";
  public edad: number = 0;
  public fechaActual: string = "";
  public resumen: IconsNac[] = [];
  vecindadFiltrados: any[] = []; // Lista de municipios filtrados
  hijosNacidos: number = 0;



  //variables para medicos
  public medicos: Imedico[] = [];
  public _medico: Imedico | undefined;
  public cui_medic: any = '';

   //variables para usuario
   public usuarioActual: Iusuarios[] = [];


//objeto constancias
  d: vecindades = {
    departamentos: departamentos,
    municipio: municipio,
    vecindad: vecindad,
  }
  parto: partos = {
    claseparto: claseParto,
    tipoparto: tipoParto
  }

  constancia: IconsNac = {
    id: 0,
    fecha: undefined,
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
    depto: null,
    muni: null,
    edad: '',
    vecindad: null,
    sexo_rn: null,
    lb: null,
    onz: null,
    hora: null,
    medico: null,
    colegiado: null,
    dpi_medico: null,
    hijos: null,
    vivos: null,
    muertos: null,
    tipo_parto: null,
    clase_parto: null,
    certifica: null,
    create_by: null,
    expediente: 0,
    nacionalidad: null,
    pais: null
  }

  ngOnInit() {
    this.constancia.certifica = 0;
    // this.constancia.create_by = this.username;
    this.fechaActual = this.fechaService.FechaActual();
    this.horaActual = this.fechaService.HoraActual();
    this.constancia.fecha = this.fechaActual;



     // Obtener los parámetros de la ruta
     const params = this.activateRoute.snapshot.params;
    // Verificar si se proporcionó un ID de paciente
     if (params['id']) {
       this.cnacSer.getConstancia(params['id'])
         .subscribe(
           data => {
             this.constancia = data;
             this.edit = true;
             this.actualizar(data.expediente);
           },
           error => console.log(error)
         )
     }

    this.mserv.getMedicos().subscribe(
      data => {
        this.medicos = data;
        this.constancia.medico = data.name;
      });

      this.usuario.obteneruser(this.username).subscribe(
        result => {
          this.usuarioActual = result;
          this.constancia.certifica = result.name;
        }
      )


  }

  OnChanges() {

    this.hijosNacidos = this.constancia.vivos + this.constancia.muertos;
    this.constancia.hijos = this.hijosNacidos;
    //console.log(this.hijosNacidos)
  }

  //metodos pacientes

  onPageChange(pageNumber: number) {
    this.paginaActual = pageNumber;
    this.paginarPacientes();
  }

  actualizarHijos() {
    // Actualizar el valor de hijosNacidos sumando vivos y muertos
    this.hijosNacidos = this.constancia.vivos + this.constancia.muertos;
    this.constancia.hijos = this.hijosNacidos;
    //console.log(this.constancia.vivos)
  }

  paginarPacientes() {
    const tamanoPagina = 12;
    const indiceInicio = (this.paginaActual - 1) * tamanoPagina;
    const indiceFin = indiceInicio + tamanoPagina;
    this.filteredPacientes = this.pacientes.slice(indiceInicio, indiceFin);
    this.totalRegistros = this.filteredPacientes.length; // Agrega esta línea para actualizar el número total de registros por página
  }


  getPaginas(): number[] {
    const totalPaginas = Math.ceil(this.filteredPacientes.length / this.totalRegistros);

    // Verificar si totalPaginas es válido antes de crear el array
    if (totalPaginas <= 0) {
      return [];
    }

    return Array.from({ length: 10 }, (_, index) => index + 1);
  }

  totalPaginas(): number {
    return Math.ceil(this.filteredPacientes.length / this.totalRegistros);

  }

  filtro() {
    // Recopila los valores de entrada del formulario
    const filters = {

      expediente: this.expedienteBuscar,
      nombre: this.nombreBuscar,
      apellido: this.apellidoBuscar,
      dpi: this.dpiBuscar,


    };

    this.pacientesService.mujeres(filters).subscribe((result) => {
      this.pacientes = result;
      this.filteredPacientes = result;
      this.paginarPacientes();
    });

  }


  limpiarInput() {
    this.expedienteBuscar = ''; // Limpia el contenido del input
    this.nombreBuscar = '';
    this.apellidoBuscar = '';
    this.dpiBuscar = '';
    this.filteredPacientes = [];


     // Obtén todos los pacientes nuevamente
  }




  //metodos contancias


  copiarPaciente() {
    this.NuevoCor();




    }

  actualizar(exp:number) {

      this.pacientesService.getPaciente(exp).subscribe(data => {
        this.madre = data;
        console.table(this.madre, data);
        // Abre el modal aquí, puedes establecer una propiedad para controlar la visibilidad del modal.
        this.detalleVisible = true;
        this.constancia.madre = this.texto.capitalizar(`${data.nombre} ${data.apellido}`);
        this.constancia.edad = this.Edad.años(data.nacimiento);
        this.constancia.dpi = data.dpi;
        this.constancia.passport = data.pasaporte;
        this.constancia.vecindad = data.municipio;
        this.constancia.muni = data.lugar_nacimiento;
        this.constancia.depto = data.depto_nac;
        this.constancia.nacionalidad = data.nacionalidad.toString();



      });
      this.vecindadFiltrados = this.d.vecindad.filter(vecin => vecin.value == this.constancia.vecindad);
    }

    NuevoCor() {
      this.cnacSer.correlativo().subscribe(data => {
        if (this.edit == false) {
          // Actualiza el correlativo y año en tu objeto cNac
          this.constancia.cor = data.cor;
          this.constancia.ao = data.año;
        }
        this.constancia.doc = `${this.constancia.cor}-${this.constancia.ao}`
        // console.table(data)
      });
    }

    medico(col: number) {
      this.mserv.getMedicoCol(col).subscribe(data => {
          this.constancia.medico = data.name;
          this.constancia.colegiado = data.colegiado;
          this.constancia.dpi_medico = data.dpi;

          //console.table(this.medicos)
        }
      )
    }





    filtrarVecindades() {
      // Filtrar la lista de municipios basándote en el departamento seleccionado
      this.vecindadFiltrados = this.d.vecindad.filter(vecin => vecin.value == this.constancia.vecindad);
    }

    reloadPage() {
      // Llama al servicio para recargar la página
      this.PageReloadService.reloadPage();
    }

    guardar(): void {
      this.cnacSer.editarConstancia(this.constancia.id, this.constancia).subscribe(
        (response) => {

          //manejar la respuesta exitosa
          console.log('Exito al crear', response);
          //mostrar alert
          // Mostrar una alerta de éxito con estilo Bootstrap
        const alertDiv = document.createElement("div");
        alertDiv.classList.add(
          "alert",
          "alert-sucess",
          "fixed-top",
          "d-flex",
          "justify-content-center",
          "align-items-center",
        );
        alertDiv.style.width = "80vw";
        alertDiv.style.height = "10vh";
        alertDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        alertDiv.style.position = "fixed";
        alertDiv.style.top = "0";
        alertDiv.style.left = "0";
        alertDiv.style.zIndex = "9999";

        const messageDiv = document.createElement("div");
        messageDiv.textContent = "Editada con Exito";
        messageDiv.style.color = "white";
        messageDiv.style.textAlign = "center";
        messageDiv.style.padding = "20px";
        alertDiv.appendChild(messageDiv);

        document.body.appendChild(alertDiv);
        this.router.navigate(["/consNac"]);
        // Retrasar la recarga de la página por, por ejemplo, 1 segundo
        setTimeout(() => {
          document.body.removeChild(alertDiv);
        }, 2000); // 1000 ms = 1 segundo
      },
      (error) => {
        // Manejar errores aquí
        //console.table(this.c)
        console.error(
          "Error!! al cita ya estaba registrada o se ha llegado al limite de citas",
          error,
        );

        const alertDiv = document.createElement("div");
        alertDiv.classList.add(
          "alert",
          "alert-danger",
          "fixed-top",
          "d-flex",
          "justify-content-center",
          "align-items-center",
        );
        alertDiv.style.width = "40vw";
        alertDiv.style.height = "20vh";
        alertDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        alertDiv.style.position = "fixed";
        alertDiv.style.top = "0";
        alertDiv.style.left = "0";
        alertDiv.style.zIndex = "9999";

        const messageDiv = document.createElement("div");
        messageDiv.textContent =
          "Error!! ";
        messageDiv.style.color = "white";
        messageDiv.style.textAlign = "center";
        messageDiv.style.padding = "20px";
        alertDiv.appendChild(messageDiv);

        document.body.appendChild(alertDiv);

        // Retrasar la recarga de la página por, por ejemplo, 1 segundo
        setTimeout(() => {
          document.body.removeChild(alertDiv);

          // this.reloadPage();
        }, 2000); // 1000 ms = 1 segundo
      },
    );
  }


  //formato hora




}

