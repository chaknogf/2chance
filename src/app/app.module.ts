import { ResumenCitasPipe } from './pipe/resumenCitas.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { RouterModule } from '@angular/router';
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
  EnumParentescoPipe, EnumEtniaPipe, EnumServiciosPipe, EnumStatusPipe, EnumDeptoPipe, EnumEstadoPipe, EnumSituacionPipe, EnumEstadiaPipe, EnumReferenciaPipe
} from './pipe/enum.pipe'
import { AnyToNumberPipe } from './pipe/anyToNumber.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TablaPacientesComponent } from './registros/regisros/pacientes/tablaPacientes/tablaPacientes.component';
import { FormularioPacienteComponent } from './registros/regisros/pacientes/formulario-paciente/formulario-paciente.component';
import { BuscarComponent } from './registros/regisros/pacientes/buscar/buscar.component';
import { CitasComponent } from './registros/regisros/citas/citas/citas.component';
import { FormCitaComponent } from './registros/regisros/citas/formCita/formCita.component';
import { TextToDatePipe } from './pipe/textToDate.pipe';
import { ExpedienteToNombrePipe } from './pipe/expToNombre.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightWordsDirective } from './Directive/highlight-words.directive';
import { HighlightDirective } from './Directive/highlight.directive';
import { EmergenciasComponent } from './registros/regisros/consultas/emergencias/emergencias.component';
import { CoexComponent } from './registros/regisros/consultas/coex/coex/coex.component';
import { TablaComponent } from './registros/regisros/pacientes/tabla/tabla.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NuevaConsultaComponent } from './registros/regisros/consultas/nuevaConsulta/nuevaConsulta.component';
import { ShowModalDirective } from './Directive/show-modal.directive';
import { FormCoexComponent } from './registros/regisros/consultas/coex/form-coex/form-coex.component';
import { TablaEmergenciaComponent } from './registros/regisros/consultas/emergencias/tablaEmergencia/tablaEmergencia.component';
import { HClinicaComponent } from './registros/regisros/consultas/coex/hClinica/hClinica.component';
import { FormIngresoComponent } from './registros/regisros/consultas/ingresos/formIngreso/formIngreso.component';
import { IngresosComponent } from './registros/regisros/consultas/ingresos/ingresos/ingresos.component';
import { IngresoTablaComponent } from './registros/regisros/consultas/ingresos/ingresoTabla/ingresoTabla.component';
import { IngresoHComponent } from './registros/regisros/consultas/ingresos/ingresoH/ingresoH.component';
import { TodasComponent } from './registros/regisros/consultas/consultas/todas/todas.component';
import { ReporteComponent } from './registros/regisros/consultas/consultas/reporte/reporte.component';
import { TablaUisauComponent } from './uisau/tablaUisau/tablaUisau.component';
import { FormUisauComponent } from './uisau/formUisau/formUisau.component';
import { DetalleUisauComponent } from './uisau/detalleUisau/detalleUisau.component';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './auth.guard';
import { Tabcie10Component } from './estadistica/cie10/tabcie10/tabcie10/tabcie10.component';
import { RegistrosComponent } from './registros/regisros/registros-nav/registros.component';
import { EstadisticaComponent } from './estadistica/estadistica/estadistica.component';
import { Formcie10Component } from './estadistica/cie10/formcie10/formcie10.component';
import { ReporteCoexComponent } from './registros/regisros/consultas/coex/reporte/reporteCoex.component';
import { RecepciónComponent } from './registros/regisros/consultas/recepcion/recepción/recepción.component';
import { FormRecepcionComponent } from './registros/regisros/consultas/recepcion/formRecepcion/formRecepcion.component';
import { RecienacidosComponent } from './registros/regisros/pacientes/recienacidos/recienacidos.component';
import { DateTimePipe } from './pipe/dateTime.pipe';
import { ToastrModule } from 'ngx-toastr';
import { EditUisauComponent } from './uisau/editUisau/editUisau.component';
import { Report_uisauComponent } from './uisau/report_uisau/report_uisau.component';
import { Report_estdComponent } from './estadistica/report_estd/report_estd.component';
import { Report_rmComponent } from './registros/regisros/report_rm/report_rm.component';


// Importa los módulos específicos
// import { EstadisticaModule } from './estadistica/estadistica.module';
import { RegistrosModule } from './registros/registros.module';
// import { UisauModule } from './uisau/uisau.module';









@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FormatoDPIPipe,
    AnyToTextPipe,
    EdadPipe,
    FortmatPhone,
    DiaDeSemana,
    FormatoFechaPipe,
    EnumEspecialidadPipe,
    EnumNacionalidadPipe,
    EnumParentescoPipe,
    EnumEtniaPipe,
    AnyToNumberPipe,
    EnumMunicipioPipe,
    EnumDeptoPipe,
    EnumEducacionPipe,
    EnumCivilPipe,
    EnumIdiomaPipe,
    EnumServiciosPipe,
    EnumEstadoPipe,
    EnumSituacionPipe,
    EnumEstadiaPipe,
    DateTimePipe,
    TextToDatePipe,
    EnumStatusPipe,
    EnumReferenciaPipe,
    ExpedienteToNombrePipe,
    ResumenCitasPipe,
    WeekdayPipe,
    CapitalizeNamePipe,
    ColorizePipe,
    SafeHtmlPipe,
    HighlightWordsDirective,
    HighlightDirective,
    ShowModalDirective,
    EspacioNumerosDirective,
    DpiDirective,
    GenderPipe,
    ReporteComponent,
    EnumTipoPipe,
    TablaUisauComponent,
    DetalleUisauComponent,
    FormUisauComponent,
    LoginComponent,
    Tabcie10Component,
    RegistrosComponent,
    EstadisticaComponent,
    Formcie10Component,
    RecienacidosComponent,
    EditUisauComponent,
    Report_uisauComponent,
    Report_estdComponent,
    Report_rmComponent,
  ],
  imports: [
    RegistrosModule,
    BrowserModule,
    ModalModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      {
        path: 'pacientes',
        component: TablaPacientesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'crear',
        component: FormularioPacienteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'paciente/edit/:id',
        component: FormularioPacienteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'buscar/view/:id',
        component: BuscarComponent,
        canActivate: [AuthGuard],
      },
      { path: 'citas', component: CitasComponent, canActivate: [AuthGuard] },
      {
        path: 'agendar',
        component: FormCitaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'agenda/edit/:id',
        component: FormCitaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'emergencias',
        component: EmergenciasComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'emergencias/edit/:id',
        component: EmergenciasComponent,
        canActivate: [AuthGuard],
      },
      { path: 'coex', component: CoexComponent, canActivate: [AuthGuard] },
      {
        path: 'coex/edit/:id',
        component: CoexComponent,
        canActivate: [AuthGuard],
      },
      { path: 'tablaP', component: TablaComponent, canActivate: [AuthGuard] },
      {
        path: 'nuevaConsulta',
        component: NuevaConsultaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit/coex/:id',
        component: FormCoexComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'tablaEmergencia',
        component: TablaEmergenciaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'hClinica/view/:id',
        component: HClinicaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'ingresos',
        component: IngresosComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'ingreso',
        component: FormIngresoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'ingreso/edit/:id',
        component: FormIngresoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'ingresoTabla',
        component: IngresoTablaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'ingresohoja/view/:id',
        component: IngresoHComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'consultas',
        component: TodasComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'consulta/view/:id',
        component: ReporteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'uisau',
        component: TablaUisauComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'formUisau',
        component: FormUisauComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'contacto/:id',
        component: EditUisauComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'formUisau/new/:id',
        component: FormUisauComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'detalleUisau/:id',
        component: DetalleUisauComponent,
        canActivate: [AuthGuard],
      },
      { path: 'cie10', component: Tabcie10Component, canActivate: [AuthGuard] },
      {
        path: 'registros',
        component: RegistrosComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'estadistica',
        component: EstadisticaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'formcie10',
        component: Formcie10Component,
        canActivate: [AuthGuard],
      },
      {
        path: 'cie10edit/:id',
        component: Formcie10Component,
        canActivate: [AuthGuard],
      },
      {
        path: 'coexreport',
        component: ReporteCoexComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'recepciones',
        component: RecepciónComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'recept/:id',
        component: FormRecepcionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'rn/:id',
        component: RecienacidosComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'reportrm',
        component: Report_rmComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'reportuisau',
        component: Report_uisauComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'reportstd',
        component: Report_estdComponent,
        canActivate: [AuthGuard],
      },
    ]),
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
