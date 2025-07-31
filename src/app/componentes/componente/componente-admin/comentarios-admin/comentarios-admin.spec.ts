import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosAdmin } from './comentarios-admin';

describe('ComentariosAdmin', () => {
  let component: ComentariosAdmin;
  let fixture: ComponentFixture<ComentariosAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentariosAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentariosAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
