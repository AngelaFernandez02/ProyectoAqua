import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoProductosCliente } from './catalogo-productos-cliente';

describe('CatalogoProductosCliente', () => {
  let component: CatalogoProductosCliente;
  let fixture: ComponentFixture<CatalogoProductosCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoProductosCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoProductosCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
