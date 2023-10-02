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
import { GeneroPipe } from './pipe/genero.pipe';
import {
  EnumEspecialidadPipe, EnumNacionalidadPipe, EnumMunicipioPipe,
  EnumEducacionPipe, EnumCivilPipe, EnumIdiomaPipe,
  EnumParentescoPipe, EnumEtniaPipe,
} from './pipe/enum.pipe'
import { AnyToNumberPipe } from './pipe/anyToNumber.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TablaPacientesComponent } from './pacientes/tablaPacientes/tablaPacientes.component';
import { FormularioPacienteComponent } from './pacientes/formulario-paciente/formulario-paciente.component';
import { BuscarComponent } from './pacientes/buscar/buscar.component';
import { IngresoComponent } from './pacientes/ingreso/ingreso.component';
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









const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'pacientes', component: TablaPacientesComponent },
  { path: 'crear', component: FormularioPacienteComponent },
  { path: 'paciente/edit/:id', component: FormularioPacienteComponent },
  { path: 'buscar/view/:id', component: BuscarComponent},
  { path: 'ingreso/view/:id', component: IngresoComponent },
  { path: 'citas', component: CitasComponent },
  { path: 'agendar', component: FormCitaComponent },
  { path: 'agenda/edit/:id', component: FormCitaComponent },
  { path: 'emergencias', component: EmergenciasComponent },
  { path: 'emergencias/edit/:id', component: EmergenciasComponent },
  { path: 'coex', component: CoexComponent },
  { path: 'coex/edit/:id', component: CoexComponent },
  { path: 'tablaP', component: TablaComponent },
  { path: 'nuevaConsulta', component: NuevaConsultaComponent },
  { path: 'edit/coex/:id', component: FormCoexComponent},





]




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
    IngresoComponent,
    FormCitaComponent,
    DiaDeSemana,
    FormatoFechaPipe,
    GeneroPipe,
    EnumEspecialidadPipe,
    EnumNacionalidadPipe,
    EnumParentescoPipe,
    EnumEtniaPipe,
    AnyToNumberPipe,
    EnumMunicipioPipe,
    EnumEducacionPipe,
    EnumCivilPipe,
    EnumIdiomaPipe,
    TextToDatePipe,
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
      { path: 'ingreso/view/:id', component: IngresoComponent },
      { path: 'citas', component: CitasComponent },
      { path: 'agendar', component: FormCitaComponent },
      { path: 'agenda/edit/:id', component: FormCitaComponent },
      { path: 'emergencias', component: EmergenciasComponent },
      { path: 'coex', component: CoexComponent },
      { path: 'coex/edit/:id', component: CoexComponent },
      { path: 'tablaP', component: TablaComponent },
      { path: 'nuevaConsulta', component: NuevaConsultaComponent },
      { path: 'edit/coex/:id', component: FormCoexComponent},


    ]),
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
