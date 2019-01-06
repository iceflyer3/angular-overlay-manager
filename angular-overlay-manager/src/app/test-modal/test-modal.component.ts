import { Component, OnInit, Inject } from '@angular/core';
import { AngularOverlayManagerService, OVERLAY_DATA } from 'angular-overlay-manager';

@Component({
  selector: 'app-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss']
})
export class TestModalComponent implements OnInit {

  constructor(private overlayService: AngularOverlayManagerService, @Inject(OVERLAY_DATA) private data: any)  { 
    
  }

  ngOnInit() {
  }

  close() {
    console.log(this.data);
    this.overlayService.close();
  }
}
