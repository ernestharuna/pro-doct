import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { API_URL } from '../../../core/config/api-url.token';
import { Page, Product } from '../../../shared/models/product';
import { ProductsApi } from './products-api';

const BASE = 'http://api.test';
const PRODUCT: Product = {
  id: '1', name: 'Chair', description: 'A chair', price: 50, category: 'home',
  rating: 4.5, stock: 3, imageUrl: 'img.jpg', thumbnailUrl: 'thumb.jpg',
};

describe('ProductsApi', () => {
  let api: ProductsApi;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), { provide: API_URL, useValue: BASE }],
    });
    api = TestBed.inject(ProductsApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify()); // should fail if request is unexpected or unanswered

  it('requests a page with filters and maps the response', () => {
    let result: Page<Product> | undefined;
    api.list({ page: 2, pageSize: 20, search: 'chair', category: 'home', sort: '-price' })
      .subscribe(r => (result = r));

    const req = http.expectOne(r => r.url === `${BASE}/products`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('_page')).toBe('2');
    expect(req.request.params.get('_per_page')).toBe('20');
    expect(req.request.params.get('name:contains')).toBe('chair');
    expect(req.request.params.get('category')).toBe('home');
    expect(req.request.params.get('_sort')).toBe('-price');

    req.flush({ first: 1, prev: 1, next: 3, last: 50, pages: 50, items: 1000, data: [PRODUCT] });
    expect(result).toEqual({ items: [PRODUCT], total: 1000, page: 2, pages: 50 });
  });

  it('omits params that were not provided', () => {
    api.list({ page: 1, pageSize: 10 }).subscribe();
    const req = http.expectOne(r => r.url === `${BASE}/products`);
    expect(req.request.params.has('name:contains')).toBe(false);
    expect(req.request.params.has('category')).toBe(false);
    req.flush({ first: 1, prev: null, next: null, last: 1, pages: 1, items: 0, data: [] });
  });

  it('gets a product by id', () => {
    let result: Product | undefined;
    api.getById('1').subscribe(p => (result = p));
    http.expectOne(`${BASE}/products/1`).flush(PRODUCT);
    expect(result).toEqual(PRODUCT);
  });

  it('gets related products excluding the current one', () => {
    let result: Product[] = [];
    api.related('home', '1', 4).subscribe(p => (result = p));
    const req = http.expectOne(r => r.url === `${BASE}/products`);
    expect(req.request.params.get('id:ne')).toBe('1');
    expect(req.request.params.get('category')).toBe('home');
    req.flush({ first: 1, prev: null, next: null, last: 1, pages: 1, items: 1, data: [PRODUCT] });
    expect(result).toEqual([PRODUCT]);
  });

  it('posts a new product', () => {
    const { id, ...draft } = PRODUCT;
    api.create(draft).subscribe();
    const req = http.expectOne(`${BASE}/products`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(draft);
    req.flush(PRODUCT);
  });

  it('propagates HTTP errors', () => {
    let status = 0;
    api.getById('nope').subscribe({ error: e => (status = e.status) });
    http.expectOne(`${BASE}/products/nope`).flush('x', { status: 404, statusText: 'Not Found' });
    expect(status).toBe(404);
  });
});