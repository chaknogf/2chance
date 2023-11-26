import { servicio } from 'src/app/enums/enums';
import { Municipio, Nacionalidad, Etnias, Ecivil, Academic, Parents, Lenguage, Servicios, Especialidad, Tipos, Departamentos, Estadia, Estado, Referencia, Situacion } from './../enums/enums';


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
