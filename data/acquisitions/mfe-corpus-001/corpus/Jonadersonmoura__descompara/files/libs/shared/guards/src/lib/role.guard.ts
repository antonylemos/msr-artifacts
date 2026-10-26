import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@descompara/shared-data-access';
import { UserRole } from '@descompara/shared-types';

/**
 * Redirects to the sibling `login` route by rewriting the attempted URL
 * instead of an absolute path, so it works both mounted under the shell
 * (e.g. /intranet -> /intranet/login) and when the remote runs standalone
 * (/ -> /login). Assumes `login` is a sibling of the guarded route.
 */
export function roleGuard(...allowed: UserRole[]): CanActivateFn {
  return (_route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.hasRole(...allowed)) {
      return true;
    }

    const base = state.url.endsWith('/') ? state.url.slice(0, -1) : state.url;
    return router.parseUrl(`${base}/login`);
  };
}
