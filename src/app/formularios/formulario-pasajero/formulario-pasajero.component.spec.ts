import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPasajeroComponent } from './formulario-pasajero.component';

describe('FormularioPasajeroComponent', () => {
  let component: FormularioPasajeroComponent;
  let fixture: ComponentFixture<FormularioPasajeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioPasajeroComponent]
    });
    fixture = TestBed.createComponent(FormularioPasajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
