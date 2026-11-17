import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthSession } from '../../shared/models/user';

@Injectable({ providedIn: 'root' })
export class SessionPersistence {
    private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    private readonly key = 'pro-doct.session';

    read(): AuthSession | null {
        if (!this.isBrowser) return null;
        try {
            const raw = localStorage.getItem(this.key);
            return raw ? (JSON.parse(raw) as AuthSession) : null;
        } catch {
            return null;
        }
    }

    write(session: AuthSession): void {
        if (!this.isBrowser) return;
        try { localStorage.setItem(this.key, JSON.stringify(session)); } catch { /* storage unavailable */ }
    }

    clear(): void {
        if (!this.isBrowser) return;
        try { localStorage.removeItem(this.key); } catch { /* ignore */ }
    }
}