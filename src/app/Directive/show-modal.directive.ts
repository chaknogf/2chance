import { Directive, Input, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appShowModal]'
})
export class ShowModalDirective implements OnInit {
  @Input('appShowModal') set mostrarModal(valor: boolean) {
    if (valor) {
      this.renderer.addClass(this.el.nativeElement, 'show'); // Muestra el modal
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'show'); // Oculta el modal
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Por defecto, el modal estará oculto
    this.renderer.removeClass(this.el.nativeElement, 'show');
  }
}
