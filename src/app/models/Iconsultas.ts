import { Time } from "@angular/common";

export interface Iconcultas {
  id: number;
  hoja_emergencia: string | null;
  expediente: string | null;
  fecha_consulta: string | null;
  hora: string | null;
  nombre: string | null;
  apellidos: string |null;
  nacimiento: string | null;
  edad: string | null;
  sexo: string | null;
  dpi: string| null;
  direccion: string| null;
  acompa: string| null;
  telefono: string| null;
  especialidad: number| null;
  recepcion: boolean| null;
  fecha_recepcion: string| null;
  fecha_egreso: string| null;
  tipo_consulta: number| null;
  nota: string| null;
  name: string| null;
  lastname: string| null;
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


