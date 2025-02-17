
import { Nacionalidad, Etnias, Ecivil, Academic, Parents, Lenguage, Servicios, Especialidad, Tipos, Estadia, Estado, Referencia, Situacion, Serv, serv, encamamiento, Encamamiento, Tipo_citas, Consult_Coex, status, Status } from './../enums/enums';
import { Vecindad, Municipio, Departamentos } from '../enums/vencindad';
import { ClaseParto, TipoParto } from '../enums/parto';
import { Citas } from './../enums/enums';

export interface Ienum {
  municipio: Municipio[];
  nation: Nacionalidad[];
  people: Etnias[];
  ecivil: Ecivil[];
  academic: Academic[];
  parents: Parents[];
  lenguage: Lenguage[];
  servicio: Especialidad[];
  servicios: Servicios[];

}


export interface OtrosEnums {
  tipo: Tipos[]
  status?: Status[]
}

export interface deptos {
  departamentos: Departamentos[];
}

export interface uisauEnum {
  estadia: Estadia[],
  referencia: Referencia[],
  situacion: Situacion[],
  estado: Estado[]
  especialidad: Especialidad[],
  parentesco: Parents[],
  servicios: Servicios[]

}

export interface IenumCitas {
  servicio: Especialidad[];
  servicios: Servicios[];
  parents: Parents[];
  departamentos: Departamentos[];

}

export interface lugares {
  departamentos: Departamentos[];
  municipio: Municipio[];
}

export interface vecindades {
  departamentos: Departamentos[];
  municipio: Municipio[];
  vecindad: Vecindad[];
  nation?: Nacionalidad[]
}

export interface serv_espc {
  servicio: Especialidad[];
  serv: Serv[];
}

export interface partos {
  claseparto: ClaseParto[];
  tipoparto: TipoParto[];
}

export interface _citas {
  citas: Citas[];
}

export interface encamamientos {
  servicio: Especialidad[];
  serv: Serv[];
  encamamiento: Encamamiento[];
}

export interface IconsultasPor {
  consult: Consult_Coex[]
}
