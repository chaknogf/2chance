#!/bin/bash

# Obtener la dirección IP
IP=$(hostname -I | awk '{print $1}')

# Directorio donde se guardará el archivo
DIRECTORY="src/enviroments"
FILE="$DIRECTORY/enviroment.ts"

# Verificar si el directorio existe, si no, crearlo
if [ ! -d "$DIRECTORY" ]; then
    mkdir -p "$DIRECTORY"
fi

# Contenido del archivo de entorno
ENVIRONMENT_CONTENT=$(cat <<EOF
import { HostListener } from '@angular/core';

const hostname = window.location.hostname.split(':')[0];
const ip0 = 'http://'+hostname+':8000';
#const ip = 'http://${IP}:8000';

export const environment = {
  production: false,
  apiUrl: ip0
};
EOF
)

# Guardar el contenido en un archivo dentro de la carpeta "environments"
echo "$ENVIRONMENT_CONTENT" > "$FILE"

echo "Archivo environment.ts creado satisfactoriamente en la carpeta $DIRECTORY."
