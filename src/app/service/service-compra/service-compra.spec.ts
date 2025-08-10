import { TestBed } from '@angular/core/testing';

import { ServiceCompra } from './service-compra';

describe('ServiceCompra', () => {
  let service: ServiceCompra;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCompra);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
