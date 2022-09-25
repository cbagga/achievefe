import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftwireComponent } from './draftwire.component';

describe('DraftwireComponent', () => {
  let component: DraftwireComponent;
  let fixture: ComponentFixture<DraftwireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftwireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftwireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
