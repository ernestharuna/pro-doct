// auth.effects.ts
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, map, of, tap } from 'rxjs';
import { AuthSession } from '../../../shared/models/user';
import { AuthApi } from '../auth-api';
import { SessionPersistence } from '../session';
import { authActions } from './auth.actions';

function toMessage(err: unknown): string {
    if (err instanceof HttpErrorResponse) return 'Could not reach the server. Please try again.';
    return err instanceof Error ? err.message : 'Something went wrong.';
}

export const login$ = createEffect(
    (actions$ = inject(Actions), api = inject(AuthApi)) =>
        actions$.pipe(
            ofType(authActions.login),
            exhaustMap(({ credentials }) =>
                api.login(credentials).pipe(
                    map(session => authActions.sessionStarted({ session })),
                    catchError(err => of(authActions.authFailed({ error: toMessage(err) }))),
                ),
            ),
        ),
    { functional: true },
);

export const register$ = createEffect(
    (actions$ = inject(Actions), api = inject(AuthApi)) =>
        actions$.pipe(
            ofType(authActions.register),
            exhaustMap(({ data }) =>
                api.register(data).pipe(
                    map(session => authActions.sessionStarted({ session })),
                    catchError(err => of(authActions.authFailed({ error: toMessage(err) }))),
                ),
            ),
        ),
    { functional: true },
);

export const restoreSession$ = createEffect(
    (actions$ = inject(Actions), persistence = inject(SessionPersistence)) =>
        actions$.pipe(
            ofType(authActions.restoreSession),
            map(() => persistence.read()),
            filter((session): session is AuthSession => session !== null),
            map(session => authActions.sessionStarted({ session })),
        ),
    { functional: true },
);

export const persistSession$ = createEffect(
    (actions$ = inject(Actions), persistence = inject(SessionPersistence)) =>
        actions$.pipe(
            ofType(authActions.sessionStarted),
            tap(({ session }) => persistence.write(session)),
        ),
    { functional: true, dispatch: false },
);

export const logout$ = createEffect(
    (actions$ = inject(Actions), persistence = inject(SessionPersistence), router = inject(Router)) =>
        actions$.pipe(
            ofType(authActions.logout),
            tap(() => {
                persistence.clear();
                router.navigate(['/auth/login']);
            }),
        ),
    { functional: true, dispatch: false },
);