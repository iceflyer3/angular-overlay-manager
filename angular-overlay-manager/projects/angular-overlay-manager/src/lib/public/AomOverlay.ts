/*
    This file is part of Angular Overlay Manager which is released under the MIT License.
    You should have received a copy of this license in LICENSE.txt along with this file. 
    
    In the event that you did not receive a copy of the license see https://opensource.org/licenses/MIT 
    for the full license details.
*/

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