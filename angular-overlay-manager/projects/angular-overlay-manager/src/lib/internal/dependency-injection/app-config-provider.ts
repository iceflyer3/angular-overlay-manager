// Any unused imports here are required by the compiler. 
// If they are removed and you attempt to build you will receive compiler errors.
import { InjectionToken } from "@angular/core";

import { IAppConfig } from "../app-config/IAppConfig";
import { AppConfig } from "../app-config/AppConfig";
import { APP_CONFIG } from "./internal-di-tokens";

export let appConfigProvider = { provide: APP_CONFIG, useValue: AppConfig }