

export interface Icitas{
  id: number;
  expediente: number | any | null;
  fecha: Date | string | null;
  especialidad: number | null;
  nota: string | null;
  estado: boolean | null;
  cirugia_programada: null | Date;
  created_by: string | null;
  name: string | null;
}

export interface IVistaCitas{
  id: number;
  especialidad: number;
  dia: string;
  total_citas: number;
}
