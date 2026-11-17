import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authFeature } from './state/auth.feature';

export const adminMatch: CanMatchFn = () => {
  const store = inject(Store);
  if (store.selectSignal(authFeature.selectIsAdmin)()) return true;
  if (!store.selectSignal(authFeature.selectIsAuthenticated)()) {
    return inject(Router).createUrlTree(['/auth/login']);
  }
  return false; // logged in but not admin: route "doesn't exist", so it falls through to the 404 page
};