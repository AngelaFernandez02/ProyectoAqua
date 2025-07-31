import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasCliente } from './compras-cliente';

describe('ComprasCliente', () => {
  let component: ComprasCliente;
  let fixture: ComponentFixture<ComprasCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComprasCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprasCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
