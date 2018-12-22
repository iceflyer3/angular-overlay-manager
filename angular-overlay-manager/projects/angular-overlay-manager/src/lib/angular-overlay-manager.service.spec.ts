import { TestBed, inject } from '@angular/core/testing';

import { AngularOverlayManagerService } from './angular-overlay-manager.service';

describe('AngularOverlayManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularOverlayManagerService]
    });
  });

  it('should be created', inject([AngularOverlayManagerService], (service: AngularOverlayManagerService) => {
    expect(service).toBeTruthy();
  }));
});
