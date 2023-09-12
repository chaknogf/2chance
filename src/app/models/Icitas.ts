

export interface Icitas{
  id: number;
  expediente: number;
  fecha: Date;
  especialidad: number;
  nota: string;
  estado: boolean;
  name: string;
  cirugia_programada: null| Date;
}

export interface IVistaCitas{
  id: number;
  especialidad: number;
  dia: string;
  total_citas: number;
}
