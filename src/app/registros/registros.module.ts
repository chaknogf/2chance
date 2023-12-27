import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrosComponent } from './registros.component';
import { CitasComponent } from './regisros/citas/citas/citas.component';
import { BuscarComponent } from './regisros/pacientes/buscar/buscar.component';
import { TablaPacientesComponent } from './regisros/pacientes/tablaPacientes/tablaPacientes.component';
import { FormularioPacienteComponent } from './regisros/pacientes/formulario-paciente/formulario-paciente.component';
import { FormCitaComponent } from './regisros/citas/formCita/formCita.component';
import { IngresoHComponent } from './regisros/consultas/ingresos/ingresoH/ingresoH.component';
import { CoexComponent } from './regisros/consultas/coex/coex/coex.component';
import { FormCoexComponent } from './regisros/consultas/coex/form-coex/form-coex.component';
import { HClinicaComponent } from './regisros/consultas/coex/hClinica/hClinica.component';
import { TodasComponent } from './regisros/consultas/consultas/todas/todas.component';
import { EmergenciasComponent } from './regisros/consultas/emergencias/emergencias.component';
import { TabEmerExpComponent } from './regisros/consultas/emergencias/tabEmerExp/tabEmerExp.component';
import { TablaEmergenciaComponent } from './regisros/consultas/emergencias/tablaEmergencia/tablaEmergencia.component';
import { FormIngresoComponent } from './regisros/consultas/ingresos/formIngreso/formIngreso.component';
import { IngresoTablaComponent } from './regisros/consultas/ingresos/ingresoTabla/ingresoTabla.component';
import { IngresosComponent } from './regisros/consultas/ingresos/ingresos/ingresos.component';
import { NuevoIngresoComponent } from './regisros/consultas/ingresos/nuevoIngreso/nuevoIngreso.component';
import { TabPacienteComponent } from './regisros/consultas/ingresos/tabPaciente/tabPaciente.component';
import { NuevaConsultaComponent } from './regisros/consultas/nuevaConsulta/nuevaConsulta.component';
import { TablaComponent } from './regisros/pacientes/tabla/tabla.component';
import { ReporteCoexComponent } from './regisros/consultas/coex/reporte/reporteCoex.component';
import { FormRecepcionComponent } from './regisros/consultas/recepcion/formRecepcion/formRecepcion.component';
import { RecepciónComponent } from './regisros/consultas/recepcion/recepción/recepción.component';
import { AppModule } from '../app.module';

@NgModule({
  imports: [
    CommonModule,


  ],
  declarations: [
    RegistrosComponent,
    TablaPacientesComponent,
    BuscarComponent,
    CitasComponent,
    FormularioPacienteComponent,
    IngresoHComponent,
    FormCitaComponent,
    EmergenciasComponent,
    CoexComponent,
    TablaComponent,
    NuevaConsultaComponent,
    FormCoexComponent,
    TablaEmergenciaComponent,
    HClinicaComponent,
    IngresosComponent,
    FormIngresoComponent,
    IngresoTablaComponent,
    NuevoIngresoComponent,
    TabPacienteComponent,
    TabEmerExpComponent,
    TodasComponent,
    ReporteCoexComponent,
    RecepciónComponent,
    FormRecepcionComponent,

  ]
})
export class RegistrosModule { }
