import { TestBed } from '@angular/core/testing';

import { OutwireService } from './outwire.service';

describe('OutwireService', () => {
  let service: OutwireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutwireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
