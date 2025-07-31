import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCompras } from './formulario-compras';

describe('FormularioCompras', () => {
  let component: FormularioCompras;
  let fixture: ComponentFixture<FormularioCompras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCompras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCompras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
