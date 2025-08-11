import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCompras } from './eliminar-compras';

describe('EliminarCompras', () => {
  let component: EliminarCompras;
  let fixture: ComponentFixture<EliminarCompras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarCompras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarCompras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
