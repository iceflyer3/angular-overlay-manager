import { Observable } from "rxjs";
import { OverlayManager } from "../internal/OverlayManager";

export class AomOverlayRef{
    constructor(private overlayManager: OverlayManager) {}

    public onClose(): Observable<any>
    {
        // Just bubble the event from the overlay manager up one more level
        return this.overlayManager.onClose();
    }
}