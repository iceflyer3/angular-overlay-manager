/*
    This file is part of Angular Overlay Manager Demo Application which is released under the BSD 3-Clause License.
    You should have received a copy of this license in LICENSE.txt along with this file. 
    
    In the event that you did not receive a copy of the license see https://opensource.org/licenses/BSD-3-Clause
    for the full license details.
*/

import { Component, OnInit } from '@angular/core';
import { AomOverlay } from 'angular-overlay-manager'

@Component({
  selector: 'app-snackbar-overlay',
  templateUrl: './snackbar-overlay.component.html',
  styleUrls: ['./snackbar-overlay.component.scss']
})
export class SnackbarOverlayComponent implements OnInit {

  constructor(private overlay: AomOverlay) { }

  ngOnInit() {
    window.setTimeout(() => {
      this.overlay.close();
    }, 5000);
  }

}
