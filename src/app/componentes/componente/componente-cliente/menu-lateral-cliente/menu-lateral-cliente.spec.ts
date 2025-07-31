import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLateralCliente } from './menu-lateral-cliente';

describe('MenuLateralCliente', () => {
  let component: MenuLateralCliente;
  let fixture: ComponentFixture<MenuLateralCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuLateralCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuLateralCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
