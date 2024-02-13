import { Time } from "@angular/common";

export interface IconsNac {

  id: number;
  fecha: Date | any;
  cor: number | null;
  ao: number | null;
  doc: string | null;
  fecha_parto: Date | null;
  madre: string | null;
  dpi: number | null | any;
  passport: string | null;
  libro: number | null;
  folio: number | null;
  partida: number | null;
  depto: number | null;
  muni: number | null;
  edad: any | null;
  vecindad: number | null;
  sexo_rn: string | null;
  lb: number | null;
  onz: number | null;
  hora: Time| null;
  medico: string | any ;
  colegiado: number | any;
  dpi_medico: number | any;
  hijos: number | any;
  vivos: number | any;
  muertos: number | any;
  tipo_parto: number | null;
  clase_parto: number | null;
  certifica: string | any;
  create_by: string | null;
  expediente: number;
  nacionalidad: string | null;
  pais: string | null;

 }
