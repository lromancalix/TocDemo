import { TestBed } from '@angular/core/testing';

import { TocTokenService } from './toc-token.service';

describe('TocTokenService', () => {
  let service: TocTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TocTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
