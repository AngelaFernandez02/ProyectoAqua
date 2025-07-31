import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioMateria } from './formulario-materia';

describe('FormularioMateria', () => {
  let component: FormularioMateria;
  let fixture: ComponentFixture<FormularioMateria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioMateria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioMateria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
