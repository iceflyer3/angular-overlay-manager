/*
    This file is part of Angular Overlay Manager which is released under the BSD 3-Clause License.
    You should have received a copy of this license in LICENSE.txt along with this file. 
    
    In the event that you did not receive a copy of the license see https://opensource.org/licenses/BSD-3-Clause
    for the full license details.
*/

import { IAppConfig } from "./IAppConfig";

export const AppConfig: IAppConfig = {
    // This should be kept the same as the transition timing declared in the 
    // css so that elements may be removed from the DOM in a timely fashion
    AnimationTimeInMs: 800 
}