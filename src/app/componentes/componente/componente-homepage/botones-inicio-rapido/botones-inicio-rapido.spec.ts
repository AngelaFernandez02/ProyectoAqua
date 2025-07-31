import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesInicioRapido } from './botones-inicio-rapido';

describe('BotonesInicioRapido', () => {
  let component: BotonesInicioRapido;
  let fixture: ComponentFixture<BotonesInicioRapido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonesInicioRapido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonesInicioRapido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
