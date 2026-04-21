import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../data-access/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // skip auth endpoints
  if (
    req.url.includes('/auth/signin') ||
    req.url.includes('/auth/signup') ||
    req.url.includes('/auth/logout')
  ) {
    return next(req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('ERROR:', req.url, error.status);

      if (error.status === 401) {
        authService.clearAuth();
        router.navigate(['/auth/login']);
      }

      return throwError(() => error);
    }),
  );
};
