import { TestBed } from '@angular/core/testing';

import { FormularioVueloService } from './formulario-vuelo.service';

describe('FormularioVueloService', () => {
  let service: FormularioVueloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioVueloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
