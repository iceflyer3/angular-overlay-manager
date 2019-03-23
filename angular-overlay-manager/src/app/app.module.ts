/*
    This file is part of Angular Overlay Manager Demo Application which is released under the BSD 3-Clause License.
    You should have received a copy of this license in LICENSE.txt along with this file. 
    
    In the event that you did not receive a copy of the license see https://opensource.org/licenses/BSD-3-Clause
    for the full license details.
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularOverlayManagerModule } from 'angular-overlay-manager';

import { AppComponent } from './app.component';
import { TestOverlayComponent } from './test-overlay/test-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    TestOverlayComponent
  ],
  imports: [
    BrowserModule,
    AngularOverlayManagerModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TestOverlayComponent]
})
export class AppModule { }
