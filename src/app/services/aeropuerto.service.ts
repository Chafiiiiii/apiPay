import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs/operators';
import { catchError, Observable, throwError} from 'rxjs';
import { API_URL } from '../env';
import { Aeropuerto } from '../shared/models/aeropuerto.model';
@Injectable({
  providedIn: 'root'
})
export class AeropuertoService {

  constructor(private http : HttpClient) { }

  private static _handleError(err:HttpErrorResponse | any){
    return throwError((err.message || 'Server Error'))

  }

  // GetDeserealizadoAeropuertos(): Observable<Aeropuerto[]> {
  //   return this.http
  //   .get<Aeropuerto[]>(`${API_URL}/aeropuertos`)
  //   .pipe(map(data => data.map(data => new Aeropuerto()
  //   .deserialize(data)))
  //   );
  // }

  GetNombresAeropuertos(): Observable<any> {
    return this.http
      .get(`${API_URL}/aeropuertos`)
      .pipe(retry(1), catchError(AeropuertoService._handleError));
  }



}
