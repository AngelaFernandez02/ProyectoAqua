import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoCompras } from './catalogo-compras';

describe('CatalogoCompras', () => {
  let component: CatalogoCompras;
  let fixture: ComponentFixture<CatalogoCompras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoCompras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoCompras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
