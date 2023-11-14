
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
}

export const municipio: Municipio[] = [

  { value: 101, label: "Guatemala, Guatemala" },
  { value: 101, label: "Guatemala, Guatemala" },
  { value: 102, label: "Santa Catarina Pinula, Guatemala" },
  { value: 103, label: "San José Pinula, Guatemala" },
  { value: 104, label: "San José del Golfo, Guatemala" },
  { value: 105, label: "Palencia, Guatemala" },
  { value: 106, label: "Chinautla, Guatemala" },
  { value: 107, label: "San Pedro Ayampuc, Guatemala" },
  { value: 108, label: "Mixco, Guatemala" },
  { value: 109, label: "San Pedro Sacatepéquez, Guatemala" },
  { value: 110, label: "San Juan Sacatepéquez, Guatemala" },
  { value: 111, label: "San Raymundo, Guatemala" },
  { value: 112, label: "Chuarrancho, Guatemala" },
  { value: 113, label: "Fraijanes, Guatemala" },
  { value: 114, label: "Amatitlán, Guatemala" },
  { value: 115, label: "Villa Nueva, Guatemala" },
  { value: 116, label: "Villa Canales, Guatemala" },
  { value: 117, label: "San Miguel Petapa, Guatemala" },
  { value: 201, label: "Guastatoya, El Progreso" },
  { value: 202, label: "Morazán, El Progreso" },
  { value: 203, label: "San Agustín Acasaguastlán, El Progreso" },
  { value: 204, label: "San Cristóbal Acasaguastlán, El Progreso" },
  { value: 205, label: "El Jícaro, El Progreso" },
  { value: 206, label: "Sansare, El Progreso" },
  { value: 207, label: "Sanarate, El Progreso" },
  { value: 208, label: "San Antonio La Paz, El Progreso" },
  { value: 301, label: "Antigua Guatemala, Sacatepéquez" },
  { value: 302, label: "Jocotenango, Sacatepéquez" },
  { value: 303, label: "Pastores, Sacatepéquez" },
  { value: 304, label: "Sumpango, Sacatepéquez" },
  { value: 305, label: "Santo Domingo Xenacoj, Sacatepéquez" },
  { value: 306, label: "Santiago Sacatepéquez, Sacatepéquez" },
  { value: 307, label: "San Bartolomé Milpas Altas, Sacatepéquez" },
  { value: 308, label: "San Lucas Sacatepéquez, Sacatepéquez" },
  { value: 309, label: "Santa Lucía Milpas Altas, Sacatepéquez" },
  { value: 310, label: "Magdalena Milpas Altas, Sacatepéquez" },
  { value: 311, label: "Santa María de Jesús, Sacatepéquez" },
  { value: 312, label: "Ciudad Vieja, Sacatepéquez" },
  { value: 313, label: "San Miguel Dueñas, Sacatepéquez" },
  { value: 314, label: "San Juan Alotenango, Sacatepéquez" },
  { value: 315, label: "San Antonio Aguas Calientes, Sacatepéquez" },
  { value: 316, label: "Santa Catarina Barahona, Sacatepéquez" },
  { value: 401, label: "Chimaltenango, Chimaltenango" },
  { value: 402, label: "San José Poaquil, Chimaltenango" },
  { value: 403, label: "San Martín Jilotepeque, Chimaltenango" },
  { value: 404, label: "San Juan Comalapa, Chimaltenango" },
  { value: 405, label: "Santa Apolonia, Chimaltenango" },
  { value: 406, label: "Tecpán Guatemala, Chimaltenango" },
  { value: 407, label: "Patzún, Chimaltenango" },
  { value: 408, label: "San Miguel Pochuta, Chimaltenango" },
  { value: 409, label: "Patzicía, Chimaltenango" },
  { value: 410, label: "Santa Cruz Balanyá, Chimaltenango" },
  { value: 411, label: "Acatenango, Chimaltenango" },
  { value: 412, label: "San Pedro Yepocapa, Chimaltenango" },
  { value: 413, label: "San Andrés Itzapa, Chimaltenango" },
  { value: 414, label: "Parramos, Chimaltenango" },
  { value: 415, label: "Zaragoza, Chimaltenango" },
  { value: 416, label: "El Tejar, Chimaltenango" },
  { value: 501, label: "Escuintla, Escuintla" },
  { value: 502, label: "Santa Lucía Cotzumalguapa, Escuintla" },
  { value: 503, label: "La Democracia, Escuintla" },
  { value: 504, label: "Siquinalá, Escuintla" },
  { value: 505, label: "Masagua, Escuintla" },
  { value: 506, label: "Tiquisate, Escuintla" },
  { value: 507, label: "La Gomera, Escuintla" },
  { value: 508, label: "Guanagazapa, Escuintla" },
  { value: 509, label: "San José, Escuintla" },
  { value: 510, label: "Iztapa, Escuintla" },
  { value: 511, label: "Palín, Escuintla" },
  { value: 512, label: "San Vicente Pacaya, Escuintla" },
  { value: 513, label: "Nueva Concepción, Escuintla" },
  { value: 514, label: "Sipacate, Escuintla" },
  { value: 601, label: "Cuilapa, Santa Rosa" },
  { value: 602, label: "Barberena, Santa Rosa" },
  { value: 603, label: "Santa Rosa de Lima, Santa Rosa" },
  { value: 604, label: "Casillas, Santa Rosa" },
  { value: 605, label: "San Rafael Las Flores, Santa Rosa" },
  { value: 606, label: "Oratorio, Santa Rosa" },
  { value: 607, label: "San Juan Tecuaco, Santa Rosa" },
  { value: 608, label: "Chiquimulilla, Santa Rosa" },
  { value: 609, label: "Taxisco, Santa Rosa" },
  { value: 610, label: "Santa María Ixhuatán, Santa Rosa" },
  { value: 611, label: "Guazacapán, Santa Rosa" },
  { value: 612, label: "Santa Cruz Naranjo, Santa Rosa" },
  { value: 613, label: "Pueblo Nuevo Viñas, Santa Rosa" },
  { value: 701, label: "Sololá, Sololá" },
  { value: 702, label: "San José Chacayá, Sololá" },
  { value: 703, label: "Santa María Visitación, Sololá" },
  { value: 704, label: "Santa Lucía Utatlán, Sololá" },
  { value: 705, label: "Nahualá, Sololá" },
  { value: 706, label: "Santa Catarina Ixtahuacan, Sololá" },
  { value: 707, label: "Santa Clara La Laguna, Sololá" },
  { value: 708, label: "Concepción, Sololá" },
  { value: 709, label: "San Andrés Semetabaj, Sololá" },
  { value: 710, label: "Panajachel, Sololá" },
  { value: 711, label: "Santa Catarina Palopó, Sololá" },
  { value: 712, label: "San Antonio Palopó, Sololá" },
  { value: 713, label: "San Lucas Tolimán, Sololá" },
  { value: 714, label: "Santa Cruz La Laguna, Sololá" },
  { value: 715, label: "San Pablo La Laguna, Sololá" },
  { value: 716, label: "San Marcos La Laguna, Sololá" },
  { value: 717, label: "San Juan La Laguna, Sololá" },
  { value: 718, label: "San Pedro La Laguna, Sololá" },
  { value: 719, label: "Santiago Atitlán, Sololá" },
  { value: 801, label: "Totonicapán" },
  { value: 802, label: "San Cristóbal Totonicapán" },
  { value: 803, label: "San Francisco El Alto" },
  { value: 804, label: "Santa Lucía La Reforma" },
  { value: 805, label: "San Andrés Xecul" },
  { value: 806, label: "Momostenango" },
  { value: 807, label: "Santa María Chiquimula" },
  { value: 808, label: "Santa María de Jesús" },
  { value: 901, label: "Quetzaltenango" },
  { value: 902, label: "Salcajá" },
  { value: 903, label: "Olintepeque" },
  { value: 904, label: "San Carlos Sija" },
  { value: 905, label: "Sibilia" },
  { value: 906, label: "Cabricán" },
  { value: 907, label: "Cajolá" },
  { value: 908, label: "San Miguel Siguilá" },
  { value: 909, label: "Ostuncalco" },
  { value: 910, label: "San Mateo" },
  { value: 911, label: "Concepción Chiquirichapa" },
  { value: 912, label: "San Martín Sacatepéquez" },
  { value: 913, label: "Almolonga" },
  { value: 914, label: "Cantel" },
  { value: 915, label: "Huitán" },
  { value: 916, label: "Zunil" },
  { value: 917, label: "Colomba" },
  { value: 918, label: "San Francisco La Unión" },
  { value: 919, label: "El Palmar" },
  { value: 920, label: "Coatepeque" },
  { value: 921, label: "Genova" },
  { value: 1001, label: "Mazatenango" },
  { value: 1002, label: "Cuyotenango" },
  { value: 1003, label: "San Francisco Zapotitlán" },
  { value: 1004, label: "San Bernardino" },
  { value: 1005, label: "San José El Ídolo" },
  { value: 1006, label: "Santo Domingo Suchitepéquez" },
  { value: 1007, label: "San Lorenzo" },
  { value: 1008, label: "Samayac" },
  { value: 1009, label: "San Pablo Jocopilas" },
  { value: 1010, label: "San Antonio Suchitepéquez" },
  { value: 1011, label: "San Miguel Panán" },
  { value: 1012, label: "San Gabriel" },
  { value: 1013, label: "Chicacao" },
  { value: 1014, label: "Patulul" },
  { value: 1015, label: "Santa Bárbara" },
  { value: 1016, label: "San Juan Bautista" },
  { value: 1017, label: "Santo Tomás La Unión" },
  { value: 1018, label: "Zunilito" },
  { value: 1019, label: "Pueblo Nuevo" },
  { value: 1101, label: "Retalhuleu" },
  { value: 1102, label: "San Sebastián" },
  { value: 1103, label: "Santa Cruz Muluá" },
  { value: 1104, label: "San Martín Zapotitlán" },
  { value: 1105, label: "San Felipe" },
  { value: 1106, label: "San Andrés Villa Seca" },
  { value: 1107, label: "Champerico" },
  { value: 1108, label: "Nuevo San Carlos" },
  { value: 1201, label: "San Marcos" },
  { value: 1202, label: "San Pedro Sacatepéquez" },
  { value: 1203, label: "San Antonio Sacatepéquez" },
  { value: 1204, label: "Comitancillo" },
  { value: 1205, label: "San Miguel Ixtahuacán" },
  { value: 1206, label: "Concepción Tutuapa" },
  { value: 1207, label: "Tacaná" },
  { value: 1208, label: "Sibinal" },
  { value: 1209, label: "Tajumulco" },
  { value: 1210, label: "Tejutla" },
  { value: 1211, label: "San Rafael Pie de la Cuesta" },
  { value: 1212, label: "Nuevo Progreso" },
  { value: 1213, label: "El Tumbador" },
  { value: 1214, label: "El Rodeo" },
  { value: 1215, label: "Malacatán" },
  { value: 1216, label: "Catarina" },
  { value: 1217, label: "Ayutla" },
  { value: 1218, label: "Ocos" },
  { value: 1219, label: "San Pablo" },
  { value: 1220, label: "El Quetzal" },
  { value: 1221, label: "La Reforma" },
  { value: 1222, label: "Pajapita" },
  { value: 1223, label: "Ixchiguán" },
  { value: 1301, label: "Huehuetenango, Huehuetenango" },
  { value: 1302, label: "Chiantla, Huehuetenango" },
  { value: 1303, label: "Malacatancito, Huehuetenango" },
  { value: 1304, label: "Cuilco, Huehuetenango" },
  { value: 1305, label: "Nentón, Huehuetenango" },
  { value: 1306, label: "San Pedro Necta, Huehuetenango" },
  { value: 1307, label: "Jacaltenango, Huehuetenango" },
  { value: 1308, label: "Soloma, Huehuetenango" },
  { value: 1309, label: "Ixtahuacán, Huehuetenango" },
  { value: 1310, label: "Santa Bárbara, Huehuetenango" },
  { value: 1311, label: "La Libertad, Huehuetenango" },
  { value: 1312, label: "La Democracia, Huehuetenango" },
  { value: 1313, label: "San Miguel Acatán, Huehuetenango" },
  { value: 1314, label: "San Rafael La Independencia, Huehuetenango" },
  { value: 1315, label: "Todos Santos Cuchumatán, Huehuetenango" },
  { value: 1316, label: "San Juan Atitán, Huehuetenango" },
  { value: 1317, label: "Santa Eulalia, Huehuetenango" },
  { value: 1318, label: "San Mateo Ixtatán, Huehuetenango" },
  { value: 1319, label: "Colotenango, Huehuetenango" },
  { value: 1320, label: "San Sebastián Coatán, Huehuetenango" },
  { value: 1321, label: "Concepción Huista, Huehuetenango" },
  { value: 1322, label: "San Juan Ixcoy, Huehuetenango" },
  { value: 1323, label: "San Antonio Huista, Huehuetenango" },
  { value: 1324, label: "San Sebastián Huehuetenango, Huehuetenango" },
  { value: 1325, label: "Santa Cruz Barillas, Huehuetenango" },
  { value: 1326, label: "San Gaspar Ixchil, Huehuetenango" },
  { value: 1327, label: "Aguacatán, Huehuetenango" },
  { value: 1328, label: "San Rafael Pétzal, Huehuetenango" },
  { value: 1329, label: "San Gaspar Ixchil, Huehuetenango" },
  { value: 1330, label: "Santiago Chimaltenango, Huehuetenango" },
  { value: 1331, label: "Santa Ana Huista, Huehuetenango" },
  { value: 1401, label: "Santa Cruz del Quiché, Quiché" },
  { value: 1402, label: "Chiché, Quiché" },
  { value: 1403, label: "Chinique, Quiché" },
  { value: 1404, label: "Zacualpa, Quiché" },
  { value: 1405, label: "Chajul, Quiché" },
  { value: 1406, label: "Chichicastenango, Quiché" },
  { value: 1407, label: "Patzité, Quiché" },
  { value: 1408, label: "San Antonio Ilotenango, Quiché" },
  { value: 1409, label: "San Pedro Jocopilas, Quiché" },
  { value: 1410, label: "Cunén, Quiché" },
  { value: 1411, label: "San Juan Cotzal, Quiché" },
  { value: 1412, label: "Joyabaj, Quiché" },
  { value: 1413, label: "Santa María Nebaj, Quiché" },
  { value: 1414, label: "San Andrés Sajcabajá, Quiché" },
  { value: 1415, label: "San Miguel Uspantán, Quiché" },
  { value: 1416, label: "Sacapulas, Quiché" },
  { value: 1417, label: "San Bartolomé Jocotenango, Quiché" },
  { value: 1418, label: "Canillá, Quiché" },
  { value: 1419, label: "Chicamán, Quiché" },
  { value: 1420, label: "Playa Grande Ixcán, Quiché" },
  { value: 1421, label: "Pachalum, Quiché" },
  { value: 1501, label: "Salamá" },
  { value: 1502, label: "San Miguel Chicaj" },
  { value: 1503, label: "Rabinal" },
  { value: 1504, label: "Cubulco" },
  { value: 1505, label: "Granados" },
  { value: 1506, label: 'Santa Cruz El Chol' },
  { value: 1507, label: 'San Jerónimo' },
  { value: 1508, label: 'Purulhá' },
  { value: 1601, label: 'Cobán, Alta Verapaz' },
  { value: 1602, label: 'Santa Cruz Verapaz, Alta Verapaz' },
  { value: 1603, label: 'San Cristóbal Verapaz, Alta Verapaz' },
  { value: 1604, label: 'Tactic, Alta Verapaz' },
  { value: 1605, label: 'Tamahú, Alta Verapaz' },
  { value: 1606, label: 'San Miguel Tucurú, Alta Verapaz' },
  { value: 1607, label: 'Panzós, Alta Verapaz' },
  { value: 1608, label: 'Senahú, Alta Verapaz' },
  { value: 1609, label: 'San Pedro Carchá, Alta Verapaz' },
  { value: 1610, label: 'San Juan Chamelco, Alta Verapaz' },
  { value: 1611, label: 'San Agustín Lanquín, Alta Verapaz' },
  { value: 1612, label: 'Santa María Cahabón, Alta Verapaz' },
  { value: 1613, label: 'Chisec, Alta Verapaz' },
  { value: 1614, label: 'Chahal, Alta Verapaz' },
  { value: 1615, label: 'Fray Bartolomé de Las Casas, Alta Verapaz' },
  { value: 1616, label: 'Santa Catalina La Tinta, Alta Verapaz' },
  { value: 1617, label: 'Raxruhá, Alta Verapaz' },
  { value: 1701, label: 'Flores, Petén' },
  { value: 1702, label: 'San José, Petén' },
  { value: 1703, label: 'San Benito, Petén' },
  { value: 1704, label: 'San Andrés, Petén' },
  { value: 1705, label: 'La Libertad, Petén' },
  { value: 1706, label: 'San Francisco, Petén' },
  { value: 1707, label: 'Santa Ana, Petén' },
  { value: 1708, label: 'Dolores, Petén' },
  { value: 1709, label: 'San Luis, Petén' },
  { value: 1710, label: 'Sayaxché, Petén' },
  { value: 1711, label: 'Melchor de Mencos, Petén' },
  { value: 1712, label: 'Poptún, Petén' },
  { value: 1713, label: 'Las Cruces, Petén' },
  { value: 1714, label: 'El Chal, Petén' },
  { value: 1801, label: 'Puerto Barrios' },
  { value: 1802, label: 'Livingston' },
  { value: 1803, label: 'El Estor' },
  { value: 1804, label: 'Morales' },
  { value: 1805, label: 'Los Amates' },
  { value: 1901, label: 'Zacapa' },
  { value: 1902, label: 'Estanzuela' },
  { value: 1903, label: 'Río Hondo' },
  { value: 1904, label: 'Gualán' },
  { value: 1905, label: 'Teculután' },
  { value: 1906, label: 'Usumatlán' },
  { value: 1907, label: 'Cabañas' },
  { value: 1908, label: 'San Diego' },
  { value: 1909, label: 'La Unión' },
  { value: 1910, label: 'Huité' },
  { value: 1911, label: 'San Jorge' },
  { value: 2001, label: 'Chiquimula, Chiquimula' },
  { value: 2002, label: 'San José La Arada, Chiquimula' },
  { value: 2003, label: 'San Juan Ermita, Chiquimula' },
  { value: 2004, label: 'Jocotán Chiquimula' },
  { value: 2005, label: 'Camotán Chiquimula' },
  { value: 2006, label: 'Olopa Chiquimula' },
  { value: 2007, label: 'Esquipulas, Chiquimula' },
  { value: 2008, label: 'Concepción Las Minas Chiquimula' },
  { value: 2009, label: 'Quezaltepeque Chiquimula' },
  { value: 2010, label: 'San Jacinto Chiquimula' },
  { value: 2011, label: 'Ipala Chiquimula' },
  { value: 2101, label: 'Jalapa' },
  { value: 2102, label: 'San Pedro Pinula' },
  { value: 2103, label: 'San Luis Jilotepeque' },
  { value: 2104, label: 'San Manuel Chaparrón' },
  { value: 2105, label: 'San Carlos Alzatate' },
  { value: 2106, label: 'Monjas' },
  { value: 2107, label: 'Mataquescuintla' },
  { value: 2201, label: 'Jutiapa' },
  { value: 2202, label: 'El Progreso' },
  { value: 2203, label: 'Santa Catarina Mita' },
  { value: 2204, label: 'Agua Blanca' },
  { value: 2205, label: 'Asunción Mita' },
  { value: 2206, label: 'Yupiltepeque' },
  { value: 2207, label: 'Atescatempa' },
  { value: 2208, label: 'Jerez' },
  { value: 2209, label: 'El Adelanto' },
  { value: 2210, label: 'Zapotitlán' },
  { value: 2211, label: 'Comapa' },
  { value: 2212, label: 'Jalpatagua' },
  { value: 2213, label: 'Conguaco' },
  { value: 2214, label: 'Moyuta' },
  { value: 2215, label: 'Pasaco' },
  { value: 2216, label: 'San José Acatempa' },
  { value: 2217, label: 'Quesada' }
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
