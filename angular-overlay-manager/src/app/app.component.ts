import { Component } from '@angular/core';
import { AngularOverlayManagerService } from 'angular-overlay-manager';
import { OverlayConfig, Location, Animation, AnimationStartPoint, AnimationProperty, OverlayType } from 'angular-overlay-manager';
import { TestModalComponent } from './test-modal/test-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public OverlayLocations = Location;
  public Animations = Animation;
  public AnimStartPoints = AnimationStartPoint;
  public AnimProperties = AnimationProperty;
  public OverlayTypes = OverlayType;

  public location: Location;
  public animation: Animation;
  public animationStartPoint: AnimationStartPoint;
  public type: OverlayType

  private overlayConfig: OverlayConfig;

  constructor(private overlayManager: AngularOverlayManagerService) { 
    this.location = Location.TopLeft;
    this.animation = Animation.Slide;
    this.animationStartPoint = AnimationStartPoint.Left;
    this.type = OverlayType.Modal;
    
    this.overlayConfig = {
      location: this.location,
      animation: this.animation,
      animationStartPoint: this.animationStartPoint,
      type: this.type
    };
  }

  public showOverlay()
  {
    this.overlayConfig = {
      location: Number(this.location),
      animation: Number(this.animation),
      animationStartPoint: Number(this.animationStartPoint),
      type: Number(this.type)
    }

    this.overlayManager.open(TestModalComponent, this.overlayConfig);
  }
}
