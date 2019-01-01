import { ApplicationRef, ComponentFactoryResolver, Injector, Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { ComponentRef } from "@angular/core/src/render3";

export class ElementManager{

    constructor(private appRef: ApplicationRef, private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector, @Inject(DOCUMENT) private document: any) { }

    public createAndAddToDom(component: any): any
    {
        let flexboxContainer = this.createFlexboxContainer();
        let dynamicComponentRef = this.createComponent(component);
        
        flexboxContainer.appendChild(dynamicComponentRef.location.nativeElement);
        this.document.body.appendChild(flexboxContainer);

        return dynamicComponentRef;
    }

    public destroyAndRemoveFromDom(componentRef: ComponentRef<{}>)
    {
        let container = this.document.getElementById("aom-flexbox-container");
        container.parentNode.removeChild(container);
        
        this.appRef.detachView(componentRef.hostView);

        componentRef.destroy();
    }

    private createFlexboxContainer(): any
    {
        let containerElement = this.document.createElement("div");
        containerElement.setAttribute("id", "aom-flexbox-container");
        containerElement.setAttribute("tabindex", "-1");
        containerElement.setAttribute("role", "dialog");
        containerElement.classList.add("flex-container");

        return containerElement;
    }

    private createComponent(component: any): any
    {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        let newComponentRef = componentFactory.create(this.injector);

        this.appRef.attachView(newComponentRef.hostView);

        return newComponentRef;
    }
}