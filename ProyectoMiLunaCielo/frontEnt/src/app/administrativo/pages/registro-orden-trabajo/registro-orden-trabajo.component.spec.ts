import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroOrdenTrabajoComponent } from './registro-orden-trabajo.component';

describe('RegistroOrdenTrabajoComponent', () => {
  let component: RegistroOrdenTrabajoComponent;
  let fixture: ComponentFixture<RegistroOrdenTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroOrdenTrabajoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroOrdenTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
