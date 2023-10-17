import { Time } from "@angular/common";

export interface Iconcultas {
  id: number;
  hoja_emergencia: string | null;
  expediente: number | null | any;
  fecha_consulta: string | null;
  hora: string | null;
  nombres: string | null;
  apellidos: string |null;
  nacimiento: string | Date | null;
  edad: string | null;
  sexo: string | null;
  dpi: string| null;
  direccion: string| null;
  acompa: string | null;
  parente: number | null
  telefono: string| null;
  especialidad: number | null;
  servicio: number | null;
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
  nacimiento: Date | string;
  tipo_consulta: number;
  recepcion: boolean;
}

export interface IVistaCoex {
  id: number;
  expediente: string;
  fecha_consulta: string;
  nombre: string;
  apellidos: string;
  nacimiento: Date | string;
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
  nacimiento: Date |string;
  tipo_consulta: number;
  especialidad: number;
  fecha_egreso: Date;
  recepcion: boolean;
}


