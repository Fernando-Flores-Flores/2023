import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroInventariosComponent } from './registro-inventarios.component';

describe('RegistroInventariosComponent', () => {
  let component: RegistroInventariosComponent;
  let fixture: ComponentFixture<RegistroInventariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroInventariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroInventariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
