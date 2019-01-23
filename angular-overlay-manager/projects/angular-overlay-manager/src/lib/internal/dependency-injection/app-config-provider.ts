/*
    This file is part of Angular Overlay Manager which is released under the BSD 3-Clause License.
    You should have received a copy of this license in LICENSE.txt along with this file. 
    
    In the event that you did not receive a copy of the license see https://opensource.org/licenses/BSD-3-Clause
    for the full license details.
*/

// Any unused imports here are required by the compiler. 
// If they are removed and you attempt to build you will receive compiler errors.
import { InjectionToken } from "@angular/core";

import { IAppConfig } from "../app-config/IAppConfig";
import { AppConfig } from "../app-config/AppConfig";
import { APP_CONFIG } from "./internal-di-tokens";

export let appConfigProvider = { provide: APP_CONFIG, useValue: AppConfig }