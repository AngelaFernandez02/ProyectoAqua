import { TestBed } from '@angular/core/testing';
import { ServiceContacto } from './service-contacto';



describe('ServiceContacto', () => {
  let service: ServiceContacto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceContacto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
