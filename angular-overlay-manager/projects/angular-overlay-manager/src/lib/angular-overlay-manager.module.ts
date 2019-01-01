import { NgModule } from '@angular/core';
import { ElementManager } from './internal/ElementManager';
import { AnimationManager } from './internal/AnimationManager';

@NgModule({
  imports: [
  ],
  declarations: [],
  exports: [],
  providers: [ElementManager, AnimationManager]
})
export class AngularOverlayManagerModule { }
