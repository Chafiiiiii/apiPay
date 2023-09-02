import { ComponentFixture, TestBed } from '@angular/core/testing';

import FormularioVueloComponent from './formulario-vuelo.component';

describe('FormularioVueloComponent', () => {
  let component: FormularioVueloComponent;
  let fixture: ComponentFixture<FormularioVueloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioVueloComponent]
    });
    fixture = TestBed.createComponent(FormularioVueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
