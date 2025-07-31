import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteUsuarioss } from './reporte-usuarioss';

describe('ReporteUsuarioss', () => {
  let component: ReporteUsuarioss;
  let fixture: ComponentFixture<ReporteUsuarioss>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteUsuarioss]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteUsuarioss);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
