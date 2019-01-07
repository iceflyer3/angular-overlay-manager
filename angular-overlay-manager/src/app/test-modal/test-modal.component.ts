import { Component, OnInit, Inject } from '@angular/core';
import { AomOverlay, OVERLAY_DATA } from 'angular-overlay-manager';

@Component({
  selector: 'app-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss']
})
export class TestModalComponent implements OnInit {

  constructor(private overlay: AomOverlay, @Inject(OVERLAY_DATA) private data: any)  { 
    
  }

  ngOnInit() {
  }

  close() {
    console.log(this.data);
    this.overlay.close(this.data);
  }

  cancel(){
    this.overlay.cancel();
  }
}
