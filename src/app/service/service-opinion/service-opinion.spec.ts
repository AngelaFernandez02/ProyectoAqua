import { TestBed } from '@angular/core/testing';

import { ServiceOpinion } from './service-opinion';

describe('ServiceOpinion', () => {
  let service: ServiceOpinion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceOpinion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
