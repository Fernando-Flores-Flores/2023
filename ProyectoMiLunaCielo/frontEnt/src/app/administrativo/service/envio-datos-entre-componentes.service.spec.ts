import { TestBed } from '@angular/core/testing';

import { EnvioDatosEntreComponentesService } from './envio-datos-entre-componentes.service';

describe('EnvioDatosEntreComponentesService', () => {
  let service: EnvioDatosEntreComponentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvioDatosEntreComponentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
