import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import {environment} from '../environments/environment';
import {Vehicle} from '../model/Vehicle';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private url = `${environment.apiUrl}/api/vehicle`;
  private http = inject(HttpClient);

  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.url}/register`, vehicle);
  }

  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.url}/update`, vehicle);
  }

  getVehicleById(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.url}/list/${id}`);
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.url}/listall`);
  }

  deleteVehicle(id: number): Observable<Vehicle> {
    return this.http.delete<Vehicle>(`${this.url}/delete/${id}`);
  }
}
