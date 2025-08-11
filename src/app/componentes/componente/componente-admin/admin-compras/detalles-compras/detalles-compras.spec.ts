import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCompras } from './detalles-compras';

describe('DetallesCompras', () => {
  let component: DetallesCompras;
  let fixture: ComponentFixture<DetallesCompras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesCompras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesCompras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
