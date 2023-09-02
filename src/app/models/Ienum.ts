import { Municipio, Nacionalidad, Etnias, Ecivil, Academic, Parents, Lenguage, servicio, Especialidad } from './../enums/enums';


export interface Ienum {
  municipio: Municipio[];
  nation: Nacionalidad[];
  people: Etnias[];
  ecivil: Ecivil[];
  academic: Academic[];
  parents: Parents[];
  lenguage: Lenguage[];


}

export interface IenumEspecialidad {
  servicio: Especialidad[]
}
