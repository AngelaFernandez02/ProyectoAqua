import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProveedores } from './agregar-proveedores';

describe('AgregarProveedores', () => {
  let component: AgregarProveedores;
  let fixture: ComponentFixture<AgregarProveedores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarProveedores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarProveedores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
