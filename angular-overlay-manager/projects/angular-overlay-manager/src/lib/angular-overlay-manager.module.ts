/*
    This file is part of Angular Overlay Manager which is released under the BSD 3-Clause License.
    You should have received a copy of this license in LICENSE.txt along with this file. 
    
    In the event that you did not receive a copy of the license see https://opensource.org/licenses/BSD-3-Clause
    for the full license details.
*/

import { NgModule } from '@angular/core';

import { ElementManager } from './internal/ElementManager';
import { AnimationManager } from './internal/AnimationManager';
import { OverlayHostDirective } from './internal/overlay-host.directive';
import { OverlayContainerComponent } from './internal/overlay-container/overlay-container.component';
import { OverlayManager } from './internal/OverlayManager';
import { appConfigProvider } from './internal/dependency-injection/app-config-provider';
import { OverlayDataAdapter } from './internal/dependency-injection/overlay-data-provider';

@NgModule({
  imports: [
  ],
  declarations: [OverlayHostDirective, OverlayContainerComponent],
  exports: [],
  providers: [
    OverlayManager,
    ElementManager, 
    AnimationManager,
    appConfigProvider,
    OverlayDataAdapter
  ],
  entryComponents: [OverlayContainerComponent]
})
export class AngularOverlayManagerModule { }
