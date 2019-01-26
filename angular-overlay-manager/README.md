# Angular Overlay Manager

Angular Overlay Manager is an Angular Library project that is intended to be a simple wrapper around arbitrary Angular components that allows you to easily display said components as overlays on the screen while interacting with them in an Angular way. 

## PREREQUISITES

Angular Overlay Manager was written using Angular version 6.1.10. It has not been tested on other versions.

The library uses CSS flexbox for positioning elements on the screen and CSS transitions for animating elements on and off the screen. Thus it will not work anywhere that these technologies are unavailable.

## USING THE LIBRARY
To see a live demo vist the demo application located at https://iceflyer3.github.io/angular-overlay-manager/

### Installation instructions

The library may be installed via NPM.

```typescript

npm install angular-overlay-manager

```

### Configuring a component for use as an overlay
An overlay component must set the ID attribute of the top level element of the HTML template to **"aom-overlay"**. For example, if you wanted a bootstrap style modal dialog the html in the template of your component would look like this. 
```html
<div class="modal" id="aom-overlay">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        ...
      </div>
      <div class="modal-body">
        ...
      <div class="modal-footer">
        ...
      </div>
    </div>
  </div>
</div>
```


You must also add the component to the `entryComponents` array of your `NgModule`. 

```typescript

@NgModule({
  ...
  entryComponents: [YourOverlayComponent, ...]
  ...
})
export class YourAppModule {
}

```

The library does not apply any styles to overlay components other than those needed to ensure the overlay is not hidden, animate the overlay on and off the screen, place it in the desired location, and apply the needed margin for the desired overlay type as indicated by the specified configurations. 

It makes no efforts to make sure the component is properly styled as an overlay or that it is mobile friendly with different screen sizes. Handling the aesthetics, mobile friendliness, etc... is up to you. 


### Basic use
Add the import for the AngularOverlayManagerModule and then add it to the `imports` array of your NgModule. Additionally, add any components you want to use as an overlay to the `entryComponents` array.

```typescript

import {AngularOverlayManagerModule} from 'angular-overlay-manager';

@NgModule({
  ...
  imports: [AngularOverlayManagerModule, ...],
  entryComponents: [YourOverlayComponent, ...]
  ...
})
export class YourAppModule {
}

```

Import the AngularOverlayManagerService, the overlay configuration classes, and the enums that contain the configuration options into the component that will open the overlay.
```typescript

import { 
  AngularOverlayManagerService,
  OverlayConfig, 
  OverlayAnimationConfig, 
  OverlayLocation, 
  OverlayAnimation, 
  OverlayAnimationStartPoint, 
  OverlayType } from 'angular-overlay-manager';

@Component({
  ...
})
export class YourComponent {
    ...
    constructor(private overlayManager: AngularOverlayManagerService) { 
        ...
    }
}

```

Configure the overlay options and then call `open(ComponentType, OverlayConfig, OverlayAnimationConfig)` on the `AngularOverlayManagerService` passing in the type of the desired component, the `OverlayConfig`, and the `OverlayAnimationConfig`
```typescript

...

let overlayConfig = {
      shouldCloseOnBackgroundClick: true;
    }

let overlayAnimationConfig = {
    location: OverlayLocation.TopLeft,
    animation: OverlayAnimation.Slide,
    animationStartPoint: OverlayAnimationStartPoint.Left,
    type: OverlayType.Modal
};

this.overlayManager.open(YourOverlayComponent, overlayConfig, overlayAnimationConfig);

...

``` 

The overlay is closed by calling the `close()` or `cancel()` functions on the `AomOverlay` instance that is injected into the dynamically created component of the type you specified in the call to `overlayManager.open(...)`
```typescript

import { Component, OnInit } from '@angular/core';
import { AomOverlay } from 'angular-overlay-manager';

@Component({
  ...
})
export class YourOverlayComponent implements OnInit {

  constructor(private overlay: AomOverlay)  { 
      ...
  }

  close() 
  {
    this.overlay.close();
  }

  cancel()
  {
      this.overlay.cancel();
  }

  ...
}


```

### Passing data to the overlay
If you have some data that you would like pass to the overlay then you'll need to set it on the data property of the `OverlayConfig` before you open the overlay. 

```typescript

...

let sampleData = 'Hello world!';

let overlayConfig = {
      data: sampleData;
      shouldCloseOnBackgroundClick: true;
    }

...

```

This makes the data available via dependency injection for your overlay component. In your overlay component you'll need to inject the data using the `OVERLAY_DATA` injection token. 

```typescript

import { Component, Inject, ... } from '@angular/core';
import { AomOverlay, OVERLAY_DATA } from 'angular-overlay-manager';

@Component({
  ...
})
export class YourOverlayComponent implements OnInit {

  constructor(private overlay: AomOverlay, @Inject(OVERLAY_DATA) private data: any)  { 
      ...
  }

  ...
}

```

### Passing data back when the overlay is closed
If you would like to pass some data back from the overlay when it is closed then call the `close(data)` variant of the `AomOverlay`'s close function. This makes the data available in the `onClose` event of the `AomOverlayRef`.

```typescript

import { Component, ... } from '@angular/core';
import { AomOverlay } from 'angular-overlay-manager';

@Component({
  ...
})
export class YourOverlayComponent implements OnInit {

  ...
  private componentData: any;
  
  constructor(private overlay: AomOverlay)  { 
      ...
  }

  ...

  close() 
  {
    this.overlay.close(this.componentData);
  }

  ...
}

```

### Listening to the overlay close event
If you wish to know when the overlay has closed the library exposes an `onClose` event that you may listen for. 

Calls to `open(...)` on the overlay service will return an `AomOverlayRef` instance which exposes an `onClose()` function that returns an observable that you may subscribe to. 

```typescript

import { AngularOverlayManagerService, AomOverlayRef, ... } from 'angular-overlay-manager';

@Component({
  ...
})
export class YourComponent {
    ...
    constructor(private overlayManager: AngularOverlayManagerService) { 
        ...
    }

    public openOverlay(){
        ...
        let aomOverlayRef: AomOverlayRef = this.overlayManager.open(YourOverlayComponent, this.overlayConfig, this.overlayAnimationConfig);

        overlayRef.onClose().subscribe((data) => {
            ...
      });  
    }
}

```

The observable returned by `onClose()` will pass back any data that was passed to the `close(data)` function of the `AomOverlay`. Calls to the `cancel()` function of the `AomOverlay` or clicks on the background to close the overlay will never return any data. 

### Opening nested overlays
This library does **not** support opening nested overlays. There are **not** currently any plans to add support for this feature. 

If you attempt to open an overlay from an already open overlay you will receive an error via an alert dialog stating that you must first close the already open dialog.

## VERSIONING

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## LICENSE

This project is licensed under the BSD 3-Clause License - see the [LICENSE.txt](LICENSE.txt) file for details

## ACKNOWLEDGEMENTS

This project was inspired by the approach taken by both Angular Material and ng-bootstrap