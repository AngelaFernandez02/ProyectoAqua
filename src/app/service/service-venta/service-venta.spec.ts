import { TestBed } from '@angular/core/testing';
import { ServiceVenta } from './service-venta';


describe('ServiceVenta', () => {
  let service: ServiceVenta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceVenta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
