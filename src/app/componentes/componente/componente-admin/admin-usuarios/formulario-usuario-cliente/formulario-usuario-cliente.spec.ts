import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioUsuarioCliente } from './formulario-usuario-cliente';

describe('FormularioUsuarioCliente', () => {
  let component: FormularioUsuarioCliente;
  let fixture: ComponentFixture<FormularioUsuarioCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioUsuarioCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioUsuarioCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
