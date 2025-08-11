import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVenta } from './editar-venta';

describe('EditarVenta', () => {
  let component: EditarVenta;
  let fixture: ComponentFixture<EditarVenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarVenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarVenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
