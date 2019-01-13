/*
    This file is part of Angular Overlay Manager Demo Application which is released under the MIT License.
    You should have received a copy of this license in LICENSE.txt along with this file. 
    
    In the event that you did not receive a copy of the license see https://opensource.org/licenses/MIT 
    for the full license details.
*/

import { Component, OnInit, Inject } from '@angular/core';
import { AomOverlay, OverlayConfig, OverlayAnimationConfig, OVERLAY_DATA, AngularOverlayManagerService, Location, Animation, AnimationStartPoint, OverlayType } from 'angular-overlay-manager';

@Component({
  selector: 'app-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss']
})
export class TestModalComponent implements OnInit {

  constructor(private overlayService: AngularOverlayManagerService, private overlay: AomOverlay, @Inject(OVERLAY_DATA) private data: any)  { }

  ngOnInit() {
  }

  close() {
    this.overlay.close(this.data);
  }

  cancel(){
    this.overlay.cancel();
  }

  openNestedOverlay(){
    let overlayConfig: OverlayConfig = {
      shouldCloseOnBackgroundClick: false
    }

    let overlayAnimationConfig: OverlayAnimationConfig = {
      location: Location.TopLeft,
      animation: Animation.Slide,
      animationStartPoint: AnimationStartPoint.Left,
      type: OverlayType.Modal
    };
    this.overlayService.open(TestModalComponent, overlayConfig, overlayAnimationConfig);
  }
}
