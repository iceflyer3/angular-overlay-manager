// Even though this import isn't used here it is still required by the compiler.
// If it is removed and you attempt to build you will receive compiler errors.
import { InjectionToken } from "@angular/core";


import { OVERLAY_DATA } from "../../public/dependency-injection/public-di-tokens";

export class OverlayDataAdapter{
    private data: any;

    public setOverlayData(data: any)
    {
        this.data = data;
    }

    public getOverlayData(): any
    {
        return this.data;
    }
}

let overlayDataFactory = (overlayDataManager: OverlayDataAdapter) => {
    console.log('overlayDataFactory is called!');
    return overlayDataManager.getOverlayData();
}

export let overlayDataProvider = {
    provide: OVERLAY_DATA,
    useFactory: overlayDataFactory,
    deps: [OverlayDataAdapter]
};
