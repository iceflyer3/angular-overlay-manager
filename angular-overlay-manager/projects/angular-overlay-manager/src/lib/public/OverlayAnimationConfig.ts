/*
    This file is part of Angular Overlay Manager which is released under the BSD 3-Clause License.
    You should have received a copy of this license in LICENSE.txt along with this file. 
    
    In the event that you did not receive a copy of the license see https://opensource.org/licenses/BSD-3-Clause
    for the full license details.
*/

import { OverlayLocation } from "./enums/OverlayLocation";
import { OverlayAnimation } from "./enums/OverlayAnimation";
import { OverlayAnimationStartPoint } from "./enums/OverlayAnimationStartPoint";
import { OverlayType } from "./enums/OverlayType";

export interface OverlayAnimationConfig{
    location: OverlayLocation,
    animation: OverlayAnimation,
    animationStartPoint: OverlayAnimationStartPoint
    type: OverlayType
}