import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularOverlayManagerModule } from 'angular-overlay-manager';

import { AppComponent } from './app.component';
import { TestModalComponent } from './test-modal/test-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TestModalComponent
  ],
  imports: [
    BrowserModule,
    AngularOverlayManagerModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TestModalComponent]
})
export class AppModule { }
