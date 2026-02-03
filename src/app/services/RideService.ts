import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment';
import {Ride} from '../model/Ride';

@Injectable({ providedIn: 'root' })
export class RideService {
  private url = `${environment.apiUrl}/ride`;
  private http = inject(HttpClient);

  registerRide(ride: Ride): Observable<Ride> {
    return this.http.post<Ride>(`${this.url}/register`, ride);
  }

  listRidesByDriver(driverId: number): Observable<Ride[]> {
    return this.http.get<Ride[]>(`${this.url}/list/driver/${driverId}`);
  }

  listRidesByPassenger(passengerId: number): Observable<Ride[]> {
    return this.http.get<Ride[]>(`${this.url}/list/passenger/${passengerId}`);
  }

  getAllRides(): Observable<Ride[]> {
    return this.http.get<Ride[]>(`${this.url}/listall`);
  }

  listRidesByRate(rate: number): Observable<Ride[]> {
    return this.http.get<Ride[]>(`${this.url}/list/rate/${rate}`);
  }
}
