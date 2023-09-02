// Importar los módulos necesarios
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Aeropuerto } from 'src/app/shared/models/aeropuerto.model';
import { AeropuertoService } from '../../services/aeropuerto.service';

interface pasajeroCantidad {
  cantAdulto: number,
  cantNino: number,
  cantInfante: number,
}

interface vueloBusqueda {
  origen: string,
  destino: string,
  fechaVuelo: Date,
  pasajero: pasajeroCantidad,
  totalPasajeros: number,
}

// Definir un array de opciones de aeropuertos
let nombreAeropuertos: string[] = [];


@Component({
  selector: 'app-formulario-vuelo',
  templateUrl: './formulario-vuelo.component.html',
  styleUrls: ['./formulario-vuelo.component.scss'],
  providers:[AeropuertoService]
})
export class FormularioVueloComponent {

  airport: []
 // Crear un FormGroup para el formulario reactivo
 formulario!: FormGroup
 // Crear un Observable para el autocomplete de aeropuerto
 opcionesFiltradas!: Observable<string[]>;
 aeropuertoListaSubs: Subscription;
 nombreAeropuerto: any[];
 nombreAeropuertoLista: Aeropuerto[]


 constructor(private fb: FormBuilder,
             private router: Router,
             private aeropuertoService: AeropuertoService
  //private studentService: StudentService
  ) { }
 ngOnInit(): void {
   // Inicializar el FormGroup con los controles y validadores correspondientes
   this.formulario = this.fb.group({
     origen: ['', Validators.required],
     destino: ['', Validators.required],
     fechaVuelo: ['', Validators.required],
     adulto: ['', Validators.required],
     nino: ['', Validators.required],
     infante: ['', Validators.required],
   });
   console.log("INIT");
   this.aeropuertoListaSubs = this.aeropuertoService
  .GetNombresAeropuertos()
  .subscribe(res => {
    this.nombreAeropuerto = res.Aeropuertos;
    console.log(this.nombreAeropuerto);
    const str = JSON.stringify(res);
    for(let i=0;i<this.nombreAeropuerto.length;i++){
      nombreAeropuertos.push(this.nombreAeropuerto[i]);
    }
    // JSON.parse(str, (key, value) => {
    //   console.log(key);
    // if (key === 'Ciudad') {
    //   nombreAeropuertos.push(value);
    // }});
    console.log(nombreAeropuertos)
   },
   console.error
   );
   // Filtrar las opciones de aeropuerto según el valor ingresado por el usuario
   this.opcionesFiltradas = this.formulario.get('origen')!.valueChanges.pipe(
     startWith(''),
     map(value => this.filtrarOpciones(value))
   );
   this.opcionesFiltradas = this.formulario.get('destino')!.valueChanges.pipe(
    startWith(''),
    map(value => this.filtrarOpciones(value))
  );
 }

 // Función para filtrar las opciones de aeropuerto
 filtrarOpciones(value: string): string[] {
   const filtro = value.toLowerCase();
   return nombreAeropuertos.filter(opcion => opcion.toLowerCase().includes(filtro));
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
   this.setValor('fechaVuelo', evento.value);
 }


 // Función para enviar el formulario de busqueda de vuelo y crear un objeto Vuelo
 enviarFormulario() {
    if (this.formulario.valid) {
     // Crear un objeto vueloBusqueda con los valores del formulario
     const vuelo: vueloBusqueda = {
       origen: this.getValor('origen'),
       destino: this.getValor('destino'),
       fechaVuelo: this.getValor('fechaVuelo'),
       pasajero: {
                  cantAdulto: this.getValor('adulto'),
                  cantNino: this.getValor('nino'),
                  cantInfante: this.getValor('infante')
                 },
       totalPasajeros: this.getValor('adulto') + this.getValor('nino') + this.getValor('infante'),
     };
     this.router.navigate(['/vuelos',vuelo]);
     // Mostrar el objeto Pasajero en la consola
     console.log(vuelo);
   } else {
     // Mostrar un mensaje de error si el formulario no es válido
  alert('Por favor, complete todos los campos del formulario');

   }
  }

}
