import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMateriaprima } from './editar-materiaprima';

describe('EditarMateriaprima', () => {
  let component: EditarMateriaprima;
  let fixture: ComponentFixture<EditarMateriaprima>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMateriaprima]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarMateriaprima);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
