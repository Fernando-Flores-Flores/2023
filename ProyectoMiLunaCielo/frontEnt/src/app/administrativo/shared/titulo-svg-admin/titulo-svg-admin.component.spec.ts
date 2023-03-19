import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloSvgAdminComponent } from './titulo-svg-admin.component';

describe('TituloSvgAdminComponent', () => {
  let component: TituloSvgAdminComponent;
  let fixture: ComponentFixture<TituloSvgAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TituloSvgAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TituloSvgAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
