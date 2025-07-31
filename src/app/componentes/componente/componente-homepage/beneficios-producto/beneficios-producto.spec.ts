import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiosProducto } from './beneficios-producto';

describe('BeneficiosProducto', () => {
  let component: BeneficiosProducto;
  let fixture: ComponentFixture<BeneficiosProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiosProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiosProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
