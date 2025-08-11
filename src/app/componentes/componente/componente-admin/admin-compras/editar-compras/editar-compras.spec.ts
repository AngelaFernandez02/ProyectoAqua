import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCompras } from './editar-compras';

describe('EditarCompras', () => {
  let component: EditarCompras;
  let fixture: ComponentFixture<EditarCompras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarCompras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCompras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
