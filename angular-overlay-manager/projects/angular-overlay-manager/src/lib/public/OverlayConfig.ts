import { Location } from "./enums/Location";
import { Animation } from "./enums/Animation";
import { AnimationStartPoint } from "./enums/AnimationStartPoint";
import { AnimationProperty } from "./enums/AnimationProperty";
import { OverlayType } from "./enums/OverlayType";

export interface OverlayConfig{
    location: Location,
    animation: Animation,
    animationStartPoint: AnimationStartPoint
    type: OverlayType
}