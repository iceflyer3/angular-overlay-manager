import { RendererFactory2, Inject, Renderer2 } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { OverlayConfig } from "../public/OverlayConfig";
import { of } from "rxjs";
import { AnimationStartPoint } from "../public/enums/AnimationStartPoint";
import { Location } from "../public/enums/Location";
import { Animation } from "../public/enums/Animation";
import { OverlayType } from "../public/enums/OverlayType";


export class AnimationManager {
    
    private renderer: Renderer2;

    constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document :any) { }

    public applyConfiguration(config: OverlayConfig)
    {
        this.renderer = this.rendererFactory.createRenderer(null, null);
        let overlayElement = this.document.getElementById("aom-overlay");
        let flexboxContainer = this.document.getElementById("aom-flexbox-container");
        let containerScrim = this.document.getElementById("aom-flexbox-container-scrim");
        
        // Initialize the scrim and the desired animation
        this.initializeScrimAnimation(containerScrim);

        switch(config.animation)
        {
            case Animation.Slide:
                this.initializeSlideAnimation(flexboxContainer, overlayElement, config);
                break;
            case Animation.Fade:
                this.initializeFadeAnimation(flexboxContainer, overlayElement, config);
                break;
        }

        this.forceDomReflowFlush(overlayElement);

        // Play the "enter" of the initialized animation
        this.triggerAnimation(overlayElement, containerScrim, config);
    }

    public triggerClose(config: OverlayConfig): Promise<{}>{
     
        let overlayElement = this.document.getElementById("aom-overlay");
        let containerScrim = this.document.getElementById("aom-flexbox-container-scrim");

        switch(config.animation)
        {
            case Animation.Fade:
                this.closeFadeAnimation(overlayElement);
                break;
            case Animation.Slide:
                this.closeSlideAnimation(overlayElement, config.type);
                break;
        }

        this.closeScrimAnimation(containerScrim);
        this.forceDomReflowFlush(overlayElement);

        return of().toPromise();
    }

    private triggerAnimation(element: any, scrim: any, config: OverlayConfig)
    {
        // Trigger the scrim animation
        this.renderer.addClass(scrim, 'scrim-open');

        // Apply the proper "location" class to un-do translation and trigger entry transition
        let overlayPositionClass = this.getOverlayClassForType(config.type);
        this.renderer.addClass(element, overlayPositionClass); 

        if (config.animation === Animation.Fade)
        {
            this.renderer.addClass(element, 'anim-emerge');
        }
    }

    private initializeScrimAnimation(scrim: any)
    {
        this.renderer.addClass(scrim, 'scrim-transition');
        this.renderer.addClass(scrim, 'scrim-close');
    }

    private initializeSlideAnimation(container: any, element: any, config: OverlayConfig)
    {   
        // Configure slide transition
        this.renderer.addClass(element, 'trans-anim-slide');

        // Configure the flex container to properly align the elements on the screen
        let containerClasses = this.getContainerClassesForLocation(config.location);
        this.renderer.addClass(container, containerClasses.xAxisClass);
        this.renderer.addClass(container, containerClasses.yAxisClass);

        // Configure initial (off-screen) position for overlay animation
        let overlayClass = this.getOverlayClassForSlideAnimation(config.animationStartPoint);
        this.renderer.addClass(element, overlayClass);
    }

    private initializeFadeAnimation(container: any, element: any, config: OverlayConfig)
    {
        this.renderer.addClass(element, 'trans-anim-fade');

        let containerClasses = this.getContainerClassesForLocation(config.location);
        this.renderer.addClass(container, containerClasses.xAxisClass);
        this.renderer.addClass(container, containerClasses.yAxisClass);

        this.renderer.addClass(element, 'anim-fade');
    }

    private closeSlideAnimation(element: any, type: OverlayType)
    {
        // Apply the proper "location" class to un-do translation and trigger transition
        let overlayPositionClass = this.getOverlayClassForType(type);
        this.renderer.removeClass(element, overlayPositionClass); 
    }

    private closeFadeAnimation(element: any)
    {
        this.renderer.removeClass(element, 'anim-emerge');
    }

    private closeScrimAnimation(scrim: any)
    {
        this.renderer.removeClass(scrim, 'scrim-open');
    }
	

    private getContainerClassesForLocation(location: Location): { xAxisClass: string, yAxisClass: string }
    {
        let containerClasses = {xAxisClass: '', yAxisClass: ''};

        // Determine the horizontal flexbox class
        switch(location)
        {
            case Location.TopLeft:
            case Location.BottomLeft:
            case Location.LeftMiddle:
                containerClasses.xAxisClass = 'flex-left';
                break;
            case Location.TopRight:
            case Location.BottomRight:
            case Location.RightMiddle:
                containerClasses.xAxisClass = 'flex-right';
                break;
            case Location.TopMiddle:
            case Location.BottomMiddle:
            case Location.Center:
                containerClasses.xAxisClass = 'flex-horiz-center';
                break;
        }

        // Determine the vertical flexbox class
        switch(location)
        {
            case Location.TopLeft:
            case Location.TopMiddle:
            case Location.TopRight:
                containerClasses.yAxisClass = 'flex-top';
                break;
            case Location.BottomLeft:
            case Location.BottomMiddle:
            case Location.BottomRight:
                containerClasses.yAxisClass = 'flex-bottom';
                break;
            case Location.LeftMiddle:
            case Location.RightMiddle:
            case Location.Center:
                containerClasses.yAxisClass = 'flex-vert-center';
                break;
        }

        return containerClasses;
    }

    private getOverlayClassForType(type: OverlayType): string
    {
        let className = '';
        
        switch(type)
        {
            case OverlayType.Modal:
                className = 'position-modal';
                break;
            case OverlayType.Docked:
                className = 'position-docked';
                break;
        }
        
        return className;
    }

    private getOverlayClassForSlideAnimation(startPoint: AnimationStartPoint): string
    {
        let className = ''
        switch(startPoint)
        {
            case AnimationStartPoint.Top:
                className = 'anim-slide-top';
                break;
            case AnimationStartPoint.Bottom:
                className = 'anim-slide-bottom';
                break;
            case AnimationStartPoint.Left:
                className = 'anim-slide-left';
                break;
            case AnimationStartPoint.Right:
                className = 'anim-slide-right';
                break;
        }
        return className;
    }

    private forceDomReflowFlush(element: any)
    {
        /* 
            Accessing offsetWidth below is a hack to ensure the transition animation will play for elements that are dynamically added and bears a bit of explanation. 
            I was turned onto this hack from the following https://stackoverflow.com/questions/24148403/trigger-css-transition-on-appended-element
            
            -----------------------------------------------------------
            To my understanding this hack works in the following way: 
            -----------------------------------------------------------
            If we appendChild() and then immediately set the class both of these actions will cause a DOM reflow, which basically means that the browser
            has to re-layout all of the elements on part of or all of the screen.

            Because a reflow can be an expensive operation the browser will batch them together which effectively optimizes one (or more if required) of them away.
            It will effectively take the actions that are needed to be taken in each reflow and combine them into a single reflow operation in the name of efficiency.

            From the standpoint of our animation this means that when the screen is actually rendered it will be rendered with the final state 
            (the one at the end of the animation) and thus skip actually showing the transition animation. 

            In order to get the transition animation to actually play we need to force the browser to go ahead and do the reflow triggerd by appendChild() **WITHOUT**
            combining the tasks that will be required for the reflow that will be triggered by the class change. You can do this by requesting style information as we
            have done below by accessing offsetWidth. This works because the style information must be up to date but in order to be up to date the browser must process
            the changes for the current reflow and it does not yet know about the second reflow that will eventually be required by the class change so they can't be combined.
            
            We then trigger another reflow by adding our class and since the addition of the element to the DOM and the changing of the class are now performed in 
            different reflows the animation will actually play because the element will not be rendered to the DOM with the "animation completed" styles. 

            For further details about how browsers do all of this magic as well as a non-exhaustive list about what causes reflows see the following articles:
            http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
            http://kellegous.com/j/2013/01/26/layout-performance/
            https://gist.github.com/paulirish/5d52fb081b3570c81e3a
        */
        element.offsetWidth;
    }
}