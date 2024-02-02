import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextoService {

  constructor() { }

  capitalizar(texto: string): string {
    // Verifica si el texto es nulo o indefinido
    if (!texto) {
      return '';
    }

    const frase = texto.toLowerCase();
    // Divide el texto en palabras
    const palabras = frase.split(' ');

    // Capitaliza la primera letra de cada palabra
    const palabrasCapitalizadas = palabras.map(
      palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)
    );

    // Une las palabras capitalizadas de nuevo en un texto
    return palabrasCapitalizadas.join(' ');
}

  mayusculas(texto: string): string {
    // Verifica si el texto es nulo o indefinido
    if (!texto) {
      return '';
    }

    // Convierte todo el texto a mayúsculas
    return texto.toUpperCase();
  }
}
