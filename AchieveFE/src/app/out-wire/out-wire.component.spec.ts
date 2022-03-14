import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutWireComponent } from './out-wire.component';

describe('OutWireComponent', () => {
  let component: OutWireComponent;
  let fixture: ComponentFixture<OutWireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutWireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutWireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
