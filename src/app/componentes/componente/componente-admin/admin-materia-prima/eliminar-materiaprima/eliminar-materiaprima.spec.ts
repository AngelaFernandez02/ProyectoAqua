import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarMateriaprima } from './eliminar-materiaprima';

describe('EliminarMateriaprima', () => {
  let component: EliminarMateriaprima;
  let fixture: ComponentFixture<EliminarMateriaprima>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarMateriaprima]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarMateriaprima);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
