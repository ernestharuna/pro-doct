import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./product-list-page/product-list-page')
            .then(m => m.ProductListPage),
    },
    {
        path: ':id',
        loadComponent: () => import('./product-detail-page/product-detail-page')
            .then(m => m.ProductDetailPage),
    },
];