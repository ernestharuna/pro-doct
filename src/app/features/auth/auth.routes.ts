import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login-page/login-page')
            .then(m => m.LoginPage)
    },
    {
        path: 'register',
        loadComponent: () => import('./register-page/register-page')
            .then(m => m.RegisterPage)
    },
];