// Importar los módulos necesarios
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// Definir la interfaz Pasajero
interface Pasajero {
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  nacionalidad: string;
  pasaporte: string;
}

// Definir un array de opciones de nacionalidad
const NACIONALIDADES: string[] = [
  'Ecuador',
  'Colombia',
  'Perú',
  'Argentina',
  'Chile',
  'Brasil',
  'España',
  'Francia',
  'Italia',
  'Alemania',
];

@Component({
  selector: 'app-formulario-pasajero',
  templateUrl: './formulario-pasajero.component.html',
  styleUrls: ['./formulario-pasajero.component.scss'],
})
export class FormularioPasajeroComponent {
  // Crear un FormGroup para el formulario reactivo
  formulario!: FormGroup;
  public adultosF: any[];
  public ninosF: any[];
  public infantesF: any[];
  // Crear un Observable para el autocomplete de nacionalidad
  opcionesFiltradas!: Observable<string[]>;

  constructor(private fb: FormBuilder) {
    this.adultosF = [];
    this.ninosF = [];
    this.infantesF = [];
    this.getSession();
  }

  ngOnInit(): void {
    // Inicializar el FormGroup con los controles y validadores correspondientes

    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      pasaporte: ['', Validators.required],
    });

    // Filtrar las opciones de nacionalidad según el valor ingresado por el usuario
    this.opcionesFiltradas = this.formulario
      .get('nacionalidad')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this.filtrarOpciones(value))
      );
  }

  // Función para filtrar las opciones de nacionalidad
  filtrarOpciones(value: string): string[] {
    const filtro = value.toLowerCase();
    return NACIONALIDADES.filter((opcion) =>
      opcion.toLowerCase().includes(filtro)
    );
  }

  // Función para obtener el valor de un control del formulario
  getValor(control: string) {
    return this.formulario.get(control)!.value;
  }

  // Función para asignar el valor de un control del formulario
  setValor(control: string, valor: any) {
    this.formulario.get(control)!.setValue(valor);
  }

  // Función para manejar el evento de cambio de fecha
  cambiarFecha(evento: MatDatepickerInputEvent<Date>) {
    this.setValor('fechaNacimiento', evento.value);
  }

  // Función para enviar el formulario y crear un objeto Pasajero
  enviarFormulario() {
    if (this.formulario.valid) {
      // Crear un objeto Pasajero con los valores del formulario
      const pasajero: Pasajero = {
        nombre: this.getValor('nombre'),
        apellido: this.getValor('apellido'),
        fechaNacimiento: this.getValor('fechaNacimiento'),
        nacionalidad: this.getValor('nacionalidad'),
        pasaporte: this.getValor('pasaporte'),
      };
      // Mostrar el objeto Pasajero en la consola
      console.log(pasajero);
    } else {
      // Mostrar un mensaje de error si el formulario no es válido
      alert('Por favor, complete todos los campos del formulario');
    }
  }
  getSession() {
    let adultos = Number(sessionStorage.getItem('adultos'));
    let ninos = Number(sessionStorage.getItem('ninos'));
    let infantes = Number(sessionStorage.getItem('infantes'));
    for (let i = 0; i < adultos; i++) {
      this.adultosF.push({ code: 1 });
    }
    for (let i = 0; i < ninos; i++) {
      this.ninosF.push({ code: 2 });
    }
    for (let i = 0; i < infantes; i++) {
      this.infantesF.push({ code: 3 });
    }
  }
}
