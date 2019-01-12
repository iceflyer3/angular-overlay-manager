import { Component, OnInit, OnDestroy, Inject, ComponentFactoryResolver, ViewChild, ComponentRef, ViewEncapsulation } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { APP_CONFIG } from '../dependency-injection/internal-di-tokens';
import { IAppConfig } from '../app-config/IAppConfig';
import { OverlayHostDirective } from '../overlay-host.directive';
import { overlayDataProvider } from '../dependency-injection/overlay-data-provider';

@Component({
  selector: 'aom-overlay-container',
  templateUrl: './overlay-container.component.html',
  styleUrls: ['./overlay-container.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [overlayDataProvider]
})
export class OverlayContainerComponent implements OnInit {

  @ViewChild(OverlayHostDirective) overlayHost: OverlayHostDirective;

  private scrimClickSubject: Subject<any>;
  private isProcessingScrimClick: boolean;
  private overlayComponentRef: ComponentRef<any>
  private overlayData: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, @Inject(APP_CONFIG) private appConfig: IAppConfig) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.scrimClickSubject.complete();
    this.overlayComponentRef.destroy();
  }

  public createOverlayComponent(overlayComponent: any)
  {
    this.scrimClickSubject = new Subject<any>();
    this.isProcessingScrimClick = false;

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(overlayComponent);
    let viewContainerRef = this.overlayHost.viewContainerRef;

    viewContainerRef.clear();

    this.overlayComponentRef = viewContainerRef.createComponent(componentFactory);
  }

  public setOverlayData(data: any)
  {
    this.overlayData = data;
  }

  public getOverlayData(): any
  {
    return this.overlayData;
  }

  public closeOverlayOnScrimClick()
  {
    if (!this.isProcessingScrimClick)
    {
        this.isProcessingScrimClick = true;
        this.emitScrimClickedEvent(); 

        /*
            Prevent clicks from being spammed on the scrim after the first one for the
            duration of the transition.

            Allowing clicks to be spammed here will result in console errors for every
            click after the first. 
        */
        setTimeout(() => {this.isProcessingScrimClick = false;}, this.appConfig.AnimationTimeInMs);
    }
  }

  public onScrimClicked(): Observable<any>
  {
      return this.scrimClickSubject.asObservable();
  }

  private emitScrimClickedEvent()
  {
      this.scrimClickSubject.next();
  }
}
