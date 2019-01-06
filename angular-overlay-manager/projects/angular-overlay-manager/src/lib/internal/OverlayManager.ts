import { ComponentRef, Inject } from "@angular/core";

import { OverlayConfig } from "../public/OverlayConfig";
import { OverlayContainerComponent } from "./overlay-container/overlay-container.component";
import { OverlayAnimationConfig } from "../../public_api";
import { ElementManager } from "./ElementManager";
import { AnimationManager } from "./AnimationManager";
import { APP_CONFIG } from "./dependency-injection/internal-di-tokens";
import { IAppConfig } from "./app-config/IAppConfig";

export class OverlayManager{
    
    private openComponentRef: ComponentRef<OverlayContainerComponent> = null;
    private openComponentAnimationConfig: OverlayAnimationConfig;
    private overlayData: any;

    constructor(private elementManager: ElementManager, private animationManager: AnimationManager, @Inject(APP_CONFIG) private appConfig: IAppConfig) {}

    public openOverlay(component: any, overlayConfig: OverlayConfig, animationConfig: OverlayAnimationConfig)
    {
        this.openComponentAnimationConfig = animationConfig;
        this.overlayData = overlayConfig.data;

        this.openComponentRef = this.elementManager.createAndAddToDom(component);
        this.animationManager.applyConfiguration(animationConfig);

        if (overlayConfig.shouldCloseOnBackgroundClick)
        {
            this.openComponentRef.instance.onScrimClicked().subscribe(() => {
                this.closeOverlay();
            });
        }
    }

    public closeOverlay()
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
                    }, this.appConfig.AnimationTimeInMs)
                }
            );
        }
    }

    public hasOpenOverlay(): boolean
    {
        return this.openComponentRef === undefined;
    }

    public getOverlayData(): any
    {
        return this.overlayData;
    }
}