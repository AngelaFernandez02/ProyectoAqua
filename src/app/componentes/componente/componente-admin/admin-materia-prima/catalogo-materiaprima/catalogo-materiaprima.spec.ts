import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoMateriaprima } from './catalogo-materiaprima';

describe('CatalogoMateriaprima', () => {
  let component: CatalogoMateriaprima;
  let fixture: ComponentFixture<CatalogoMateriaprima>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoMateriaprima]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoMateriaprima);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
