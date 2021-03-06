/*
    This file is part of Angular Overlay Manager which is released under the BSD 3-Clause License.
    You should have received a copy of this license in LICENSE.txt along with this file. 
    
    In the event that you did not receive a copy of the license see https://opensource.org/licenses/BSD-3-Clause
    for the full license details.
*/

import { Injectable} from '@angular/core';

import { AomOverlayConfig } from './AomOverlayConfig';
import { AomOverlayAnimationConfig } from './AomOverlayAnimationConfig';
import { OverlayManager } from '../internal/OverlayManager';
import { AomOverlayRef } from './AomOverlayRef';

@Injectable({
  providedIn: 'root'
})
export class AngularOverlayManagerService {

  constructor(private overlayManager: OverlayManager) { }

  public open(component: any, overlayConfig: AomOverlayConfig, animationConfig: AomOverlayAnimationConfig){

    if (!this.overlayManager.hasOpenOverlay())
    {
      this.overlayManager.openOverlay(component, overlayConfig, animationConfig);
      return new AomOverlayRef(this.overlayManager);
    }
    else
    {
      alert('You cannot open a new overlay while an overlay is already open!');
    }
  }
}
