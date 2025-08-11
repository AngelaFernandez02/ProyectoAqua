import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCotizacionPersonalizada } from './detalle-cotizacion-personalizada';

describe('DetalleCotizacionPersonalizada', () => {
  let component: DetalleCotizacionPersonalizada;
  let fixture: ComponentFixture<DetalleCotizacionPersonalizada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleCotizacionPersonalizada]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCotizacionPersonalizada);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
