import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Imagenespr } from './imagenespr';

describe('Imagenespr', () => {
  let component: Imagenespr;
  let fixture: ComponentFixture<Imagenespr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Imagenespr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Imagenespr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
