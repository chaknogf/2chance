

export interface Icitas{
  id: number;
  expediente: number | any;
  fecha: Date | string;
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
