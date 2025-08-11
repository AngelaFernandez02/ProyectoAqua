import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMateriaprima } from './search-materiaprima';

describe('SearchMateriaprima', () => {
  let component: SearchMateriaprima;
  let fixture: ComponentFixture<SearchMateriaprima>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchMateriaprima]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMateriaprima);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
