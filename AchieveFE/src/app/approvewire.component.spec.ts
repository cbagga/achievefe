import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovewireComponent } from './approvewire.component';

describe('ApprovewireComponent', () => {
  let component: ApprovewireComponent;
  let fixture: ComponentFixture<ApprovewireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovewireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovewireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
