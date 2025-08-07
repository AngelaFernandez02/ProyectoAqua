import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProveedores } from './detalle-proveedores';

describe('DetalleProveedores', () => {
  let component: DetalleProveedores;
  let fixture: ComponentFixture<DetalleProveedores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleProveedores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleProveedores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
