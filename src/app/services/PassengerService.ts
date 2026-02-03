import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import {environment} from '../environments/environment';
import {Passenger} from '../model/Passenger';

@Injectable({ providedIn: 'root' })
export class PassengerService {
  private url = `${environment.apiUrl}/passenger`;
  private http = inject(HttpClient);

  createPassenger(passenger: Passenger): Observable<Passenger> {
    return this.http.post<Passenger>(`${this.url}/register`, passenger);
  }

  updatePassenger(passenger: Passenger): Observable<Passenger> {
    return this.http.put<Passenger>(`${this.url}/update`, passenger);
  }

  getPassengerById(id: number): Observable<Passenger> {
    return this.http.get<Passenger>(`${this.url}/list/${id}`);
  }

  getAllPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(`${this.url}/listall`);
  }

  deletePassenger(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/delete/${id}`);
  }
}
