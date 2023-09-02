import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioPasajeroComponent } from './formulario-pasajero/formulario-pasajero.component';
import { FormularioVueloComponent } from './formulario-vuelo/formulario-vuelo.component';
import { FormularioVueloV2Component } from './formulario-vuelo-v2/formulario-vuelo-v2.component';
import { AppRoutingModule } from '../app-routing.module';

//Material UI
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AeropuertoService } from '../services/aeropuerto.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    FormularioPasajeroComponent,
    FormularioVueloComponent,
    FormularioVueloV2Component,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    FontAwesomeModule,
  ],
  exports: [
    FormularioPasajeroComponent,
    FormularioVueloComponent,
    FormularioVueloV2Component,
  ],
  providers: [
    AeropuertoService,
    FormularioPasajeroComponent,
    FormularioVueloComponent,
    FormularioVueloV2Component,
  ],
})
export class FormulariosModule {}
