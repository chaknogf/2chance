import { Directive, ElementRef, HostListener } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Directive({
  selector: '[appCopyToClipboard]'
})
export class CopyToClipboardDirective {

  constructor(private el: ElementRef, private clipboard: Clipboard) { }

  @HostListener('click') onClick() {
    const text = this.el.nativeElement.value || this.el.nativeElement.innerText;
    if (text) {
      this.clipboard.copy(text);
      this.showCopiedMessage();
    }
  }

  private showCopiedMessage() {
    const originalText = this.el.nativeElement.value || this.el.nativeElement.innerText;
    this.el.nativeElement.style.position = 'relative';

    const tooltip = document.createElement('span');
    tooltip.innerText = '¡Copiado!';
    tooltip.style.position = 'absolute';
    tooltip.style.top = '-25px';
    tooltip.style.right = '10px';
    tooltip.style.backgroundColor = '#333';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.fontSize = '12px';
    tooltip.style.transition = 'opacity 0.5s';
    tooltip.style.opacity = '1';

    this.el.nativeElement.parentElement.appendChild(tooltip);

    setTimeout(() => {
      tooltip.style.opacity = '0';
      setTimeout(() => tooltip.remove(), 500);
    }, 1000);
  }
}
