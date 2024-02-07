

export interface Icitas{
  id: number;
  expediente: number | any | null;
  fecha: Date | string | null;
  especialidad: number | null;
  nota: string | null;
  tipo: number | null;
  fecha_cita: any | Date;
  created_by: string | null;
  name: string | null;
}

export interface IVistaCitas{
  id: number;
  especialidad: number;
  dia: string;
  total_citas: number;
}
