import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Pipe({
  name: 'colorize'
})
export class ColorizePipe implements PipeTransform {
  transform(value: string): string {
    // Reemplaza "hijo" con la versión en celeste
    value = value.replace(/\bhijo\b/g, '<span style="color: cyan;">hijo</span>');
    // Reemplaza "hija" con la versión en rosado
    value = value.replace(/\bhija\b/g, '<span style="color: pink;">hija</span>');
    return value;
  }
}
