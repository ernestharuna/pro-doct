import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap, throwError } from 'rxjs';
import { API_URL } from '../config/api-url.token';
import { AuthSession, Credentials, RegisterData, User } from '../../shared/models/user';

type UserRecord = User & { password: string };

// MOCK ONLY: a real backend issues a signed token.
function toSession(record: UserRecord): AuthSession {
    const { password: _password, ...user } = record; // never keep the password in app state
    return { user, token: btoa(JSON.stringify({ sub: user.id, role: user.role })) };
}

@Injectable({ providedIn: 'root' })
export class AuthApi {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = inject(API_URL);

    login({ email, password }: Credentials): Observable<AuthSession> {
        const params = new HttpParams()
            .set('email', email)
            .set('password', password);
            
        return this.http.get<UserRecord[]>(`${this.baseUrl}/users`, { params }).pipe(
            map(users => {
                if (!users[0]) throw new Error('Invalid email or password');
                return toSession(users[0]);
            }),
        );
    }

    register(data: RegisterData): Observable<AuthSession> {
        const params = new HttpParams().set('email', data.email);
        return this.http.get<UserRecord[]>(`${this.baseUrl}/users`, { params }).pipe(
            switchMap(existing =>
                existing.length
                    ? throwError(() => new Error('That email is already registered'))
                    : this.http.post<UserRecord>(`${this.baseUrl}/users`, { ...data, role: 'user' }),
            ),
            map(toSession),
        );
    }
}