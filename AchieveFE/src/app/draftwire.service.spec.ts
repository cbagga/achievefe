import { TestBed } from '@angular/core/testing';

import { DraftWireService } from './draftwire.service';

describe('DraftwireService', () => {
  let service: DraftWireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DraftWireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
})