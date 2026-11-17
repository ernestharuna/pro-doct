// auth.feature.ts
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../../../shared/models/user';
import { authActions } from './auth.actions';

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error';

export interface AuthState {
    user: User | null;
    token: string | null;
    status: AuthStatus;
    error: string | null;
}

export const initialAuthState: AuthState = { user: null, token: null, status: 'idle', error: null };

export const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialAuthState,
        on(authActions.login, authActions.register, (state): AuthState => ({ ...state, status: 'loading', error: null })),
        on(authActions.sessionStarted, (_state, { session }): AuthState => ({
            user: session.user, token: session.token, status: 'authenticated', error: null,
        })),
        on(authActions.authFailed, (state, { error }): AuthState => ({ ...state, status: 'error', error })),
        on(authActions.logout, (): AuthState => initialAuthState),
    ),
    extraSelectors: ({ selectUser, selectToken }) => ({
        selectIsAuthenticated: createSelector(selectToken, token => !!token),
        selectIsAdmin: createSelector(selectUser, user => user?.role === 'admin'),
    }),
});