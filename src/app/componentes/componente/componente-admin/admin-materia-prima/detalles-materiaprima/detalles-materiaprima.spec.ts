import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesMateriaprima } from './detalles-materiaprima';

describe('DetallesMateriaprima', () => {
  let component: DetallesMateriaprima;
  let fixture: ComponentFixture<DetallesMateriaprima>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesMateriaprima]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesMateriaprima);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
