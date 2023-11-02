import { ResumenCitasPipe } from './pipe/resumenCitas.pipe';
import { NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { FormatoDPIPipe } from './pipe/formatoDPI.pipe';
import { AnyToTextPipe } from './pipe/anyToText.pipe';
import { EdadPipe } from './pipe/Edad.pipe';
import { FortmatPhone } from './pipe/telefono.pipe';
import { CapitalizeNamePipe } from './pipe/sentenceCase.pipe';
import { AppComponent } from './app.component';
import { DiaDeSemana } from './pipe/diaDeSemana.pipe';
import { WeekdayPipe } from './pipe/weekDay.pipe';
import { FormatoFechaPipe } from './pipe/formatoFecha.pipe';
import { ColorizePipe } from './pipe/colorize.pipe';
import { SafeHtmlPipe } from './pipe/safeHtml.pipe';
import { GenderPipe } from './pipe/genero.pipe';
import { DpiDirective } from './Directive/dpi.directive';
import { EspacioNumerosDirective } from './Directive/espacioNumeros.directive';
import {
  EnumEspecialidadPipe, EnumNacionalidadPipe, EnumMunicipioPipe,
  EnumEducacionPipe, EnumCivilPipe, EnumIdiomaPipe, EnumTipoPipe,
  EnumParentescoPipe, EnumEtniaPipe, EnumServiciosPipe, EnumStatusPipe
} from './pipe/enum.pipe'
import { AnyToNumberPipe } from './pipe/anyToNumber.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TablaPacientesComponent } from './pacientes/tablaPacientes/tablaPacientes.component';
import { FormularioPacienteComponent } from './pacientes/formulario-paciente/formulario-paciente.component';
import { BuscarComponent } from './pacientes/buscar/buscar.component';
import { CitasComponent } from './citas/citas/citas.component';
import { FormCitaComponent } from './citas/formCita/formCita.component';
import { TextToDatePipe } from './pipe/textToDate.pipe';
import { ExpedienteToNombrePipe } from './pipe/expToNombre.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightWordsDirective } from './Directive/highlight-words.directive';
import { HighlightDirective } from './Directive/highlight.directive';
import { EmergenciasComponent } from './consultas/emergencias/emergencias.component';
import { CoexComponent } from './consultas/coex/coex.component';
import { TablaComponent } from './pacientes/tabla/tabla.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CrearModalComponent } from './pacientes/crearModal/crearModal.component';
import { NuevaConsultaComponent } from './consultas/nuevaConsulta/nuevaConsulta.component';
import { ShowModalDirective } from './Directive/show-modal.directive';
import { FormCoexComponent } from './consultas/coex/form-coex/form-coex.component';
import { TablaEmergenciaComponent } from './consultas/emergencias/tablaEmergencia/tablaEmergencia.component';
import { HClinicaComponent } from './consultas/coex/hClinica/hClinica.component';
import { FormIngresoComponent } from './consultas/ingresos/formIngreso/formIngreso.component';
import { IngresosComponent } from './consultas/ingresos/ingresos/ingresos.component';
import { IngresoTablaComponent } from './consultas/ingresos/ingresoTabla/ingresoTabla.component';
import { NuevoIngresoComponent } from './consultas/ingresos/nuevoIngreso/nuevoIngreso.component';
import { TabPacienteComponent } from './consultas/ingresos/tabPaciente/tabPaciente.component';
import { IngresoHComponent } from './consultas/ingresos/ingresoH/ingresoH.component';
import { TabEmerExpComponent } from './consultas/emergencias/tabEmerExp/tabEmerExp.component';
import { TodasComponent } from './consultas/consultas/todas/todas.component';
import { ReporteComponent } from './consultas/consultas/reporte/reporte.component';
import { TablaUisauComponent } from './uisau/tablaUisau/tablaUisau.component';
import { FormUisauComponent } from './uisau/formUisau/formUisau.component';
import { DetalleUisauComponent } from './uisau/detalleUisau/detalleUisau.component';









@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TablaPacientesComponent,
    BuscarComponent,
    CitasComponent,
    FormatoDPIPipe,
    AnyToTextPipe,
    EdadPipe,
    FortmatPhone,
    FormularioPacienteComponent,
    IngresoHComponent,
    FormCitaComponent,
    DiaDeSemana,
    FormatoFechaPipe,
    EnumEspecialidadPipe,
    EnumNacionalidadPipe,
    EnumParentescoPipe,
    EnumEtniaPipe,
    AnyToNumberPipe,
    EnumMunicipioPipe,
    EnumEducacionPipe,
    EnumCivilPipe,
    EnumIdiomaPipe,
    EnumServiciosPipe,
    TextToDatePipe,
    EnumStatusPipe,
    ExpedienteToNombrePipe,
    ResumenCitasPipe,
    WeekdayPipe,
    CapitalizeNamePipe,
    ColorizePipe,
    SafeHtmlPipe,
    HighlightWordsDirective,
    HighlightDirective,
    EmergenciasComponent,
    CoexComponent,
    TablaComponent,
    CrearModalComponent,
    NuevaConsultaComponent,
    ShowModalDirective,
    FormCoexComponent,
    EspacioNumerosDirective,
    DpiDirective,
    TablaEmergenciaComponent,
    HClinicaComponent,
    GenderPipe,
    IngresosComponent,
    FormIngresoComponent,
    IngresoTablaComponent,
    NuevoIngresoComponent,
    TabPacienteComponent,
    TabEmerExpComponent,
    TodasComponent,
    ReporteComponent,
    EnumTipoPipe,
    TablaUisauComponent,
    DetalleUisauComponent,
    FormUisauComponent,






  ],
  imports: [
    BrowserModule,
    ModalModule,
    FormsModule,

    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'pacientes', component: TablaPacientesComponent },
      { path: 'crear', component: FormularioPacienteComponent },
      { path: 'paciente/edit/:id', component: FormularioPacienteComponent },
      { path: 'buscar/view/:id', component: BuscarComponent},
      { path: 'citas', component: CitasComponent },
      { path: 'agendar', component: FormCitaComponent },
      { path: 'agenda/edit/:id', component: FormCitaComponent },
      { path: 'emergencias', component: EmergenciasComponent },
      { path: 'emergencias/edit/:id', component: EmergenciasComponent },
      { path: 'coex', component: CoexComponent },
      { path: 'coex/edit/:id', component: CoexComponent },
      { path: 'tablaP', component: TablaComponent },
      { path: 'nuevaConsulta', component: NuevaConsultaComponent },
      { path: 'edit/coex/:id', component: FormCoexComponent },
      { path: 'tablaEmergencia', component: TablaEmergenciaComponent },
      { path: 'hClinica/view/:id', component: HClinicaComponent },
      { path: 'ingresos', component: IngresosComponent },
      { path: 'ingreso', component: FormIngresoComponent },
      { path: 'ingreso/edit/:id', component: FormIngresoComponent },
      { path: 'ingresoTabla', component: IngresoTablaComponent },
      { path: 'ingresohoja/view/:id', component: IngresoHComponent },
      { path: 'consultas', component: TodasComponent },
      { path: 'consulta/view/:id', component: ReporteComponent },
      { path: 'uisau', component: TablaUisauComponent },
      { path: 'formUisau', component: FormUisauComponent },
      { path: 'formUisau/edit/:id', component: FormUisauComponent },
      { path: 'detalleUisau/:id', component: DetalleUisauComponent},





    ]),
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
