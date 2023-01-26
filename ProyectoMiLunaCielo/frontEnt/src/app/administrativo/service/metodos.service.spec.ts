import { TestBed } from '@angular/core/testing';

import { MetodosService } from './metodos.service';

describe('MetodosService', () => {
  let service: MetodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
