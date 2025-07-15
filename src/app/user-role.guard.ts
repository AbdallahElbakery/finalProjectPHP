import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CanActivateFn } from '@angular/router';

export const userRoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated() && authService.getRole() === 'user') {
    return true;
  } else {
    return router.parseUrl('/home');
  }
};
