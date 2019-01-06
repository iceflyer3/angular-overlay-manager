import { NgModule } from '@angular/core';
import { ElementManager } from './internal/ElementManager';
import { AnimationManager } from './internal/AnimationManager';
import { OverlayHostDirective } from './internal/overlay-host.directive';
import { OverlayContainerComponent } from './internal/overlay-container/overlay-container.component';
import { OverlayManager } from './internal/OverlayManager';
import { overlayDataProvider } from './internal/dependency-injection/overlay-data-provider';
import { appConfigProvider } from './internal/dependency-injection/app-config-provider';

@NgModule({
  imports: [
  ],
  declarations: [OverlayHostDirective, OverlayContainerComponent],
  exports: [],
  providers: [
    OverlayManager,
    ElementManager, 
    AnimationManager,
    appConfigProvider,
    overlayDataProvider
  ],
  entryComponents: [OverlayContainerComponent]
})
export class AngularOverlayManagerModule { }
