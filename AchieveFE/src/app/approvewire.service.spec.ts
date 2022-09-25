import { TestBed } from '@angular/core/testing';

import { ApprovewireService } from './approvewire.service';

describe('ApprovewireService', () => {
  let service: ApprovewireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovewireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
