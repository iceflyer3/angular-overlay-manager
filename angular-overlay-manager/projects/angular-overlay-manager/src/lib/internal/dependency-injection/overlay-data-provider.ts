// Even though this import isn't used here it is still required by the compiler.
// If it is removed and you attempt to build you will receive compiler errors.
import { InjectionToken } from "@angular/core";

import { OverlayManager } from "../OverlayManager";
import { OVERLAY_DATA } from "../../public/dependency-injection/public-di-tokens";


let overlayDataFactory = (overlayManager: OverlayManager) => {
    return overlayManager.getOverlayData();
}

export let overlayDataProvider = {
    provide: OVERLAY_DATA,
    useFactory: overlayDataFactory,
    deps: [OverlayManager]
};