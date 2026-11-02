import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth-guard';
import { roleGuard } from './core/auth/role-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./core/layout/shell/shell')
            .then(m => m.Shell),

        children: [
            {
                path: '', pathMatch: 'full', redirectTo: 'products'
            },
            {
                path: 'cart',
                canActivate: [authGuard],
                loadComponent: () => import('./features/cart/cart-page/cart-page')
                    .then(m => m.CartPage)
            },
            {
                path: 'admin/products/new',
                canActivate: [roleGuard],
                loadComponent: () => import('./features/admin/add-product-page/add-product-page')
                    .then(m => m.AddProductPage)
            },

            // route imports
            {
                path: 'products',
                loadChildren: () => import('./features/products/products.routes')
                    .then(m => m.PRODUCT_ROUTES)
            },
            {
                path: 'auth',
                loadChildren: () => import('./features/auth/auth.routes')
                    .then(m => m.AUTH_ROUTES)
            },
        ],
    },
    {
        path: '**',
        loadComponent: () => import('./core/not-found/not-found')
            .then(m => m.NotFound)
    },
];