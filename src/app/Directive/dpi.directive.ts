import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDpi]'
})
export class DpiDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Eliminar caracteres que no sean números y limitar la longitud a 15
    value = value.replace(/\D/g, '').substring(0, 13);

    // Agregar espacios después de 4, 9 y 14 caracteres
    value = this.insertSpaceAfter(value, 4);
    value = this.insertSpaceAfter(value, 10);
    value = this.insertSpaceAfter(value, 15);

    this.renderer.setProperty(input, 'value', value);
  }

  private insertSpaceAfter(value: string, position: number): string {
    if (value.length > position) {
      const part1 = value.slice(0, position);
      const part2 = value.slice(position);
      return part1 + ' ' + part2;
    }
    return value;
  }
}
