/*
    This file is part of Angular Overlay Manager Demo Application which is released under the BSD 3-Clause License.
    You should have received a copy of this license in LICENSE.txt along with this file. 
    
    In the event that you did not receive a copy of the license see https://opensource.org/licenses/BSD-3-Clause
    for the full license details.
*/
import { Component } from '@angular/core';
import { 
  AngularOverlayManagerService,
  AomOverlayRef,
  OverlayConfig, 
  OverlayAnimationConfig, 
  OverlayLocation, 
  OverlayAnimation, 
  OverlayAnimationStartPoint, 
  OverlayAnimationProperty, 
  OverlayType } from 'angular-overlay-manager';
import { ConfigurableOverlayComponent } from './example-overlays/configurable-overlay/configurable-overlay.component';
import { ExampleOverlaySelectionOptions } from './ExampleOverlaySelectionOptions';
import { SnackbarOverlayComponent } from './example-overlays/snackbar-overlay/snackbar-overlay.component';
import { BottomSheetOverlayComponent } from './example-overlays/bottom-sheet-overlay/bottom-sheet-overlay.component';
import { LeftNavOverlayComponent } from './example-overlays/left-nav-overlay/left-nav-overlay.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public OverlayLocations = OverlayLocation;
  public Animations = OverlayAnimation;
  public AnimStartPoints = OverlayAnimationStartPoint;
  public AnimProperties = OverlayAnimationProperty;
  public OverlayTypes = OverlayType;

  public OverlaySelectionOptions = ExampleOverlaySelectionOptions;

  public selectedOverlay: ExampleOverlaySelectionOptions;
  public location: OverlayLocation;
  public animation: OverlayAnimation;
  public animationStartPoint: OverlayAnimationStartPoint;
  public type: OverlayType
  public shouldPassData: boolean;
  public closeOnScrimClick: boolean;
  public listenToOverlayClose: boolean;
  public shouldForceClose: boolean;

  private overlayConfig: OverlayConfig
  private overlayAnimationConfig: OverlayAnimationConfig;
  

  constructor(private overlayManager: AngularOverlayManagerService) { 
    this.selectedOverlay = ExampleOverlaySelectionOptions.Configurable;
    
    this.location = OverlayLocation.TopLeft;
    this.animation = OverlayAnimation.Slide;
    this.animationStartPoint = OverlayAnimationStartPoint.Left;
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

    console.log(this.OverlaySelectionOptions);
  }

  public showOverlay()
  {
    switch(this.selectedOverlay)
    {
      case ExampleOverlaySelectionOptions.Configurable:
        this.showConfigurableOverlay();
        break;
      case ExampleOverlaySelectionOptions.Left_Nav:
        this.showLeftNavOverlay();
        break;
      case ExampleOverlaySelectionOptions.Snackbar:
      case ExampleOverlaySelectionOptions.Bottom_Sheet:
        this.showSnackbarOrBottomSheetOverlay(this.selectedOverlay);
        break;
    }
  }

  public setNewOverlaySelection(newSelection: ExampleOverlaySelectionOptions){
    this.selectedOverlay = newSelection;
  }

  // Generating the example code strings is actually more readable this way than if we just did them
  // straight in the template. This isn't what I would call pretty but it is preferable to the alternative.
  public getOverlayConfigExampleCodeString()
  {
    switch(this.selectedOverlay)
    {
      case ExampleOverlaySelectionOptions.Configurable:
        return this.getOverlayConfigExampleCodeForConfigurableOverlay();
      case ExampleOverlaySelectionOptions.Left_Nav:
        return this.getOverlayConfigExampleCodeForLefNavOverlay();
      case ExampleOverlaySelectionOptions.Snackbar:
      case ExampleOverlaySelectionOptions.Bottom_Sheet:
        return this.getOverlayConfigExampleCodeForSnackbarOrBottomSheetOverlay();
    }
  }

  public getAnimationConfigExampleCodeString()
  {
    switch(this.selectedOverlay)
    {
      case ExampleOverlaySelectionOptions.Configurable:
        return this.getAnimationConfigExampleCodeStringForConfigurableOverlay();
      case ExampleOverlaySelectionOptions.Left_Nav:
        return this.getAnimationConfigExampleCodeStringForLeftNavOverlay();
      case ExampleOverlaySelectionOptions.Snackbar:
      case ExampleOverlaySelectionOptions.Bottom_Sheet:
        return this.getAnimationConfigExampleCodeStringForSnackbarOrBottomSheetOverlay();
    }
  }

  public getTestObject()
  {
    return {foo: 'bar', hello: 'world', test: 'object'};
  }

  private showConfigurableOverlay()
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

    let overlayRef: AomOverlayRef = this.overlayManager.open(ConfigurableOverlayComponent, this.overlayConfig, this.overlayAnimationConfig);
    let cancellationTimer: number;

    if (this.shouldForceClose)
    {
      cancellationTimer = window.setTimeout(() => { overlayRef.forceCancel() }, 3000);
    }

    overlayRef.onClose().subscribe((data: any) => {
      if (this.listenToOverlayClose)
      {
        data ? alert(`Overlay has closed! Returned data: ${JSON.stringify(data)} `) : alert('Overlay has closed! No data was returned.');
      }

      if (cancellationTimer)
      {
        window.clearTimeout(cancellationTimer);
      }
    });  
  }
  
  private showSnackbarOrBottomSheetOverlay(selectedOverlay: ExampleOverlaySelectionOptions)
  {
    let animationConfig = {
      location: OverlayLocation.BottomMiddle,
      animation: OverlayAnimation.Slide,
      animationStartPoint: OverlayAnimationStartPoint.Bottom,
      type: OverlayType.Docked
    };
    
    let overlayConfig: OverlayConfig = {shouldCloseOnBackgroundClick: false};

    if (selectedOverlay == ExampleOverlaySelectionOptions.Snackbar)
    {
      this.overlayManager.open(SnackbarOverlayComponent, overlayConfig, animationConfig);
    }
    else
    {
      this.overlayManager.open(BottomSheetOverlayComponent, overlayConfig, animationConfig);
    }
  }

  private showLeftNavOverlay()
  {
    let animationConfig = {
      location: OverlayLocation.TopLeft,
      animation: OverlayAnimation.Slide,
      animationStartPoint: OverlayAnimationStartPoint.Left,
      type: OverlayType.Docked
    };
    
    let overlayConfig: OverlayConfig = {shouldCloseOnBackgroundClick: true};
    this.overlayManager.open(LeftNavOverlayComponent, overlayConfig, animationConfig);
  }

  private getAnimationConfigExampleCodeStringForConfigurableOverlay()
  {
    let codeString = '\n';
    codeString += 'overlayAnimationConfig = {';
    codeString += `\n\tlocation: OverlayLocation.${OverlayLocation[this.location]}`;
    codeString += `\n\tanimation: OverlayAnimation.${OverlayAnimation[this.animation]}`;
    codeString += `\n\tanimationStartPoint: AnimationStartPoint.${OverlayAnimationStartPoint[this.animationStartPoint]}`;
    codeString += `\n\ttype: OverlayType.${OverlayType[this.type]}`;
    codeString += '\n}';
    return codeString;
  }

  private getAnimationConfigExampleCodeStringForSnackbarOrBottomSheetOverlay()
  {
    let codeString = '\n';
    codeString += 'overlayAnimationConfig = {';
    codeString += `\n\tlocation: OverlayLocation.BottomMiddle`;
    codeString += `\n\tanimation: OverlayAnimation.Slide`;
    codeString += `\n\tanimationStartPoint: OverlayAnimationStartPoint.Bottom`;
    codeString += `\n\ttype: OverlayType.Docked`;
    codeString += '\n}';
    return codeString;
  }

  private getAnimationConfigExampleCodeStringForLeftNavOverlay()
  {
    let codeString = '\n';
    codeString += 'overlayAnimationConfig = {';
    codeString += `\n\tlocation: OverlayLocation.TopLeft`;
    codeString += `\n\tanimation: OverlayAnimation.Slide`;
    codeString += `\n\tanimationStartPoint: OverlayAnimationStartPoint.Left`;
    codeString += `\n\ttype: OverlayType.Docked`;
    codeString += '\n}';
    return codeString;
  }

  private getOverlayConfigExampleCodeForConfigurableOverlay()
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

  private getOverlayConfigExampleCodeForSnackbarOrBottomSheetOverlay()
  {
    let codeString = '\n';
    codeString += 'overlayConfig = {';
    codeString += `\n\tshouldCloseOnBackgroundClick: false`;
    codeString += '\n}';
    return codeString;
  }

  private getOverlayConfigExampleCodeForLefNavOverlay()
  {
    let codeString = '\n';
    codeString += 'overlayConfig = {';
    codeString += `\n\tshouldCloseOnBackgroundClick: true`;
    codeString += '\n}';
    return codeString;
  }
}
