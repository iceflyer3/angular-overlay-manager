import { OverlayManager } from "../internal/OverlayManager";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class AomOverlay{
    constructor(private overlayManager: OverlayManager) { }

    public close(data?: any)
    {
        this.overlayManager.closeOverlay(data);
    }

    public cancel()
    {
        this.overlayManager.cancelOverlay();
    }
}