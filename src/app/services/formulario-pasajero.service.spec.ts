import { TestBed } from '@angular/core/testing';

import { FormularioPasajeroService } from './formulario-pasajero.service';

describe('FormularioPasajeroService', () => {
  let service: FormularioPasajeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioPasajeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
