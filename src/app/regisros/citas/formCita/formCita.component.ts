import { tipo } from './../../../enums/enums';
import { UsersService } from "src/app/services/user.service";
import { ConsultasService } from "./../../../services/consultas.service";
import { PacientesService } from "src/app/services/pacientes.service";
import { Iconcultas } from "src/app/models/Iconsultas";
import { CitasService } from "../../../services/citas.service";
import { _citas } from "src/app/models/Ienum";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, HostBinding } from "@angular/core";
import { Icitas, IVistaCitas } from "src/app/models/Icitas";
import { PageReloadService } from "../../../services/PageReload.service";
import { FechaService } from "src/app/services/fecha.service";
import { Ipaciente } from "src/app/models/Ipaciente";
import { citas } from "src/app/enums/enums";

@Component({
  selector: "app-form-cita",
  templateUrl: "./formCita.component.html",
  styleUrls: ["./formCita.component.css"],
})
export class FormCitaComponent implements OnInit {
  public cita: Icitas[] = [];
  public resumen: IVistaCitas[] = [];
  public ocupadas: IVistaCitas[] = [];
  public paciente: Ipaciente | undefined;
  @HostBinding("class") clases = "row";
  selectedDate: Date | null = null; // Declaración de la propiedad selectedDate
  bsConfig = { dateInputFormat: "DD-MM-YYYY" };
  edit: boolean = false;
  selectExpediente: any;
  public consultas: Iconcultas[] = [];
  public expediente: any = "";
  public disponible: number = 0;
  public ocupado: number = 0;
  fechaActual: string = "";
  public username = this.usr.getUsernameLocally();

  c: Icitas = {
    id: 0,
    expediente: this.expediente,
    fecha: "",
    especialidad: 0,
    fecha_cita: new Date(),
    nota: "",
    tipo: 1,
    name: null,
    created_by: null,
  };

  e: _citas = {
    citas: citas,
  };

  constructor(
    public CitasService: CitasService,
    private router: Router,
    private fechaService: FechaService,
    private activateRoute: ActivatedRoute,
    private CS: ConsultasService,
    private PageReloadService: PageReloadService,
    private pacientes: PacientesService,
    private usr: UsersService,
  ) {}

  ngOnInit() {
    this.c.created_by = this.username;
    this.fechaActual = this.fechaService.FechaActual();
    this.c.fecha_cita = this.fechaActual;
    // const params = this.activateRoute.snapshot.params;

    // Obtener los parámetros de la ruta
    const params = this.activateRoute.snapshot.params;

    // Verificar si se proporcionó un ID de paciente
    if (params["id"]) {
      this.CitasService.getCita(params["id"]).subscribe(
        (data) => {
          this.c = data;
          this.paciente_();
          this.edit = true;
        },
        (error) => console.log(error),
      );
    }
    this.resumen;
    

    

  }

  ngOnchages() {
    this.paciente_();
    this.c.expediente = this.expediente;
    console.log(this.c.expediente);

  }

  crearCita(): void {
    this.CitasService.agendar(this.c).subscribe(
      (response) => {
        console.table(this.c);
        // Manejar la respuesta exitosa aquí, si es necesario
        console.log("Consulta creada con éxito", response);

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
        alertDiv.style.width = "40vw";
        alertDiv.style.height = "20vh";
        alertDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        alertDiv.style.position = "fixed";
        alertDiv.style.top = "0";
        alertDiv.style.left = "0";
        alertDiv.style.zIndex = "9999";

        const messageDiv = document.createElement("div");
        messageDiv.textContent = " La cita fue registrada con Exitos";
        messageDiv.style.color = "white";
        messageDiv.style.textAlign = "center";
        messageDiv.style.padding = "20px";
        alertDiv.appendChild(messageDiv);

        document.body.appendChild(alertDiv);
        this.router.navigate(["/citas"]);
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
          "Error!! La cita ya estaba registrada o se ha llegado al límite de citas";
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

  reloadPage() {
    // Llama al servicio para recargar la página
    this.PageReloadService.reloadPage();
  }

  editar() {
    this.CitasService.editarCita(this.c.id, this.c).subscribe((data) => {
      this.c = data;
      this.router.navigate(["/citas"]);
    });
  }

  borrar() {
    this.CitasService.borrarCita(this.c.id).subscribe((data) => {
      this.c = data;
      this.router.navigate(["/citas"]);
    });
  }

  verResumen(especiliadad: number, tipo: number) {
    this.resumen = [];

    this.CitasService.getVigentes(especiliadad, tipo).subscribe((data) => {
      this.resumen = data;
      console.table(this.resumen);
    });
  }

  citasOcupadas(especialidad: number, tipo: number, fecha: any, event: Event) {
    this.ocupadas = [];
    this.verResumen(especialidad, tipo);
    // let Dia = this.CitasService.diaSemana(fecha);
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    if (inputValue) {
      this.selectedDate = new Date(inputValue); // Convierte la cadena en un objeto Date
    } else {
      this.selectedDate = null; // Establece selectedDate en null si no hay valor
    }



    this.CitasService.getCitasOcupadas(especialidad, tipo, fecha).subscribe((data) => {
      this.ocupadas = data;
      this.ocupado = data.total_citas;

    })

    //  // // Calcular citas disponibles si es necesario
    //  let orden = [1,2,3,4,5,6,7]
    //  let indice = fecha.getDay();
    //  let Dia = orden[indice]
    //  if (tipo == 1) {
    //    this.disponible = 10;
    //  } if (tipo == 3 && Dia == 1) {
    //    this.disponible = 8;
    //  }

  }

  copiarEspecialidad(especiliadad: number) {
    this.c.especialidad = especiliadad;
  }

  copiarTipo(tipo: number) {
    this.c.tipo = tipo;
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

  paciente_() {
    this.pacientes.getPaciente(this.c.expediente).subscribe(
      (data) => {
        this.paciente = data;
        console.log(this.paciente);
        console.log(
          this.paciente?.nombre,
          this.paciente?.apellido,
          this.expediente,
        );
      },
      (error) => {
        console.error("Error al obtener datos del paciente:", error);
      },
    );
  }


}
