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
import { AppComponent } from './app.component';
import { DiaDeSemana } from './pipe/diaDeSemana.pipe';
import { WeekdayPipe } from './pipe/weekDay.pipe';
import { FormatoFechaPipe } from './pipe/formatoFecha.pipe'
import { GeneroPipe } from './pipe/genero.pipe'
import { EnumEspecialidadPipe, EnumNacionalidadPipe, EnumMunicipioPipe } from './pipe/enum.pipe'
import { AnyToNumberPipe } from './pipe/anyToNumber.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TablaPacientesComponent } from './pacientes/tablaPacientes/tablaPacientes.component';
import { FormularioPacienteComponent } from './pacientes/formulario-paciente/formulario-paciente.component';
import { BuscarComponent } from './pacientes/buscar/buscar.component';
import { IngresoComponent } from './pacientes/ingreso/ingreso.component';
import { CitasComponent } from './citas/citas/citas.component';
import { FormCitaComponent } from './citas/formCita/formCita.component'
import { TextToDatePipe } from './pipe/textToDate.pipe';
import { ExpedienteToNombrePipe } from './pipe/expToNombre.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'







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
    AnyToNumberPipe,
    EnumMunicipioPipe,
    TextToDatePipe,
    ExpedienteToNombrePipe,
    ResumenCitasPipe,
    WeekdayPipe


  ],
  imports: [
    BrowserModule,

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



    ]),
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
