import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarProveedores } from './eliminar-proveedores';

describe('EliminarProveedores', () => {
  let component: EliminarProveedores;
  let fixture: ComponentFixture<EliminarProveedores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarProveedores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarProveedores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
