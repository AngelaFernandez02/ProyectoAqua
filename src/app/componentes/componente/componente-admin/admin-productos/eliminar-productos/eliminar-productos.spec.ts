import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarProductos } from './eliminar-productos';

describe('EliminarProductos', () => {
  let component: EliminarProductos;
  let fixture: ComponentFixture<EliminarProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
