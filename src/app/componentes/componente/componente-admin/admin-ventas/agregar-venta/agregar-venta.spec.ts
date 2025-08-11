import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarVenta } from './agregar-venta';

describe('AgregarVenta', () => {
  let component: AgregarVenta;
  let fixture: ComponentFixture<AgregarVenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarVenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarVenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
