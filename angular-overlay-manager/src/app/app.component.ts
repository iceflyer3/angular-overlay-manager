import { Component } from '@angular/core';
import { 
  AngularOverlayManagerService,
  AomOverlayRef,
  OverlayConfig, 
  OverlayAnimationConfig, 
  Location, 
  Animation, 
  AnimationStartPoint, 
  AnimationProperty, 
  OverlayType } from 'angular-overlay-manager';
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
  public shouldPassData: boolean;
  public closeOnScrimClick: boolean;
  public listenToOverlayClose: boolean;

  private overlayConfig: OverlayConfig
  private overlayAnimationConfig: OverlayAnimationConfig;
  

  constructor(private overlayManager: AngularOverlayManagerService) { 
    this.location = Location.TopLeft;
    this.animation = Animation.Slide;
    this.animationStartPoint = AnimationStartPoint.Left;
    this.type = OverlayType.Modal;
    this.shouldPassData = false;
    this.closeOnScrimClick = true;
    this.listenToOverlayClose = true;
    
    this.overlayConfig = {
      shouldCloseOnBackgroundClick: this.closeOnScrimClick
    }

    this.overlayAnimationConfig = {
      location: this.location,
      animation: this.animation,
      animationStartPoint: this.animationStartPoint,
      type: this.type
    };
  }

  public showOverlay()
  {
    this.overlayAnimationConfig = {
      location: Number(this.location),
      animation: Number(this.animation),
      animationStartPoint: Number(this.animationStartPoint),
      type: Number(this.type)
    }
    this.overlayConfig = {
      data: this.shouldPassData ? this.getTestObject() : null,
      shouldCloseOnBackgroundClick: this.closeOnScrimClick
    }

    let overlayRef: AomOverlayRef = this.overlayManager.open(TestModalComponent, this.overlayConfig, this.overlayAnimationConfig);
    
    if (this.listenToOverlayClose)
    {
      overlayRef.onClose().subscribe((data: any) => {
        data ? alert(`Overlay has closed! Returned data: ${JSON.stringify(data)} `) : alert('Overlay has closed! No data was returned.');
      });  
    }
  }


  // Generating the example code strings is actuall more readable this way than if we just did them
  // straight in the template. This isn't what I would call pretty but it is preferable to the alternative.
  public getOverlayConfigExampleCodeString()
  {
    let codeString = '\n';
    codeString += 'overlayConfig = {';

    if (this.shouldPassData)
    {
      codeString += `\n\tdata: ${JSON.stringify(this.getTestObject())}`;
    }
    
    codeString += `\n\tshouldCloseOnBackgroundClick: ${this.closeOnScrimClick}`;
    codeString += '\n}';
    return codeString;
  }

  public getAnimationConfigExampleCodeString()
  {
    let codeString = '\n';
    codeString += 'overlayAnimationConfig = {';
    codeString += `\n\tlocation: Location.${Location[this.location]}`;
    codeString += `\n\tanimation: Animation.${Animation[this.animation]}`;
    codeString += `\n\tanimationStartPoint: AnimationStartPoint.${AnimationStartPoint[this.animationStartPoint]}`;
    codeString += `\n\ttype: OverlayType.${OverlayType[this.type]}`;
    codeString += '\n}';
    return codeString;
  }

  public getTestObject()
  {
    return {foo: 'bar', hello: 'world', test: 'object'};
  }
}
