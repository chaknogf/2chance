import { Time } from "@angular/common";

export interface Iconcultas {
  id: number;
  hoja_emergencia: string;
  expediente: string;
  fecha_consulta: string;
  hora: string;
  nombre: string;
  apellidos: string;
  nacimiento: Date;
  edad: string;
  sexo: string;
  dpi: string;
  direccion: string;
  acompa: string;
  telefono: string;
  especialidad: number;
  recepcion: boolean;
  fecha_recepcion: string;
  fecha_egreso: Date;
  tipo_consulta: number;
  nota: string;
  name: string;
  lastname: string;
}


export interface IVistaEmergencia {
  id: number;
  hoja_emergencia: string;
  expediente: string;
  fecha_consulta: string;
  nombre: string;
  apellidos: string;
  nacimiento: Date;
  tipo_consulta: number;
  recepcion: boolean;
}

export interface IVistaCoex {
  id: number;
  expediente: string;
  fecha_consulta: string;
  nombre: string;
  apellidos: string;
  nacimiento: Date;
  tipo_consulta: number;
  especialidad: number;
  recepcion: boolean;
}

export interface IVistaIngreso {
  id: number;
  expediente: string;
  fecha_consulta: string;
  nombre: string;
  apellidos: string;
  nacimiento: Date;
  tipo_consulta: number;
  especialidad: number;
  fecha_egreso: Date;
  recepcion: boolean;
}


