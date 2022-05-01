import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[focus-out]'
})
export class FocusOutDirective {

  constructor() { }
  
  @HostListener('focusout', ['$event.target'])
  onFocusout(target: any) {
      console.log("Focus out called from HostListener");
      target.type = 'text';
  }
}
