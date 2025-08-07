import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProveedores } from './search-proveedores';

describe('SearchProveedores', () => {
  let component: SearchProveedores;
  let fixture: ComponentFixture<SearchProveedores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchProveedores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchProveedores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
