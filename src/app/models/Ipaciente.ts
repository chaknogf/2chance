



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
  depto_nac: number;
  lugar_nacimiento: number;
  estado_civil: number;
  educacion: number;
  pueblo: number;
  idioma: number;
  ocupacion: string;
  direccion: string;
  municipio: number | null;
  depto: number | null;
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
  gemelo: string;
  created_by: string;
  fechaDefuncion: string | Date;
  created_at: string | null;
  update_at: string | null;
  conyugue: string | null | any
  exp_ref?: number | null


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

