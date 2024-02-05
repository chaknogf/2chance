export interface ClaseParto {
  value: number;
  label: string;
}


export const claseParto: ClaseParto[] = [
  { value: 1, label: 'Parto Normal' },
  { value: 2, label: 'Cesárea' },
]

export interface TipoParto {
  value: number;
  label: string;
}


export const tipoParto: TipoParto[] = [
  { value: 1, label: 'Simple' },
  { value: 2, label: 'Doble' },
  { value: 3, label: 'Multiple' },
]


