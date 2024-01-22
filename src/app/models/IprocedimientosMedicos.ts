export interface Iabreviaturas {
    id: number
    abreviatura: string
    procedimiento: string

}

export interface IproceMedico {
    id: number
    fecha: string | null | any
    servicio: number | null | any
    sexo: string | null | any
    abreviatura: string | any |null
    procedimiento: string | null | any
    especialidad: number | null | any
    cantidad: number | null | any
    medico: number | null | any
    created_by: string | null | any
}
