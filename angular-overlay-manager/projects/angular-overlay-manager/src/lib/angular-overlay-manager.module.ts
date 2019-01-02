import { NgModule } from '@angular/core';
import { ElementManager } from './internal/ElementManager';
import { AnimationManager } from './internal/AnimationManager';
import { APP_CONFIG } from './internal/app-config/ConfigDiToken';
import { AppConfig } from './internal/app-config/AppConfig';

@NgModule({
  imports: [
  ],
  declarations: [],
  exports: [],
  providers: [
    ElementManager, 
    AnimationManager,
    {provide: APP_CONFIG, useValue: AppConfig}
  ]
})
export class AngularOverlayManagerModule { }
