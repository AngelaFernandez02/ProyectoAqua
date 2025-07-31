import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentesSistema } from './componentes-sistema';

describe('ComponentesSistema', () => {
  let component: ComponentesSistema;
  let fixture: ComponentFixture<ComponentesSistema>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentesSistema]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentesSistema);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
