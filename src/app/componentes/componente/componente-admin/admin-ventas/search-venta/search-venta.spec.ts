import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVenta } from './search-venta';

describe('SearchVenta', () => {
  let component: SearchVenta;
  let fixture: ComponentFixture<SearchVenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchVenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchVenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
