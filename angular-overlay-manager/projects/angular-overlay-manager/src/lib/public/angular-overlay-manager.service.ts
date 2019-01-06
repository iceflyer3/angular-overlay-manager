import { Injectable, INJECTOR, Inject } from '@angular/core';
import { ComponentRef } from "@angular/core/src/render3";

import { of } from 'rxjs';

import { OverlayConfig } from './OverlayConfig';
import { OverlayAnimationConfig } from './OverlayAnimationConfig';
import { OverlayContainerComponent } from '../internal/overlay-container/overlay-container.component';
import { OverlayManager } from '../internal/OverlayManager';

@Injectable({
  providedIn: 'root'
})
export class AngularOverlayManagerService {

  constructor(private overlayManager: OverlayManager) { }

  public open(component: any, overlayConfig: OverlayConfig, animationConfig: OverlayAnimationConfig){

    if (!this.overlayManager.hasOpenOverlay())
    {
      this.overlayManager.openOverlay(component, overlayConfig, animationConfig);
    }
    else
    {
      this.overlayManager.closeOverlay();
    }
  }

  public close(data?: any) : Promise<any>
  {
    this.overlayManager.closeOverlay();
    return of(data).toPromise();
  }
}
