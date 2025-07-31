import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesProducto } from './imagenes-producto';

describe('ImagenesProducto', () => {
  let component: ImagenesProducto;
  let fixture: ComponentFixture<ImagenesProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagenesProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagenesProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
