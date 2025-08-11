import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCompras } from './search-compras';

describe('SearchCompras', () => {
  let component: SearchCompras;
  let fixture: ComponentFixture<SearchCompras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCompras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCompras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
