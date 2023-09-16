import { Directive, ElementRef, Renderer2, Input, AfterViewInit } from '@angular/core';


@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input('appHighlight') highlight: string[] = ['nombre', 'apellido'];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const text = this.el.nativeElement.innerHTML;
    let highlight = text;

    this.highlight.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi'); // Use regex to match whole words
      highlight = highlight.replace(regex, `<span class="${word === 'nombre' ? 'highlight' : 'highlight'}">${word}</span>`);

    });

    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', highlight);







  }
}
