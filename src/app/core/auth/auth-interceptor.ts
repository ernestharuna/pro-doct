import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_URL } from '../config/api-url.token';
import { Store } from '@ngrx/store';
import { authFeature } from './state/auth.feature';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = inject(API_URL);
  const token = inject(Store).selectSignal(authFeature.selectToken)();

  if (!token || !req.url.startsWith(apiUrl)) return next(req);
  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
