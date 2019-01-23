/*
    This file is part of Angular Overlay Manager which is released under the BSD 3-Clause License.
    You should have received a copy of this license in LICENSE.txt along with this file. 
    
    In the event that you did not receive a copy of the license see https://opensource.org/licenses/BSD-3-Clause
    for the full license details.
*/

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