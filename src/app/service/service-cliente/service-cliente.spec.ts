import { TestBed } from '@angular/core/testing';
import { ClienteService } from './service-cliente';


describe('ServiceCliente', () => {
  let service: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
