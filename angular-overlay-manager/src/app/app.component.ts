import { Component } from '@angular/core';
import { AngularOverlayManagerService } from 'angular-overlay-manager';
import { OverlayConfig, Location, Animation, AnimationStartPoint, AnimationProperty } from 'angular-overlay-manager';
import { TestModalComponent } from './test-modal/test-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  private OverlayLocations = Location;
  private Animations = Animation;
  private AnimStartPoints = AnimationStartPoint;
  private AnimProperties = AnimationProperty;

  private overlayConfig: OverlayConfig;

  public location: Location;
  public animation: Animation;
  public animationStartPoint: AnimationStartPoint;

  constructor(private overlayManager: AngularOverlayManagerService) { 
    this.location = Location.TopLeft;
    this.animation = Animation.Slide;
    this.animationStartPoint = AnimationStartPoint.Left;
    
    this.overlayConfig = {
      location: this.location,
      animation: this.animation,
      animationStartPoint: this.animationStartPoint
    };
  }

  public showOverlay()
  {
    this.overlayConfig = {
      location: Number(this.location),
      animation: Number(this.animation),
      animationStartPoint: Number(this.animationStartPoint)
    }

    this.overlayManager.open(TestModalComponent, this.overlayConfig);
  }
}
