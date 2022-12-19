import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMistrabajosComponent } from './listado-mistrabajos.component';

describe('ListadoMistrabajosComponent', () => {
  let component: ListadoMistrabajosComponent;
  let fixture: ComponentFixture<ListadoMistrabajosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoMistrabajosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoMistrabajosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
