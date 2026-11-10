import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_URL } from '../../../core/config/api-url.token';
import { Category, NewProduct, Page, Product, ProductQuery } from '../../../shared/models/product';

interface JsonServerPage<T> {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number; // the total count
    data: T[];
}

@Injectable({ providedIn: 'root' })
export class ProductsApi {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = inject(API_URL);

    list(q: ProductQuery): Observable<Page<Product>> {
        let params = new HttpParams()
            .set('_page', q.page).set('_per_page', q.pageSize);

        if (q.search)
            params = params.set('name:contains', q.search);

        if (q.category)
            params = params.set('category', q.category);

        if (q.minPrice != null)
            params = params.set('price:gte', q.minPrice);

        if (q.maxPrice != null)
            params = params.set('price:lte', q.maxPrice);

        if (q.sort)
            params = params.set('_sort', q.sort);
        
        return this.http
            .get<JsonServerPage<Product>>(`${this.baseUrl}/products`, { params })
            .pipe(map(r => ({ items: r.data, total: r.items, page: q.page, pages: r.pages })));
    }

    getById(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
    }

    related(category: string, excludeId: string, limit = 4): Observable<Product[]> {
        const params = new HttpParams()
            .set('category', category)
            .set('id:ne', excludeId)
            .set('_page', 1)
            .set('_per_page', limit);
        return this.http
            .get<JsonServerPage<Product>>(`${this.baseUrl}/products`, { params })
            .pipe(map(r => r.data));
    }

    categories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.baseUrl}/categories`);
    }

    create(product: NewProduct): Observable<Product> {
        return this.http.post<Product>(`${this.baseUrl}/products`, product);
    }
}
