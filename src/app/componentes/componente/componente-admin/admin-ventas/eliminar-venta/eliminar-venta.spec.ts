import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarVenta } from './eliminar-venta';

describe('EliminarVenta', () => {
  let component: EliminarVenta;
  let fixture: ComponentFixture<EliminarVenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarVenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarVenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
