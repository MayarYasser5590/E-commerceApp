import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService, UserRole } from './auth.service';

export const authGuard = (allowedRoles?: UserRole[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
      return router.createUrlTree(['/login']);
    }

    if (
      allowedRoles &&
      !allowedRoles.some((role) => authService.hasRole(role))
    ) {
      return router.createUrlTree(['/unauthorized']);
    }

    return true;
  };
};
