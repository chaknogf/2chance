

export interface Especialidad {
  value: number;
  label: string;
}

export const servicio: Especialidad[] = [
  { value: 1, label: 'Medicina Interna' },
  { value: 2, label: 'Pediatria' },
  { value: 3, label: 'Ginecologia y Obstetricia' },
  { value: 4, label: 'Cirugia' },
  { value: 5, label: 'Traumatologia' },
  { value: 6, label: 'Psicologia' },
  { value: 7, label: 'Nutrición' },

]

export interface Tipos {
  value: number;
  label: string;
}

export const tipo: Tipos[] = [
  { value: 1, label: 'Coex' },
  { value: 2, label: 'Hosp' },
  { value: 3, label: 'Emergencia' },


]
export interface Servicios {
  value: number;
  label: string;
}
export const servicios: Servicios[] = [
  { value: 1, label: 'SOP' },
  { value: 2, label: 'Maternidad' },
  { value: 3, label: 'Ginecologia' },
  { value: 4, label: 'Cirugia' },
  { value: 5, label: 'Cirugia pedia' },
  { value: 6, label: 'Trauma' },
  { value: 7, label: 'Trauma pedia' },
  { value: 8, label: 'CRN' },
  { value: 9, label: 'Pediatria' },
  { value: 10, label: 'RN' },
  { value: 11, label: 'Neonatos' },
  { value: 12, label: 'Medicina hombres' },
  { value: 13, label: 'Medicina mujeres' },
  { value: 14, label: 'vsvs' },
  { value: 15, label: 'Covid' },
  { value: 16, label: 'labor & parto' },
  { value: 15, label: 'area roja emergencia' },




]



export interface Nacionalidad {
  value: number;
  label: string;
}
export const nation: Nacionalidad[] = [

    { value: 1, label: 'Guatemalteca' },
    { value: 2, label: 'Beliceña' },
    { value: 3, label: 'Salvadoreña' },
    { value: 4, label: 'Hondureña' },
    { value: 5, label: 'Nicaragüense' },
    { value: 6, label: 'Costarricense' },
    { value: 7, label: 'Panameña' },
    { value: 8, label: 'Mexicana' },
    { value: 9, label: 'Otro pais' },
    { value: 0, label: 'No indica' },

  ]


export interface Municipio {
  value: number;
  label: string;
  depto: number;
}

export const municipio: Municipio[] = [

  { value: 101, label: "Guatemala", depto: 1 },
  { value: 101, label: "Guatemala", depto: 1  },
  { value: 102, label: "Santa Catarina Pinula", depto: 1  },
  { value: 103, label: "San José Pinula", depto: 1  },
  { value: 104, label: "San José del Golfo", depto: 1  },
  { value: 105, label: "Palencia", depto: 1  },
  { value: 106, label: "Chinautla", depto: 1  },
  { value: 107, label: "San Pedro Ayampuc", depto: 1  },
  { value: 108, label: "Mixco", depto: 1  },
  { value: 109, label: "San Pedro Sacatepéquez", depto: 1  },
  { value: 110, label: "San Juan Sacatepéquez", depto: 1  },
  { value: 111, label: "San Raymundo", depto: 1  },
  { value: 112, label: "Chuarrancho", depto: 1  },
  { value: 113, label: "Fraijanes", depto: 1  },
  { value: 114, label: "Amatitlán", depto: 1  },
  { value: 115, label: "Villa Nueva", depto: 1  },
  { value: 116, label: "Villa Canales", depto: 1  },
  { value: 117, label: "San Miguel Petapa", depto: 1  },
  { value: 201, label: "Guastatoya", depto: 2  },
  { value: 202, label: "Morazán", depto: 2 },
  { value: 203, label: "San Agustín Acasaguastlán", depto: 2  },
  { value: 204, label: "San Cristóbal Acasaguastlán", depto: 2 },
  { value: 205, label: "El Jícaro", depto: 2 },
  { value: 206, label: "Sansare", depto: 2 },
  { value: 207, label: "Sanarate", depto: 2 },
  { value: 208, label: "San Antonio La Paz", depto: 2 },
  { value: 301, label: "Antigua Guatemala", depto: 3 },
  { value: 302, label: "Jocotenango", depto: 3 },
  { value: 303, label: "Pastores", depto: 3 },
  { value: 304, label: "Sumpango", depto: 3 },
  { value: 305, label: "Santo Domingo Xenacoj", depto: 3 },
  { value: 306, label: "Santiago Sacatepéquez", depto: 3 },
  { value: 307, label: "San Bartolomé Milpas Altas", depto: 3 },
  { value: 308, label: "San Lucas Sacatepéquez", depto: 3 },
  { value: 309, label: "Santa Lucía Milpas Altas", depto: 3 },
  { value: 310, label: "Magdalena Milpas Altas", depto: 3 },
  { value: 311, label: "Santa María de Jesús", depto: 3 },
  { value: 312, label: "Ciudad Vieja", depto: 3 },
  { value: 313, label: "San Miguel Dueñas", depto: 3 },
  { value: 314, label: "San Juan Alotenango", depto: 3 },
  { value: 315, label: "San Antonio Aguas Calientes", depto: 3 },
  { value: 316, label: "Santa Catarina Barahona", depto: 3 },
  { value: 401, label: "Chimaltenango", depto: 4 },
  { value: 402, label: "San José Poaquil", depto: 4 },
  { value: 403, label: "San Martín Jilotepeque", depto: 4 },
  { value: 404, label: "San Juan Comalapa", depto: 4 },
  { value: 405, label: "Santa Apolonia", depto: 4 },
  { value: 406, label: "Tecpán Guatemala", depto: 4 },
  { value: 407, label: "Patzún", depto: 4 },
  { value: 408, label: "San Miguel Pochuta", depto: 4 },
  { value: 409, label: "Patzicía", depto: 4 },
  { value: 410, label: "Santa Cruz Balanyá", depto: 4 },
  { value: 411, label: "Acatenango", depto: 4 },
  { value: 412, label: "San Pedro Yepocapa", depto: 4 },
  { value: 413, label: "San Andrés Itzapa", depto: 4 },
  { value: 414, label: "Parramos", depto: 4 },
  { value: 415, label: "Zaragoza", depto: 4 },
  { value: 416, label: "El Tejar", depto: 4 },
  { value: 501, label: "Escuintla", depto: 5 },
  { value: 502, label: "Santa Lucía Cotzumalguapa", depto: 5 },
  { value: 503, label: "La Democracia", depto: 5 },
  { value: 504, label: "Siquinalá", depto: 5 },
  { value: 505, label: "Masagua", depto: 5 },
  { value: 506, label: "Tiquisate", depto: 5 },
  { value: 507, label: "La Gomera", depto: 5 },
  { value: 508, label: "Guanagazapa", depto: 5 },
  { value: 509, label: "San José", depto: 5 },
  { value: 510, label: "Iztapa", depto: 5 },
  { value: 511, label: "Palín", depto: 5 },
  { value: 512, label: "San Vicente Pacaya", depto: 5 },
  { value: 513, label: "Nueva Concepción", depto: 5 },
  { value: 514, label: "Sipacate", depto: 5 },
  { value: 601, label: "Cuilapa", depto: 6 },
  { value: 602, label: "Barberena", depto: 6 },
  { value: 603, label: "Santa Rosa de Lima", depto: 6 },
  { value: 604, label: "Casillas", depto: 6 },
  { value: 605, label: "San Rafael Las Flores", depto: 6 },
  { value: 606, label: "Oratorio", depto: 6 },
  { value: 607, label: "San Juan Tecuaco", depto: 6 },
  { value: 608, label: "Chiquimulilla", depto: 6 },
  { value: 609, label: "Taxisco", depto: 6 },
  { value: 610, label: "Santa María Ixhuatán", depto: 6 },
  { value: 611, label: "Guazacapán", depto: 6 },
  { value: 612, label: "Santa Cruz Naranjo", depto: 6 },
  { value: 613, label: "Pueblo Nuevo Viñas", depto: 6 },
  { value: 701, label: "Sololá", depto: 7 },
  { value: 702, label: "San José Chacayá", depto: 7 },
  { value: 703, label: "Santa María Visitación", depto: 7 },
  { value: 704, label: "Santa Lucía Utatlán", depto: 7 },
  { value: 705, label: "Nahualá", depto: 7 },
  { value: 706, label: "Santa Catarina Ixtahuacan", depto: 7 },
  { value: 707, label: "Santa Clara La Laguna", depto: 7 },
  { value: 708, label: "Concepción", depto: 7 },
  { value: 709, label: "San Andrés Semetabaj", depto: 7 },
  { value: 710, label: "Panajachel", depto: 7 },
  { value: 711, label: "Santa Catarina Palopó", depto: 7 },
  { value: 712, label: "San Antonio Palopó", depto: 7 },
  { value: 713, label: "San Lucas Tolimán", depto: 7 },
  { value: 714, label: "Santa Cruz La Laguna", depto: 7 },
  { value: 715, label: "San Pablo La Laguna", depto: 7 },
  { value: 716, label: "San Marcos La Laguna", depto: 7 },
  { value: 717, label: "San Juan La Laguna", depto: 7 },
  { value: 718, label: "San Pedro La Laguna", depto: 7 },
  { value: 719, label: "Santiago Atitlán", depto: 7 },
  { value: 801, label: "Totonicapán", depto: 8 },
  { value: 802, label: "San Cristóbal Totonicapán", depto: 8 },
  { value: 803, label: "San Francisco El Alto", depto: 8 },
  { value: 804, label: "Santa Lucía La Reforma", depto: 8 },
  { value: 805, label: "San Andrés Xecul", depto: 8 },
  { value: 806, label: "Momostenango", depto: 8 },
  { value: 807, label: "Santa María Chiquimula", depto: 8 },
  { value: 808, label: "Santa María de Jesús", depto: 8 },
  { value: 901, label: "Quetzaltenango", depto: 9 },
  { value: 902, label: "Salcajá", depto: 9 },
  { value: 903, label: "Olintepeque", depto: 9 },
  { value: 904, label: "San Carlos Sija", depto: 9 },
  { value: 905, label: "Sibilia", depto: 9 },
  { value: 906, label: "Cabricán", depto: 9 },
  { value: 907, label: "Cajolá", depto: 9 },
  { value: 908, label: "San Miguel Siguilá", depto: 9 },
  { value: 909, label: "Ostuncalco", depto: 9 },
  { value: 910, label: "San Mateo", depto: 9 },
  { value: 911, label: "Concepción Chiquirichapa", depto: 9 },
  { value: 912, label: "San Martín Sacatepéquez", depto: 9 },
  { value: 913, label: "Almolonga", depto: 9 },
  { value: 914, label: "Cantel", depto: 9 },
  { value: 915, label: "Huitán", depto: 9 },
  { value: 916, label: "Zunil", depto: 9 },
  { value: 917, label: "Colomba", depto: 9 },
  { value: 918, label: "San Francisco La Unión", depto: 9 },
  { value: 919, label: "El Palmar", depto: 9 },
  { value: 920, label: "Coatepeque", depto: 9 },
  { value: 921, label: "Genova", depto: 9 },
  { value: 1001, label: "Mazatenango", depto: 10 },
  { value: 1002, label: "Cuyotenango", depto: 10 },
  { value: 1003, label: "San Francisco Zapotitlán", depto: 10 },
  { value: 1004, label: "San Bernardino", depto: 10 },
  { value: 1005, label: "San José El Ídolo", depto: 10 },
  { value: 1006, label: "Santo Domingo Suchitepéquez", depto: 10 },
  { value: 1007, label: "San Lorenzo", depto: 10 },
  { value: 1008, label: "Samayac", depto: 10 },
  { value: 1009, label: "San Pablo Jocopilas", depto: 10 },
  { value: 1010, label: "San Antonio Suchitepéquez", depto: 10 },
  { value: 1011, label: "San Miguel Panán", depto: 10 },
  { value: 1012, label: "San Gabriel", depto: 10 },
  { value: 1013, label: "Chicacao", depto: 10 },
  { value: 1014, label: "Patulul", depto: 10 },
  { value: 1015, label: "Santa Bárbara", depto: 10 },
  { value: 1016, label: "San Juan Bautista", depto: 10 },
  { value: 1017, label: "Santo Tomás La Unión", depto: 10 },
  { value: 1018, label: "Zunilito", depto: 10 },
  { value: 1019, label: "Pueblo Nuevo", depto: 10 },
  { value: 1101, label: "Retalhuleu", depto: 11 },
  { value: 1102, label: "San Sebastián", depto: 11 },
  { value: 1103, label: "Santa Cruz Muluá", depto: 11 },
  { value: 1104, label: "San Martín Zapotitlán", depto: 11 },
  { value: 1105, label: "San Felipe", depto: 11 },
  { value: 1106, label: "San Andrés Villa Seca", depto: 11 },
  { value: 1107, label: "Champerico", depto: 11 },
  { value: 1108, label: "Nuevo San Carlos", depto: 11 },
  { value: 1201, label: "San Marcos", depto: 12 },
  { value: 1202, label: "San Pedro Sacatepéquez", depto: 12 },
  { value: 1203, label: "San Antonio Sacatepéquez", depto: 12 },
  { value: 1204, label: "Comitancillo", depto: 12 },
  { value: 1205, label: "San Miguel Ixtahuacán", depto: 12 },
  { value: 1206, label: "Concepción Tutuapa", depto: 12 },
  { value: 1207, label: "Tacaná", depto: 12 },
  { value: 1208, label: "Sibinal", depto: 12 },
  { value: 1209, label: "Tajumulco", depto: 12 },
  { value: 1210, label: "Tejutla", depto: 12 },
  { value: 1211, label: "San Rafael Pie de la Cuesta", depto: 12 },
  { value: 1212, label: "Nuevo Progreso", depto: 12 },
  { value: 1213, label: "El Tumbador", depto: 12 },
  { value: 1214, label: "El Rodeo", depto: 12 },
  { value: 1215, label: "Malacatán", depto: 12 },
  { value: 1216, label: "Catarina", depto: 12 },
  { value: 1217, label: "Ayutla", depto: 12 },
  { value: 1218, label: "Ocos", depto: 12 },
  { value: 1219, label: "San Pablo", depto: 12 },
  { value: 1220, label: "El Quetzal", depto: 12 },
  { value: 1221, label: "La Reforma", depto: 12 },
  { value: 1222, label: "Pajapita", depto: 12 },
  { value: 1223, label: "Ixchiguán", depto: 12 },
  { value: 1301, label: "Huehuetenango", depto: 13 },
  { value: 1302, label: "Chiantla", depto: 13 },
  { value: 1303, label: "Malacatancito", depto: 13 },
  { value: 1304, label: "Cuilco", depto: 13 },
  { value: 1305, label: "Nentón", depto: 13 },
  { value: 1306, label: "San Pedro Necta", depto: 13 },
  { value: 1307, label: "Jacaltenango", depto: 13 },
  { value: 1308, label: "Soloma", depto: 13 },
  { value: 1309, label: "Ixtahuacán", depto: 13 },
  { value: 1310, label: "Santa Bárbara", depto: 13 },
  { value: 1311, label: "La Libertad", depto: 13 },
  { value: 1312, label: "La Democracia", depto: 13 },
  { value: 1313, label: "San Miguel Acatán", depto: 13 },
  { value: 1314, label: "San Rafael La Independencia", depto: 13 },
  { value: 1315, label: "Todos Santos Cuchumatán", depto: 13 },
  { value: 1316, label: "San Juan Atitán", depto: 13 },
  { value: 1317, label: "Santa Eulalia", depto: 13 },
  { value: 1318, label: "San Mateo Ixtatán", depto: 13 },
  { value: 1319, label: "Colotenango", depto: 13 },
  { value: 1320, label: "San Sebastián Coatán", depto: 13 },
  { value: 1321, label: "Concepción Huista", depto: 13 },
  { value: 1322, label: "San Juan Ixcoy", depto: 13 },
  { value: 1323, label: "San Antonio Huista", depto: 13 },
  { value: 1324, label: "San Sebastián Huehuetenango", depto: 13 },
  { value: 1325, label: "Santa Cruz Barillas", depto: 13 },
  { value: 1326, label: "San Gaspar Ixchil", depto: 13 },
  { value: 1327, label: "Aguacatán", depto: 13 },
  { value: 1328, label: "San Rafael Pétzal", depto: 13 },
  { value: 1329, label: "San Gaspar Ixchil", depto: 13 },
  { value: 1330, label: "Santiago Chimaltenango", depto: 13 },
  { value: 1331, label: "Santa Ana Huista", depto: 13 },
  { value: 1401, label: "Santa Cruz del Quiché", depto: 14 },
  { value: 1402, label: "Chiché", depto: 14 },
  { value: 1403, label: "Chinique", depto: 14 },
  { value: 1404, label: "Zacualpa", depto: 14 },
  { value: 1405, label: "Chajul", depto: 14 },
  { value: 1406, label: "Chichicastenango", depto: 14 },
  { value: 1407, label: "Patzité", depto: 14 },
  { value: 1408, label: "San Antonio Ilotenango", depto: 14 },
  { value: 1409, label: "San Pedro Jocopilas", depto: 14 },
  { value: 1410, label: "Cunén", depto: 14 },
  { value: 1411, label: "San Juan Cotzal", depto: 14 },
  { value: 1412, label: "Joyabaj", depto: 14 },
  { value: 1413, label: "Santa María Nebaj", depto: 14 },
  { value: 1414, label: "San Andrés Sajcabajá", depto: 14 },
  { value: 1415, label: "San Miguel Uspantán", depto: 14 },
  { value: 1416, label: "Sacapulas", depto: 14 },
  { value: 1417, label: "San Bartolomé Jocotenango", depto: 14 },
  { value: 1418, label: "Canillá", depto: 14 },
  { value: 1419, label: "Chicamán", depto: 14 },
  { value: 1420, label: "Playa Grande Ixcán", depto: 14 },
  { value: 1421, label: "Pachalum", depto: 14 },
  { value: 1501, label: "Salamá", depto: 15 },
  { value: 1502, label: "San Miguel Chicaj", depto: 15 },
  { value: 1503, label: "Rabinal", depto: 15 },
  { value: 1504, label: "Cubulco", depto: 15 },
  { value: 1505, label: "Granados", depto: 15 },
  { value: 1506, label: 'Santa Cruz El Chol', depto: 15 },
  { value: 1507, label: 'San Jerónimo', depto: 15 },
  { value: 1508, label: 'Purulhá', depto: 15 },
  { value: 1601, label: 'Cobán', depto: 16 },
  { value: 1602, label: 'Santa Cruz Verapaz', depto: 16 },
  { value: 1603, label: 'San Cristóbal Verapaz', depto: 16 },
  { value: 1604, label: 'Tactic', depto: 16 },
  { value: 1605, label: 'Tamahú', depto: 16 },
  { value: 1606, label: 'San Miguel Tucurú', depto: 16 },
  { value: 1607, label: 'Panzós', depto: 16 },
  { value: 1608, label: 'Senahú', depto: 16 },
  { value: 1609, label: 'San Pedro Carchá', depto: 16 },
  { value: 1610, label: 'San Juan Chamelco', depto: 16 },
  { value: 1611, label: 'San Agustín Lanquín', depto: 16 },
  { value: 1612, label: 'Santa María Cahabón', depto: 16 },
  { value: 1613, label: 'Chisec', depto: 16 },
  { value: 1614, label: 'Chahal', depto: 16 },
  { value: 1615, label: 'Fray Bartolomé de Las Casas', depto: 16 },
  { value: 1616, label: 'Santa Catalina La Tinta', depto: 16 },
  { value: 1617, label: 'Raxruhá', depto: 16 },
  { value: 1701, label: 'Flores', depto: 17 },
  { value: 1702, label: 'San José', depto: 17 },
  { value: 1703, label: 'San Benito', depto: 17 },
  { value: 1704, label: 'San Andrés', depto: 17 },
  { value: 1705, label: 'La Libertad', depto: 17 },
  { value: 1706, label: 'San Francisco', depto: 17 },
  { value: 1707, label: 'Santa Ana', depto: 17 },
  { value: 1708, label: 'Dolores', depto: 17 },
  { value: 1709, label: 'San Luis', depto: 17 },
  { value: 1710, label: 'Sayaxché', depto: 17 },
  { value: 1711, label: 'Melchor de Mencos', depto: 17 },
  { value: 1712, label: 'Poptún', depto: 17 },
  { value: 1713, label: 'Las Cruces', depto: 17 },
  { value: 1714, label: 'El Chal', depto: 17 },
  { value: 1801, label: 'Puerto Barrios', depto: 18 },
  { value: 1802, label: 'Livingston', depto: 18 },
  { value: 1803, label: 'El Estor', depto: 18 },
  { value: 1804, label: 'Morales', depto: 18 },
  { value: 1805, label: 'Los Amates', depto: 18 },
  { value: 1901, label: 'Zacapa', depto: 19 },
  { value: 1902, label: 'Estanzuela', depto: 19 },
  { value: 1903, label: 'Río Hondo', depto: 19 },
  { value: 1904, label: 'Gualán', depto: 19 },
  { value: 1905, label: 'Teculután', depto: 19 },
  { value: 1906, label: 'Usumatlán', depto: 19 },
  { value: 1907, label: 'Cabañas', depto: 19 },
  { value: 1908, label: 'San Diego', depto: 19 },
  { value: 1909, label: 'La Unión', depto: 19 },
  { value: 1910, label: 'Huité', depto: 19 },
  { value: 1911, label: 'San Jorge', depto: 19 },
  { value: 2001, label: 'Chiquimula', depto: 20 },
  { value: 2002, label: 'San José La Arada', depto: 20 },
  { value: 2003, label: 'San Juan Ermita' , depto: 20 },
  { value: 2004, label: 'Jocotán Chiquimula', depto: 20 },
  { value: 2005, label: 'Camotán Chiquimula', depto: 20 },
  { value: 2006, label: 'Olopa Chiquimula', depto: 20 },
  { value: 2007, label: 'Esquipulas', depto: 20 },
  { value: 2008, label: 'Concepción Las Minas Chiquimula', depto: 20 },
  { value: 2009, label: 'Quezaltepeque Chiquimula', depto: 20 },
  { value: 2010, label: 'San Jacinto Chiquimula', depto: 20 },
  { value: 2011, label: 'Ipala Chiquimula', depto: 20 },
  { value: 2101, label: 'Jalapa', depto: 21 },
  { value: 2102, label: 'San Pedro Pinula', depto: 21 },
  { value: 2103, label: 'San Luis Jilotepeque', depto: 21 },
  { value: 2104, label: 'San Manuel Chaparrón', depto: 21 },
  { value: 2105, label: 'San Carlos Alzatate', depto: 21 },
  { value: 2106, label: 'Monjas', depto: 21 },
  { value: 2107, label: 'Mataquescuintla', depto: 21 },
  { value: 2201, label: 'Jutiapa', depto: 22 },
  { value: 2202, label: 'El Progreso', depto: 22 },
  { value: 2203, label: 'Santa Catarina Mita', depto: 22 },
  { value: 2204, label: 'Agua Blanca', depto: 22 },
  { value: 2205, label: 'Asunción Mita', depto: 22 },
  { value: 2206, label: 'Yupiltepeque', depto: 22 },
  { value: 2207, label: 'Atescatempa', depto: 22 },
  { value: 2208, label: 'Jerez', depto: 22 },
  { value: 2209, label: 'El Adelanto', depto: 22 },
  { value: 2210, label: 'Zapotitlán', depto: 22 },
  { value: 2211, label: 'Comapa', depto: 22 },
  { value: 2212, label: 'Jalpatagua', depto: 22 },
  { value: 2213, label: 'Conguaco', depto: 22 },
  { value: 2214, label: 'Moyuta', depto: 22 },
  { value: 2215, label: 'Pasaco', depto: 22 },
  { value: 2216, label: 'San José Acatempa', depto: 22 },
  { value: 2217, label: 'Quesada', depto: 22 }
]

export interface Departamentos {
  value: number;
  label: string;
}

export const departamentos: Departamentos[] = [
  { value: 1, label: 'Guatemala' },
  { value: 2, label: 'El Progreso' },
  { value: 3, label: 'Sacatepéquez' },
  { value: 4, label: 'Chimaltenango' },
  { value: 5, label: 'Escuintla' },
  { value: 6, label: 'Santa Rosa' },
  { value: 7, label: 'Sololá' },
  { value: 8, label: 'Totonicapán' },
  { value: 9, label: 'Quetzaltenango' },
  { value: 10, label: 'Suchitepéquez' },
  { value: 11, label: 'Retalhuleu' },
  { value: 12, label: 'San Marcos' },
  { value: 13, label: 'Huehuetenango' },
  { value: 14, label: 'Quiché' },
  { value: 15, label: 'Baja Verapaz' },
  { value: 16, label: 'Alta Verapaz' },
  { value: 17, label: 'Petén' },
  { value: 18, label: 'Izabal' },
  { value: 19, label: 'Zacapa' },
  { value: 20, label: 'Chiquimula' },
  { value: 21, label: 'Jalapa' },
  { value: 22, label: 'Jutiapa' }

]
export interface Etnias{
  value: number;
  label: string;
}

export const etnias: Etnias[] = [
  { value: 1, label: 'Ladino' },
  { value: 2, label: 'Maya' },
  { value: 3, label: 'Garífuna' },
  { value: 4, label: 'Xinca' },
  { value: 5, label: 'Otros' },
  { value: 6, label: 'No indica' },
]

export interface Ecivil{
  value: number;
  label: string;
}

export const ecivil: Ecivil[] = [
  { value: 1, label: 'Casado' },
  { value: 2, label: 'Unido' },
  { value: 3, label: 'Soltero' },
]

export interface Academic{
  value: number;
  label: string;
}

export const academic: Academic[] = [
  { value: 1, label: 'No aplica' },
  { value: 2, label: 'Pre Primaria' },
  { value: 3, label: 'Primaria' },
  { value: 4, label: 'Básicos' },
  { value: 5, label: 'Diversificado' },
  { value: 6, label: 'Universidad' },
  { value: 7, label: 'Ninguno' },
  { value: 8, label: 'Otro' },
  { value: 9, label: 'No indica' },
]

export interface Parents{
  value: number;
  label: string;
}

export const parents: Parents[] = [
  { value: 1, label: 'Madre/Padre' },
  { value: 2, label: 'Hijo/a' },
  { value: 3, label: 'Hermano/a' },
  { value: 4, label: 'Abuelo/a' },
  { value: 5, label: 'Tío/a' },
  { value: 6, label: 'Primo/a' },
  { value: 7, label: 'Sobrino/a' },
  { value: 8, label: 'Yerno/Nuera' },
  { value: 9, label: 'Esposo/a' },
  { value: 10, label: 'Suegro/a' },
  { value: 11, label: 'Tutor' },
  { value: 12, label: 'Amistad' },
  { value: 13, label: 'Novio/a' },
  { value: 14, label: 'Cuñado/a' },
  { value: 15, label: 'Nieto/a' },
  { value: 16, label: 'Hijastros' },
  { value: 17, label: 'Padrastros' },
  { value: 18, label: 'Otro' },
]

export interface Lenguage{
  value: number;
  label: string;
}

export const lenguaje: Lenguage[] = [
  { value: 1, label: 'Achi' },
  { value: 2, label: 'Akateka' },
  { value: 3, label: 'Awakateka' },
  { value: 4, label: 'Chorti' },
  { value: 5, label: 'Chalchiteka' },
  { value: 6, label: 'Chuj' },
  { value: 7, label: 'Itza' },
  { value: 8, label: 'Ixil' },
  { value: 9, label: 'Jakalteka' },
  { value: 10, label: 'Kaqchikel' },
  { value: 11, label: 'Kiche' },
  { value: 12, label: 'Mam' },
  { value: 13, label: 'Mopan' },
  { value: 14, label: 'Poqomam' },
  { value: 15, label: 'Pocomchi' },
  { value: 16, label: 'Qanjobal' },
  { value: 17, label: 'Qeqchi' },
  { value: 18, label: 'Sakapulteka' },
  { value: 19, label: 'Sipakapensa' },
  { value: 20, label: 'Tektiteka' },
  { value: 21, label: 'Tzutujil' },
  { value: 22, label: 'Uspanteka' },
  { value: 23, label: 'No indica' },
  { value: 24, label: 'Español' },
  { value: 25, label: 'Otro' },
]
//     lenguage: ""

export interface Status {
  value: number;
  label: string;
}

export const status: Status[] = [
  { value: 1, label: 'activo' },
  { value: 2, label: 'archivado'}

]

export interface Estado {
  value: number;
  label: string;
}

export const estado: Estado[] = [
  { value: 1, label: 'Estable' },
  { value: 2, label: 'Delicado' },
  { value: 3, label: 'Fallecido'}
]


export interface Situacion {
  value: number;
  label: string;
}

export const situacion: Situacion[] = [
  { value: 1, label: 'Hospitalizado'},
  { value: 2, label: 'Observación' },
  { value: 3, label: 'Recuperado' },
  { value: 4, label: 'Referido' },
  { value: 5, label: 'Trasladado' },
  { value: 6, label: 'Fugado' },
  { value: 7, label: 'Fallecido' },
]

export interface Referencia {
  value: number;
  label: string;
}

export const referencia: Referencia[] = [
  { value: 1, label: 'Hospital General San Juan De Dios - Guatemala'},
  { value: 2, label: 'Hospital Roosevelt - Guatemala' },
  { value: 3, label: 'Hospital Villa Nueva - Guatemala' },
  { value: 4, label: 'Hospital Regional De Amatitlán - Guatemala' },
  { value: 5, label: 'Hospital Nacional Pedro De Bethancourt - Sacatepequez' },
  { value: 6, label: 'Hospital Nacional Chimaltenango - Chimaltenango' },
  { value: 7, label: 'Hospital Distrital De Tiquisate - Escuintla' },
  { value: 8, label: 'Hospital Regional De Escuitla - Escuintal'},
  { value: 9, label: 'Hospital Intregado El Progreso - El Progreso' },
  { value: 10, label: 'Hospital Regional De Cuilapa - Santa Rosa' },
  { value: 11, label: 'Hospital Nacional Juan De Dios Rodas - Sololá' },
  { value: 12, label: 'Hospital Nacional Dr Jose Felipe Flores-  Totonicapán' },
  { value: 13, label: 'Hospital Nacional Dr Juan Jose Ortega - Quetzaltenango' },
  { value: 14, label: 'Hospital Regional De Occidente San Juan De Dios - Quetzaltenango' },
  { value: 15, label: 'Hospital Antituberculoso Dr Rodolfo Robles - Quetzaltenango'},
  { value: 16, label: 'Hospital Nacional De Mazatenango - Suchitepequez' },
  { value: 17, label: 'Hospital Nacional de Retalhuleu - Retalhuleu' },
  { value: 18, label: 'Hospital Distrital De Malacatán - San Marcos' },
  { value: 19, label: 'Hospital Nacional De San Marcos - San Marcos' },
  { value: 20, label: 'Hospital Distrital De Joyabaj - Quiché' },
  { value: 21, label: 'Hospital Distrital Uspantán - Quiché' },
  { value: 22, label: 'Hospital Nacional Santa Elena - Qiché'},
  { value: 23, label: 'Hospital Nacional De Salamá - Baja Verapaz' },
  { value: 24, label: 'Hospital Distrital Fray Bartolome De Las Casas - Alta Verapaz' },
  { value: 25, label: 'Hospital Nacional Hellen Lossi De Laugerud - Alta Verapaz' },
  { value: 26, label: 'Hospital Distrital La Tinta - Alta Verapaz' },
  { value: 27, label: 'Hospital Regional Dr Antonio Penado - Petén' },
  { value: 28, label: 'Hospital Distrital Melchor De Mencos - Petén' },
  { value: 29, label: 'Hospital Distrital De Sayaxché - Petén'},
  { value: 30, label: 'Hospital Distrital De Poptún - Petén' },
  { value: 31, label: 'Hospital Infantil Elisa Mrtinez - Izabal' },
  { value: 32, label: 'Hospital Nacional De La Amistad Guatemala Japon  - Izabal' },
  { value: 33, label: 'Hospital Regional De Zaacapa - Zacapa' },
  { value: 34, label: 'Hospital Modular Carlos Arana Osorio - Chiquimula' },
  { value: 35, label: 'Hospital Nacional Nicolasa Cruz - Jalapa' },
  { value: 36, label: 'Hospital Nacional Ernestina Viuda De Recinos - Jutiapa'},
  { value: 37, label: 'Hospital Distrital Nebaj - Qiché' },
  { value: 38, label: 'Hospital Antituberculoso San Vicente - Guatemala' },
  { value: 39, label: 'Hospital Infantil de Infectología y Rehabilitación - Guatemala' },
  { value: 40, label: 'Hospital de Salud Mental Dr Federico Mora - Guatemala' },
  { value: 41, label: 'Hospital de Ortopedia y Rehabilitación Dr Jorge V - Guatemala' },
  { value: 42, label: 'IGSS - especificar en notas' },
  { value: 43, label: 'Privado - especificar en notas' },
]

export interface Estadia {
  value: number;
  label: string;
}


export const estadia: Estadia[] = [
  { value: 1, label: 'cama' },
  { value: 2, label: 'camilla' },
  { value: 3, label: 'silla de ruedas' },
  { value: 4, label: 'no aplica' },
  { value: 5, label: 'otro' },
]


