

export interface Icitas{
  id: number;
  expediente?: number | any | null;
  fecha?: Date | string | null;
  especialidad: number;
  nota?: string | null;
  tipo: number;
  fecha_cita?: Date | any;
  created_by?: string | null;
  name?: string | null;
}

export interface IVistaCitas{
  id: number;
  especialidad: number;
  dia: string;
  total_citas: number;
}
