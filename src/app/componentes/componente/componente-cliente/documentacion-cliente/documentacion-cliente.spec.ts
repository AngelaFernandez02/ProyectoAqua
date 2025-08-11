import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacionCliente } from './documentacion-cliente';

describe('DocumentacionCliente', () => {
  let component: DocumentacionCliente;
  let fixture: ComponentFixture<DocumentacionCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentacionCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentacionCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
