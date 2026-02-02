import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import {environment} from '../environments/environment';

export interface UserSession {
  username: string;
  token: string;
  roles?: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = `${environment.apiUrl}`;
  private http = inject(HttpClient);
  private router = inject(Router);

  private currentUserSubject = new BehaviorSubject<UserSession | null>(this.getUserFromStorage());

  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  public get usuarioActualValue(): UserSession | null {
    return this.currentUserSubject.value;
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.url}/authenticate`, credentials).pipe(
      tap(res => {
        if (res && res.jwt) {
          const userSession: UserSession = {
            username: credentials.username,
            token: res.jwt,
          };

          localStorage.setItem('user_session', JSON.stringify(userSession));

          this.currentUserSubject.next(userSession);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user_session');
    this.currentUserSubject.next(null);

    this.router.navigate(['/login']);
  }

  private getUserFromStorage(): UserSession | null {
    const userJson = localStorage.getItem('user_session');
    return userJson ? JSON.parse(userJson) : null;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getToken(): string | null {
    return this.currentUserSubject.value?.token || null;
  }
}
