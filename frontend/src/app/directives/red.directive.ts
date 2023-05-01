import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRed]'
})
export class RedDirective {

  // just to represent a property Directive
  constructor(private el: ElementRef) {
    el.nativeElement.style.color = '#e35e6b';
   }

}
