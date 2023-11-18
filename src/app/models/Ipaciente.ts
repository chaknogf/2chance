import { municipio } from 'src/app/enums/enums';
import { Municipio } from './../enums/enums';
import { Nacionalidad, nation } from "../enums/enums";





export interface Ipaciente {
  // [key: string]: string | number | boolean | Date | Nacionalidad[]| Municipio[]  ;
  id: number;
  expediente: number;
  nombre: string ;
  apellido: string;
  dpi: number;
  pasaporte: string;
  sexo: string;
  nacimiento: Date | any ;
  nacionalidad: number;
  lugar_nacimiento: number;
  estado_civil: number;
  educacion: number;
  pueblo: number;
  idioma: number;
  ocupacion: string;
  direccion: string;
  municipio: number;
  depto: number;
  telefono: string;
  email: string;
  padre: string;
  madre: string;
  responsable: string;
  parentesco: number;
  dpi_responsable: number;
  telefono_responsable: number;
  estado: string;
  exp_madre: number;
  created_by: string;
  fechaDefuncion: string | Date;
  created_at: string;
  update_at: string;


}

export interface Iv_paciente {
  nombre: string,
  expediente: number,
  sexo: string,
  apellido: string,
  nacimiento: string,
  id: number,
  dpi: number,
  estado: string
}

