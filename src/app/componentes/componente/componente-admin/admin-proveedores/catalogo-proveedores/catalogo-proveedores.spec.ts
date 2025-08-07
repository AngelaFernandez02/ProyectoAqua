import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoProveedores } from './catalogo-proveedores';

describe('CatalogoProveedores', () => {
  let component: CatalogoProveedores;
  let fixture: ComponentFixture<CatalogoProveedores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoProveedores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoProveedores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
