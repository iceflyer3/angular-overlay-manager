import { ApplicationRef, ComponentFactoryResolver, Injector, Inject, Injectable, EventEmitter } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { ComponentRef } from "@angular/core/src/render3";
import { Subject, Observable } from "rxjs";
import { APP_CONFIG } from "./app-config/ConfigDiToken";
import { IAppConfig } from "./app-config/IAppConfig";

export class ElementManager{

    private scrimClickSubject: Subject<any>;
    private isProcessingScrimClick: boolean;

    constructor(private appRef: ApplicationRef, private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector, @Inject(DOCUMENT) private document: any, @Inject(APP_CONFIG) private appConfig: IAppConfig) { }

    public createAndAddToDom(component: any): any
    {
        this.scrimClickSubject = new Subject<any>();
        this.isProcessingScrimClick = false;

        let flexboxContainer = this.createFlexboxContainer();
        let containerScrim = this.createContainerScrim();
        let dynamicComponentRef = this.createComponent(component);

        flexboxContainer.appendChild(dynamicComponentRef.location.nativeElement);
        this.document.body.appendChild(containerScrim);
        this.document.body.appendChild(flexboxContainer);

        return dynamicComponentRef;
    }

    public destroyAndRemoveFromDom(componentRef: ComponentRef<{}>)
    {
        let container = this.document.getElementById("aom-flexbox-container");
        let containerScrim = this.document.getElementById("aom-flexbox-container-scrim");

        container.parentNode.removeChild(container);
        containerScrim.parentNode.removeChild(containerScrim);
        
        this.appRef.detachView(componentRef.hostView);
        this.scrimClickSubject.complete();

        componentRef.destroy();
    }

    public onScrimClicked(): Observable<any>
    {
        return this.scrimClickSubject.asObservable();
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

    private createContainerScrim()
    {
        let scrimElement = this.document.createElement("div");
        scrimElement.setAttribute("id", "aom-flexbox-container-scrim");
        scrimElement.classList.add("flex-container-scrim");
        scrimElement.addEventListener("click", () => { 
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
            
        }, false);
        
        return scrimElement;
    }

    private createComponent(component: any): any
    {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        let newComponentRef = componentFactory.create(this.injector);

        this.appRef.attachView(newComponentRef.hostView);

        return newComponentRef;
    }

    private emitScrimClickedEvent()
    {
        this.scrimClickSubject.next();
    }
}