import { TestBed } from '@angular/core/testing';

import { PopularSeriesService } from './popular-series.service';

describe('PopularSeriesService', () => {
  let service: PopularSeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopularSeriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
