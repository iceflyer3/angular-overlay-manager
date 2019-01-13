/*
    This file is part of Angular Overlay Manager which is released under the MIT License.
    You should have received a copy of this license in LICENSE.txt along with this file. 
    
    In the event that you did not receive a copy of the license see https://opensource.org/licenses/MIT 
    for the full license details.
*/

import { Location } from "./enums/Location";
import { Animation } from "./enums/Animation";
import { AnimationStartPoint } from "./enums/AnimationStartPoint";
import { OverlayType } from "./enums/OverlayType";

export interface OverlayAnimationConfig{
    location: Location,
    animation: Animation,
    animationStartPoint: AnimationStartPoint
    type: OverlayType
}