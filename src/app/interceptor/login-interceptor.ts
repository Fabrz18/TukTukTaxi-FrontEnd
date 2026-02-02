import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, throwError } from 'rxjs';
import { AuthService } from '../services/authservice';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  const token = authService.usuarioActualValue?.token;

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      console.error("Error en la petición:", error);
      if (error.status === HttpStatusCode.Forbidden) {
        alert("No tienes permisos o tu sesión ha expirado.");
        return EMPTY;
      }

      if (error.status === HttpStatusCode.Unauthorized) {
        alert("Debes iniciar sesión nuevamente.");
        authService.logout(); // Es buena práctica sacarlo si es 401
        return EMPTY;
      }

      return throwError(() => error);
    })
  );
};
