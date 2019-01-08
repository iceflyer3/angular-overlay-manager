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
        data ? alert('Overlay has closed! Check the console to see data received on close.') : alert('Overlay has closed! No data was returned.');
        console.log('OverlayRef onClose received data of: ');
        console.log(data);
      });  
    }
  }


  public getOverlayConfigExampleCodeString()
  {
    let codeString = '\n';
    codeString += '\toverlayConfig = {';

    if (this.shouldPassData)
    {
      codeString += `\n\t\tdata: ${JSON.stringify(this.getTestObject())}`;
    }
    
    codeString += `\n\t\tshouldCloseOnBackgroundClick: ${this.closeOnScrimClick}`;
    codeString += '\n\t}';
    return codeString;
  }

  public getAnimationConfigExampleCodeString()
  {
    // We're doing this is the component because it is actually more readable than doing it in the template
    let codeString = '\n';
    codeString += '\toverlayAnimationConfig = {';
    codeString += `\n\t\tlocation: Location.${Location[this.location]}`;
    codeString += `\n\t\tanimation: Animation.${Animation[this.animation]}`;
    codeString += `\n\t\tanimationStartPoint: AnimationStartPoint.${AnimationStartPoint[this.animationStartPoint]}`;
    codeString += `\n\t\ttype: OverlayType.${OverlayType[this.type]}`;
    codeString += '\n\t}';
    return codeString;
  }

  public getTestObject()
  {
    return {foo: 'bar', hello: 'world', test: 'object'};
  }
}
