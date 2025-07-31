import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioUsuarioAdmin } from './formulario-usuario-admin';

describe('FormularioUsuarioAdmin', () => {
  let component: FormularioUsuarioAdmin;
  let fixture: ComponentFixture<FormularioUsuarioAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioUsuarioAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioUsuarioAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
