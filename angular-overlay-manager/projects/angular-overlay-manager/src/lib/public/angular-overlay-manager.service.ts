import { Injectable } from '@angular/core';
import { ComponentRef } from "@angular/core/src/render3";

import { AnimationManager } from '../internal/AnimationManager';
import { ElementManager } from '../internal/ElementManager';
import { OverlayConfig } from './OverlayConfig';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularOverlayManagerService {

  private openComponentRef :any = null;
  private openComponentConfig: OverlayConfig = null;

  constructor(private elementManager: ElementManager, private animationManager: AnimationManager) {  }

  public open(component: any, config: OverlayConfig){

    if (this.openComponentRef == null)
    {
      this.openComponentConfig = config;
      this.openComponentRef = this.elementManager.createAndAddToDom(component);
      this.animationManager.applyConfiguration(config);
    }
    else
    {
      this.close();
    }
  }

  public close(data?: any) : Promise<any>
  {
    if (this.openComponentRef !== null)
    {
      this.animationManager.triggerClose(this.openComponentConfig).then(
        () => {
          /* 
             I'm not satisfied with this approach but we need to wait on the animation to finish
             playing before we remove the component from the dom. I tried using transitionend but 
             it would fire instantly (before the animation had actually completed) so didn't pan out.  

             The 800 ms delay is the same length of time the animation is set to play for. 
          */
          setTimeout(() => {
            this.elementManager.destroyAndRemoveFromDom(this.openComponentRef);
            this.openComponentRef = null;
          }, 800)
        }
      );
    }

    return of(data).toPromise();
  }
}
