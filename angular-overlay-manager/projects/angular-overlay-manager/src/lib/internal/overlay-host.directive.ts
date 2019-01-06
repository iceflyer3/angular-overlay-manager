import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[aom-overlay]'
})
export class OverlayHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
