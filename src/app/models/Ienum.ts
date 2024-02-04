import { servicio } from 'src/app/enums/enums';
import { Nacionalidad, Etnias, Ecivil, Academic, Parents, Lenguage, Servicios, Especialidad, Tipos, Estadia, Estado, Referencia, Situacion, Serv, serv } from './../enums/enums';
import { Vecindad, Municipio, Departamentos } from '../enums/vencindad';

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

export interface serv_espc {
  servicio: Especialidad[];
  serv: Serv[];
}
