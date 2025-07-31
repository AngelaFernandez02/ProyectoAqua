import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteActualizar } from './cliente-actualizar';

describe('ClienteActualizar', () => {
  let component: ClienteActualizar;
  let fixture: ComponentFixture<ClienteActualizar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteActualizar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteActualizar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
