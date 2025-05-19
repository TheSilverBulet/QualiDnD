import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.loggedIn) {
    router.navigate(['/login'])
    return false;
  }
  return true;
};
