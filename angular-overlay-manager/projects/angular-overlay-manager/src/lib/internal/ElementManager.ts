/*
    This file is part of Angular Overlay Manager which is released under the BSD 3-Clause License.
    You should have received a copy of this license in LICENSE.txt along with this file. 
    
    In the event that you did not receive a copy of the license see https://opensource.org/licenses/BSD-3-Clause
    for the full license details.
*/

import { ApplicationRef, ComponentFactoryResolver, Injector, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { ComponentRef } from "@angular/core/src/render3";

import { OverlayContainerComponent } from "./overlay-container/overlay-container.component";

export class ElementManager{

    constructor(private appRef: ApplicationRef, private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector, @Inject(DOCUMENT) private document: Document) { }

    public createAndAddToDom(component: any): ComponentRef<OverlayContainerComponent>
    {
        let dynamicComponentRef = this.createAndInitializeOverlayContainer(component);        
        this.document.body.appendChild(dynamicComponentRef.location.nativeElement);

        return dynamicComponentRef;
    }

    public destroyAndRemoveFromDom(componentRef: any)
    {
        let container = this.document.getElementById("aom-flexbox-container");
        let containerScrim = this.document.getElementById("aom-flexbox-container-scrim");

        // In the event of multiple clicks the element will have already been removed after the first
        // click is processed so container would be null on subsequent attempts to remove it
        if (container)
        {
            container.parentNode.removeChild(container);
            containerScrim.parentNode.removeChild(containerScrim);
            
            this.appRef.detachView(componentRef.hostView);

            componentRef.destroy();
        }
    }

    private createAndInitializeOverlayContainer(overlayComponent: any): any
    {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(OverlayContainerComponent);
        let newComponentRef = componentFactory.create(this.injector);
        
        newComponentRef.instance.createOverlayComponent(overlayComponent);

        return newComponentRef;
    }
}