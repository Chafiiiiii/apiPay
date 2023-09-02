import { Injectable } from '@angular/core';
import { API_URL } from './../env';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Aeropuerto } from '../shared/models/aeropuerto.model';

@Injectable({
  providedIn: 'root'
})
export class AeropuertosService {

  constructor(private http : HttpClient) { }

  private static _handleError(err:HttpErrorResponse | any){
    return throwError((err.message || 'Server Error'))

  }
  getAeropuertos(): Observable<Aeropuerto[]> {

    return this.http
      .get<Aeropuerto[]>(`${API_URL}/aeropuertos`)
      .pipe(catchError(AeropuertosService._handleError))

  }
}
