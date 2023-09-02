import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VuelosService } from '../services/vuelos.service';
import {SeatsioAngularModule} from '@seatsio/seatsio-angular'
import { SeatsioClient, Region } from 'seatsio';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Pasajeroinfo } from '../shared/models/pasajero.model';

@Component({
  selector: 'app-asientos',
  templateUrl: './asientos.component.html',
  styleUrls: ['./asientos.component.scss'],
})
export class AsientosComponent {
  vuelo_id:any;
  clase:any;
  asiento:any;
  config:any;
  pasajeros:any;
  category:number;
  informacionPasajeros:any;
  pasajeross:Pasajeroinfo[]
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private cookieService:CookieService
  ){
    // console.log("hey");
    // this.reservarAsientos();
    this.route.params.subscribe(params=>{
      let info=params['info'];
      this.vuelo_id=info.split('-')[0];
      this.clase=info.split('-')[1];
      this.asiento=info.split('-')[2];
      this.cookieService.set('vuelo_id',this.vuelo_id)
      this.cookieService.set('clase',this.clase);
      this.cookieService.set('asiento',this.asiento);
    });
      this.pasajeros = JSON.parse(this.cookieService.get('pasajeros')) 
      this.informacionPasajeros={adultos_mayores:new Array(),adultos:new Array(),ninos:new Array(),infantes:new Array()}
      let pasajero={
        nombre: "",
        apellido: "",
        nacionalidad: "",
        pasaporte: "",
        fechaNacimiento: null
      };
      for(let i=0;i<this.pasajeros.adultos_mayores;i++){
        this.informacionPasajeros.adultos_mayores.push(pasajero);
      }
      for(let i=0;i<this.pasajeros.adultos;i++){
        this.informacionPasajeros.adultos.push(pasajero);
      }
      for(let i=0;i<this.pasajeros.ninos;i++){
        this.informacionPasajeros.ninos.push(pasajero);
      }
      for(let i=0;i<this.pasajeros.infantes;i++){
        this.informacionPasajeros.infantes.push(pasajero);
      }

      let ticketTypesMap = [
        { ticketType:'Adulto Mayor', price: this.asiento*0.5},
        { ticketType:'Adulto', price: this.asiento},
        { ticketType:'Niño', price: this.asiento},
        { ticketType:'Infante', price: 0}
      ];
      let maxSelectedObjectsMap = [
        { category: this.clase.toUpperCase(), ticketTypes:[
          {ticketType:'Adulto Mayor', quantity: this.pasajeros.adultos_mayores},
          {ticketType:'Adulto', quantity: this.pasajeros.adultos},
          {ticketType:'Niño', quantity: this.pasajeros.ninos},
          {ticketType:'Infante', quantity: this.pasajeros.infantes}
        ]}        
      ]
      this.config = {
      region: 'sa', // e.g. "eu"
      workspaceKey: '26b63090-3ae6-4517-ac96-f899acb49252',
      event: this.vuelo_id,
      session: 'continue',
      language: 'es',
      categoryFilter: { enabled: true, zoomOnSelect: true },
      pricing: [
        {
          category: 1,
          ticketTypes: ticketTypesMap
        },
        {
          category: 2,
          ticketTypes: ticketTypesMap
        },
      ],
      maxSelectedObjects: maxSelectedObjectsMap,
      priceFormatter: (price: number) => '$' + price,
      selectedObjectsInputName: 'selectedSeatsField',
      // isObjectVisible: function(object:any, extraConfig:any) {
      //   catafter=extraConfig;
      //   if(object.category.label === 'VIP') {
      //       return true;
      //   }
      //   return false;
      // }
    };
  }
  
  reservarAsientos(form:any){
    console.log(document.getElementsByName('selectedSeatsField')[0].getAttribute('value'));
    console.log(this.informacionPasajeros);
  }
  parseClases(clase:string){
    if(clase=='vip') return 1;
    else return 2;
  }
  imprimirPasajeros(){
    console.log(this.informacionPasajeros);
  }
}
