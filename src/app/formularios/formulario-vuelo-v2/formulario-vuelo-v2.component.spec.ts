import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioVueloV2Component } from './formulario-vuelo-v2.component';

describe('FormularioVueloV2Component', () => {
  let component: FormularioVueloV2Component;
  let fixture: ComponentFixture<FormularioVueloV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioVueloV2Component]
    });
    fixture = TestBed.createComponent(FormularioVueloV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
