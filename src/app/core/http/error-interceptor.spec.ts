import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { errorInterceptor } from './error-interceptor';

describe('errorInterceptor', () => {
  it('logs and rethrows errors', () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptors([errorInterceptor])), provideHttpClientTesting()],
    });
    const spy = vi.spyOn(console, 'error').mockImplementation(() => { });
    let status = 0;
    TestBed.inject(HttpClient).get('/x').subscribe({ error: e => (status = e.status) });
    TestBed.inject(HttpTestingController).expectOne('/x').flush('', { status: 500, statusText: 'Err' });
    expect(status).toBe(500);
    expect(spy).toHaveBeenCalled();
  });
});