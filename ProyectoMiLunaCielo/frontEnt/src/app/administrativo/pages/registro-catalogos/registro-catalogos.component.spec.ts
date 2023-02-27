import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCatalogosComponent } from './registro-catalogos.component';

describe('RegistroCatalogosComponent', () => {
  let component: RegistroCatalogosComponent;
  let fixture: ComponentFixture<RegistroCatalogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroCatalogosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCatalogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
