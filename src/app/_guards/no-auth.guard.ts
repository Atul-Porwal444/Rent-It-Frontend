import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { filter, map, take } from 'rxjs';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    filter(user => user !== undefined), // Wait for hydration to finish
    take(1),
    map(user => {
      if (user) {
        // If they are logged in, send them straight to the dashboard
        router.navigate(['/dashboard']);
        return false;
      }
      // If they are NOT logged in, let them view the login/register page
      return true;
    })
  );
};