import { Municipio, Nacionalidad, Etnias, Ecivil, Academic, Parents, Lenguage, Servicios, Especialidad, Tipos, tipo } from './../enums/enums';


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
