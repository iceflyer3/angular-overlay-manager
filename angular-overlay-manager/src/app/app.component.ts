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
  AomOverlayConfig, 
  AomOverlayAnimationConfig, 
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

  // Configurable Overlay variables
  public location: OverlayLocation;
  public animation: OverlayAnimation;
  public animationStartPoint: OverlayAnimationStartPoint;
  public type: OverlayType;
  public shouldPassData: boolean;
  public usesScrim: boolean;
  public closeOnScrimClick: boolean;
  public listenToOverlayClose: boolean;
  public shouldForceClose: boolean;

  // Snackbar Overlay variables
  public showSuccessiveSnackbars: boolean;
  public successiveSnackbarCount: number;

  private overlayConfig: AomOverlayConfig;
  private overlayAnimationConfig: AomOverlayAnimationConfig;
  

  constructor(private overlayManager: AngularOverlayManagerService) { 
    this.selectedOverlay = ExampleOverlaySelectionOptions.Configurable;
    
    this.location = OverlayLocation.TopLeft;
    this.animation = OverlayAnimation.Slide;
    this.animationStartPoint = OverlayAnimationStartPoint.Left;
    this.type = OverlayType.Modal;
    this.shouldPassData = false;
    this.usesScrim = true;
    this.closeOnScrimClick = true;
    this.listenToOverlayClose = true;

    this.showSuccessiveSnackbars = false;
    this.successiveSnackbarCount = 2;
    
    this.overlayConfig = {
      type: this.type,
      useScrimBackground: true,
      shouldCloseOnBackgroundClick: this.closeOnScrimClick
    }

    this.overlayAnimationConfig = {
      location: this.location,
      animation: this.animation,
      animationStartPoint: this.animationStartPoint      
    };
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
    // HTML <input>'s get bound as a string so we have to cast the inputs tied to enums back to their numerical value or they will appear to be broken
    this.overlayAnimationConfig = {
      location: Number(this.location),
      animation: Number(this.animation),
      animationStartPoint: Number(this.animationStartPoint),
    }
    this.overlayConfig = {
      type: Number(this.type),
      useScrimBackground: this.usesScrim,
      shouldCloseOnBackgroundClick: this.closeOnScrimClick,
      data: this.shouldPassData ? this.getTestObject() : null,
    }

    let overlayRef: AomOverlayRef = this.overlayManager.open(ConfigurableOverlayComponent, this.overlayConfig, this.overlayAnimationConfig);
    let cancellationTimer: number;

    if (this.shouldForceClose)
    {
      cancellationTimer = window.setTimeout(() => { overlayRef.forceCancel() }, 3000);
    }

    overlayRef.onClose().then((data: any) => {
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
    let animationConfig: AomOverlayAnimationConfig = {
      location: OverlayLocation.BottomMiddle,
      animation: OverlayAnimation.Slide,
      animationStartPoint: OverlayAnimationStartPoint.Bottom,
    };
    
    let overlayConfig: AomOverlayConfig = {
      type: OverlayType.Docked,
      useScrimBackground: true,
      shouldCloseOnBackgroundClick: false
    };

    if (selectedOverlay == ExampleOverlaySelectionOptions.Snackbar)
    {
      if (this.showSuccessiveSnackbars)
      {
        this.showSnackbarRecursive(overlayConfig, animationConfig, this.successiveSnackbarCount);
      }
      else
      {
        this.overlayManager.open(SnackbarOverlayComponent, overlayConfig, animationConfig);
      }
    }
    else
    {
      this.overlayManager.open(BottomSheetOverlayComponent, overlayConfig, animationConfig);
    }
  }

  private showSnackbarRecursive(overlayConfig: AomOverlayConfig, animationConfig: AomOverlayAnimationConfig, remainingIterations: number)
  {
    if (remainingIterations > 0)
    {
      overlayConfig.data = remainingIterations;

      let ref: AomOverlayRef = this.overlayManager.open(SnackbarOverlayComponent, overlayConfig, animationConfig);
      ref.onClose().then(() => {
        remainingIterations--;
        this.showSnackbarRecursive(overlayConfig, animationConfig, remainingIterations);
      });
    }
    else
    {
      alert('All snackbars have been shown and then closed!')
    }
  }

  private showLeftNavOverlay()
  {
    let animationConfig = {
      location: OverlayLocation.TopLeft,
      animation: OverlayAnimation.Slide,
      animationStartPoint: OverlayAnimationStartPoint.Left
    };
    
    let overlayConfig: AomOverlayConfig = {
      type: OverlayType.Docked,
      useScrimBackground: true, 
      shouldCloseOnBackgroundClick: true
    };
    this.overlayManager.open(LeftNavOverlayComponent, overlayConfig, animationConfig);
  }

  // Generating the example code strings is actually more readable this way than if we just did them
  // straight in the template. This isn't what I would call pretty but it is preferable to the alternative.
  private getAnimationConfigExampleCodeStringForConfigurableOverlay()
  {
    let codeString = '\n';
    codeString += 'overlayAnimationConfig = {';
    codeString += `\n\tlocation: OverlayLocation.${OverlayLocation[this.location]}`;
    codeString += `\n\tanimation: OverlayAnimation.${OverlayAnimation[this.animation]}`;
    codeString += `\n\tanimationStartPoint: AnimationStartPoint.${OverlayAnimationStartPoint[this.animationStartPoint]}`;
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
    codeString += `\n\ttype: OverlayType.${OverlayType[this.type]}`;
    codeString += `\n\tuseScrimBackground: ${this.usesScrim}`;
    codeString += `\n\tshouldCloseOnBackgroundClick: ${this.closeOnScrimClick}`;
    codeString += '\n}';
    return codeString;
  }

  private getOverlayConfigExampleCodeForSnackbarOrBottomSheetOverlay()
  {
    let codeString = '\n';
    codeString += 'overlayConfig = {';
    codeString += `\n\ttype: OverlayType.Docked`;
    codeString += `\n\tuseScrimBackground: true`;
    codeString += `\n\tshouldCloseOnBackgroundClick: false`;
    codeString += '\n}';
    return codeString;
  }

  private getOverlayConfigExampleCodeForLefNavOverlay()
  {
    let codeString = '\n';
    codeString += 'overlayConfig = {';
    codeString += `\n\ttype: OverlayType.Docked`;
    codeString += `\n\tuseScrimBackground: true`;
    codeString += `\n\tshouldCloseOnBackgroundClick: true`;
    codeString += '\n}';
    return codeString;
  }
}
