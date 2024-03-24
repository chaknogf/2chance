import { Directive, ElementRef, Renderer2, Input, AfterViewInit } from '@angular/core';


@Directive({
  selector: '[appHighlightWords]'
})
export class HighlightWordsDirective {
  @Input('appHighlight') highlightWords: string[] = ['hijo', 'hija'];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const text = this.el.nativeElement.innerHTML;
    let highlightedText = text;

    this.highlightWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi'); // Use regex to match whole words
      highlightedText = highlightedText.replace(regex, `<span class="${word === 'hijo' ? 'celesce' : 'rosado'}">${word}</span>`);

    });

    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', highlightedText);







  }
}
