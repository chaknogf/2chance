
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[espaciosNumeros]'
})
export class EspacioNumerosDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Eliminar caracteres que no sean números
    const formattedValue = this.formatWithSpaces(value);
    this.renderer.setProperty(input, 'value', formattedValue);
  }

  private formatWithSpaces(value: string): string {
    const formattedValue = value.replace(/\s/g, ''); // Eliminar espacios existentes
    const spacedValue = formattedValue.replace(/(\d{8})(?=\d)/g, '$1 '); // Agregar espacio cada 8 dígitos
    return spacedValue;
  }
}
