/*
    This file is part of Angular Overlay Manager which is released under the MIT License.
    You should have received a copy of this license in LICENSE.txt along with this file. 
    
    In the event that you did not receive a copy of the license see https://opensource.org/licenses/MIT 
    for the full license details.
*/

import { RendererFactory2, Inject, Renderer2 } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { of } from "rxjs";

import { OverlayAnimationConfig } from "../public/OverlayAnimationConfig";
import { OverlayAnimationStartPoint } from "../public/enums/OverlayAnimationStartPoint";
import { OverlayLocation } from "../public/enums/OverlayLocation";
import { OverlayAnimation } from "../public/enums/OverlayAnimation";
import { OverlayType } from "../public/enums/OverlayType";


export class AnimationManager {
    
    private renderer: Renderer2;

    constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document :any) { }

    public applyConfiguration(config: OverlayAnimationConfig)
    {
        this.renderer = this.rendererFactory.createRenderer(null, null);
        let overlayElement = this.document.getElementById("aom-overlay");
        let flexboxContainer = this.document.getElementById("aom-flexbox-container");
        let containerScrim = this.document.getElementById("aom-flexbox-container-scrim");
        
        // Initialize the scrim and the desired animation
        this.initializeScrimAnimation(containerScrim);

        switch(config.animation)
        {
            case OverlayAnimation.Slide:
                this.initializeSlideAnimation(flexboxContainer, overlayElement, config);
                break;
            case OverlayAnimation.Fade:
                this.initializeFadeAnimation(flexboxContainer, overlayElement, config);
                break;
        }

        this.forceDomReflowFlush(overlayElement);

        // Play the "enter" of the initialized animation
        this.triggerAnimation(overlayElement, containerScrim, config);
    }

    public triggerClose(config: OverlayAnimationConfig): Promise<{}>{
     
        let overlayElement = this.document.getElementById("aom-overlay");
        let containerScrim = this.document.getElementById("aom-flexbox-container-scrim");

        switch(config.animation)
        {
            case OverlayAnimation.Fade:
                this.closeFadeAnimation(overlayElement);
                break;
            case OverlayAnimation.Slide:
                this.closeSlideAnimation(overlayElement);
                break;
        }

        this.closeScrimAnimation(containerScrim);
        this.forceDomReflowFlush(overlayElement);

        return of().toPromise();
    }

    private triggerAnimation(element: any, scrim: any, config: OverlayAnimationConfig)
    {
        // Trigger the scrim animation
        this.renderer.addClass(scrim, 'aom-scrim-open');

        // Apply the proper "location" class to un-do translation and trigger entry transition
        let overlayPositionClass = this.getOverlayClassForType(config.type);
        this.renderer.addClass(element, overlayPositionClass); 

        switch(config.animation)
        {
            case OverlayAnimation.Fade:
                this.renderer.addClass(element, 'aom-anim-fade-emerge');    
                break;
            case OverlayAnimation.Slide:
                this.renderer.addClass(element, 'aom-anim-slide-emerge');
        }
    }

    private initializeScrimAnimation(scrim: any)
    {
        this.renderer.addClass(scrim, 'aom-scrim-transition');
        this.renderer.addClass(scrim, 'aom-scrim-close');
    }

    private initializeSlideAnimation(container: any, element: any, config: OverlayAnimationConfig)
    {   
        // Configure slide transition
        this.renderer.addClass(element, 'aom-trans-anim-slide');

        // Configure the flex container to properly align the elements on the screen
        let containerClasses = this.getContainerClassesForLocation(config.location);
        this.renderer.addClass(container, containerClasses.xAxisClass);
        this.renderer.addClass(container, containerClasses.yAxisClass);

        // Configure initial (off-screen) position for overlay animation
        let overlayClass = this.getOverlayClassForSlideAnimation(config.animationStartPoint);
        this.renderer.addClass(element, overlayClass);
    }

    private initializeFadeAnimation(container: any, element: any, config: OverlayAnimationConfig)
    {
        this.renderer.addClass(element, 'aom-trans-anim-fade');

        let containerClasses = this.getContainerClassesForLocation(config.location);
        this.renderer.addClass(container, containerClasses.xAxisClass);
        this.renderer.addClass(container, containerClasses.yAxisClass);

        this.renderer.addClass(element, 'aom-anim-fade');
    }

    private closeSlideAnimation(element: any)
    {
        this.renderer.removeClass(element, "aom-anim-slide-emerge"); 
    }

    private closeFadeAnimation(element: any)
    {
        this.renderer.removeClass(element, 'aom-anim-fade-emerge');
    }

    private closeScrimAnimation(scrim: any)
    {
        this.renderer.removeClass(scrim, 'aom-scrim-open');
    }

    private getContainerClassesForLocation(location: OverlayLocation): { xAxisClass: string, yAxisClass: string }
    {
        let containerClasses = {xAxisClass: '', yAxisClass: ''};

        // Determine the horizontal flexbox class
        switch(location)
        {
            case OverlayLocation.TopLeft:
            case OverlayLocation.BottomLeft:
            case OverlayLocation.LeftMiddle:
                containerClasses.xAxisClass = 'aom-flex-left';
                break;
            case OverlayLocation.TopRight:
            case OverlayLocation.BottomRight:
            case OverlayLocation.RightMiddle:
                containerClasses.xAxisClass = 'aom-flex-right';
                break;
            case OverlayLocation.TopMiddle:
            case OverlayLocation.BottomMiddle:
            case OverlayLocation.Center:
                containerClasses.xAxisClass = 'aom-flex-horiz-center';
                break;
        }

        // Determine the vertical flexbox class
        switch(location)
        {
            case OverlayLocation.TopLeft:
            case OverlayLocation.TopMiddle:
            case OverlayLocation.TopRight:
                containerClasses.yAxisClass = 'aom-flex-top';
                break;
            case OverlayLocation.BottomLeft:
            case OverlayLocation.BottomMiddle:
            case OverlayLocation.BottomRight:
                containerClasses.yAxisClass = 'aom-flex-bottom';
                break;
            case OverlayLocation.LeftMiddle:
            case OverlayLocation.RightMiddle:
            case OverlayLocation.Center:
                containerClasses.yAxisClass = 'aom-flex-vert-center';
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
                className = 'aom-type-modal';
                break;
            case OverlayType.Docked:
                className = 'aom-type-docked';
                break;
        }
        
        return className;
    }

    private getOverlayClassForSlideAnimation(startPoint: OverlayAnimationStartPoint): string
    {
        let className = ''
        switch(startPoint)
        {
            case OverlayAnimationStartPoint.Top:
                className = 'aom-anim-slide-top';
                break;
            case OverlayAnimationStartPoint.Bottom:
                className = 'aom-anim-slide-bottom';
                break;
            case OverlayAnimationStartPoint.Left:
                className = 'aom-anim-slide-left';
                break;
            case OverlayAnimationStartPoint.Right:
                className = 'aom-anim-slide-right';
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