import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment';
import {Driver} from '../model/Driver';

@Injectable({ providedIn: 'root' })
export class DriverService {
  private url = `${environment.apiUrl}/driver`;
  private http = inject(HttpClient);

  createDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(`${this.url}/register`, driver);
  }

  updateDriver(driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(`${this.url}/update`, driver);
  }

  getDriverById(id: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.url}/list/${id}`);
  }

  getAllDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.url}/listall`);
  }

  deleteDriver(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/delete/${id}`);
  }
}
