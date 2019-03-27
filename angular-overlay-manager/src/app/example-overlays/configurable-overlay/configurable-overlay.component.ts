/*
    This file is part of Angular Overlay Manager Demo Application which is released under the BSD 3-Clause License.
    You should have received a copy of this license in LICENSE.txt along with this file. 
    
    In the event that you did not receive a copy of the license see https://opensource.org/licenses/BSD-3-Clause
    for the full license details.
*/

import { Component, OnInit, Inject } from '@angular/core';
import { AomOverlay, AomOverlayConfig, AomOverlayAnimationConfig, OVERLAY_DATA, AngularOverlayManagerService, OverlayLocation, OverlayAnimation, OverlayAnimationStartPoint, OverlayType } from 'angular-overlay-manager';

@Component({
  selector: 'app-configurable-overlay',
  templateUrl: './configurable-overlay.component.html',
  styleUrls: ['./configurable-overlay.component.scss']
})
export class ConfigurableOverlayComponent implements OnInit {

  public overlayData: string;

  constructor(private overlayService: AngularOverlayManagerService, private overlay: AomOverlay, @Inject(OVERLAY_DATA) private data: any)  {
    this.overlayData = JSON.stringify(data);
   }

  ngOnInit() {
  }

  close() {
    this.overlay.close(this.data);
  }

  cancel(){
    this.overlay.cancel();
  }

  openNestedOverlay(){
    let overlayConfig: AomOverlayConfig = {
      type: OverlayType.Modal,
      useScrimBackground: true,
      shouldCloseOnBackgroundClick: false
    }

    let overlayAnimationConfig: AomOverlayAnimationConfig = {
      location: OverlayLocation.TopLeft,
      animation: OverlayAnimation.Slide,
      animationStartPoint: OverlayAnimationStartPoint.Left,
    };
    this.overlayService.open(ConfigurableOverlayComponent, overlayConfig, overlayAnimationConfig);
  }
}
