import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode, provideAppInitializer, inject } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideState, provideStore, Store } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/http/error-interceptor';
import { API_URL } from './core/config/api-url.token';
import { environment } from '../environments/environment';

import * as authEffects from './core/auth/state/auth.effects';
import { authFeature } from './core/auth/state/auth.feature';
import { authActions } from './core/auth/state/auth.actions';
import { authInterceptor } from './core/auth/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideClientHydration(),
    provideStore(),
    provideState(authFeature),
    provideEffects(authEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(withFetch(), withInterceptors([errorInterceptor])),
    { provide: API_URL, useValue: environment.apiUrl },
    provideAppInitializer(() => inject(Store).dispatch(authActions.restoreSession())),
  ],
};
