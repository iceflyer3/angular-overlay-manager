import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularOverlayManagerComponent } from './angular-overlay-manager.component';

describe('AngularOverlayManagerComponent', () => {
  let component: AngularOverlayManagerComponent;
  let fixture: ComponentFixture<AngularOverlayManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularOverlayManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularOverlayManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
