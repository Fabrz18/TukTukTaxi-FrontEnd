import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import {AuthService} from '../services/authservice';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean {

    // 1️⃣ Verificar login
    if (!this.authService.isAuthenticated()) {
      alert('Debes iniciar sesión');
      this.router.navigate(['/login']);
      return false;
    }

    // 2️⃣ Obtener roles del token
    const token = this.authService.getToken();
    if (!token) return false;
    const requiredRole = route.data['role'];
    if (!requiredRole) return true;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const roles = payload.roles?.map((r: string) =>
      r.replace('ROLE_', '')
    ) || [];

    if (!roles.includes(requiredRole)) {
      this.router.navigate(['/home']);
      return false;
    }


    // 3️⃣ Rol requerido por la ruta

    // 4️⃣ Validación final
    if (!roles.includes(requiredRole)) {
      alert('No tienes permiso para acceder');
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
