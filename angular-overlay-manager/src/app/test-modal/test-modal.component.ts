import { Component, OnInit } from '@angular/core';
import { AngularOverlayManagerService } from 'angular-overlay-manager';

@Component({
  selector: 'app-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss']
})
export class TestModalComponent implements OnInit {

  constructor(private overlayService: AngularOverlayManagerService) { }

  ngOnInit() {
  }

  close() {
    this.overlayService.close();
  }
}
