import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogoVenta } from './catalogo-venta';



describe('CatalogoVenta', () => {
  let component: CatalogoVenta;
  let fixture: ComponentFixture<CatalogoVenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoVenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoVenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
