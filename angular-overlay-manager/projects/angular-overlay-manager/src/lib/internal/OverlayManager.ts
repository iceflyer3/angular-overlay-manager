import { ComponentRef, Inject } from "@angular/core";
import { Subject, Observable } from "rxjs";

import { OverlayConfig } from "../public/OverlayConfig";
import { OverlayContainerComponent } from "./overlay-container/overlay-container.component";
import { OverlayAnimationConfig } from "../../public_api";
import { ElementManager } from "./ElementManager";
import { AnimationManager } from "./AnimationManager";
import { APP_CONFIG } from "./dependency-injection/internal-di-tokens";
import { IAppConfig } from "./app-config/IAppConfig";
import { OverlayDataAdapter } from "./dependency-injection/overlay-data-provider";

export class OverlayManager{
    
    private closeSubject: Subject<any>;
    private openComponentRef: ComponentRef<OverlayContainerComponent> = null;
    private openComponentAnimationConfig: OverlayAnimationConfig;

    constructor(private elementManager: ElementManager, private animationManager: AnimationManager, private overlayDataAdapter: OverlayDataAdapter, @Inject(APP_CONFIG) private appConfig: IAppConfig) {}

    public openOverlay(component: any, overlayConfig: OverlayConfig, animationConfig: OverlayAnimationConfig)
    {
        this.closeSubject = new Subject<any>();
        this.openComponentAnimationConfig = animationConfig;
        
        // Make any data available for injection when the instance is created below
        // Even if the data is null this will reset the data in the adapter
        this.overlayDataAdapter.setOverlayData(overlayConfig.data);

        // Create the component instance and add it to the dom then animate it onto the screen
        this.openComponentRef = this.elementManager.createAndAddToDom(component);
        
        if (overlayConfig.shouldCloseOnBackgroundClick)
        {
            this.openComponentRef.instance.onScrimClicked().subscribe(() => {
                this.cancelOverlay();
            });
        }

        this.animationManager.applyConfiguration(animationConfig);
    }

    public closeOverlay(data?: any)
    {
        this.close(data);
    }

    public cancelOverlay()
    {
        // By definition no data should be returned for a cancel operation
        this.close();
    }

    public hasOpenOverlay(): boolean
    {
        return this.openComponentRef !== null;
    }

    public onClose(): Observable<any>
    {
        return this.closeSubject.asObservable();
    }

    private close(data?: any)
    {
        if (this.openComponentRef !== null)
        { 
            this.animationManager.triggerClose(this.openComponentAnimationConfig).then(
                () => {
                    /* 
                        I'm not satisfied with this approach but we need to wait on the animation to finish
                        playing before we remove the component from the dom. I tried using transitionend but 
                        it would fire instantly (before the animation had actually completed) so didn't pan out.  

                        The delay is the same length of time the animation is set to play for. 
                    */
                    setTimeout(() => {
                        this.elementManager.destroyAndRemoveFromDom(this.openComponentRef);
                        this.openComponentRef = null;
                        this.emitCloseEvent(data);
                    }, this.appConfig.AnimationTimeInMs)
                }
            );
        }
    }

    private emitCloseEvent(data?: any)
    {
        this.closeSubject.next(data);
        this.closeSubject.complete();
    }
}