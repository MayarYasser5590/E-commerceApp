import { Injectable, signal, computed } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { AuthResponse, LoginCredentials, User } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_TOKEN_KEY = 'auth_token';

  // State using Signals
  private userSignal = signal<User | null>(null);
  currentUser = this.userSignal.asReadonly();
  isAuthenticated = computed(() => !!this.userSignal());

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // Mocking API delay
    return of({
      user: {
        id: '1',
        email: credentials.email,
        firstName: 'Mock',
        lastName: 'User',
        role: 'user',
      },
      token: 'mock-jwt-token-' + Math.random().toString(36).substring(7),
    } as AuthResponse).pipe(
      delay(1000),
      tap((response) => {
        this.userSignal.set(response.user);
        this.saveSession(response.token, credentials.rememberMe);
      }),
    );
  }

  logout(): void {
    this.userSignal.set(null);
    this.clearSession();
  }

  autoLogin(): void {
    const token = this.getToken();
    if (token) {
      // In a real app, we would validate the token with an API call
      this.userSignal.set({
        id: '1',
        email: 'mocked@example.com',
        firstName: 'Remembered',
        lastName: 'User',
        role: 'user',
      });
    }
  }

  getToken(): string | null {
    return (
      this.getCookie(this.AUTH_TOKEN_KEY) ||
      sessionStorage.getItem(this.AUTH_TOKEN_KEY)
    );
  }

  private saveSession(token: string, rememberMe: boolean): void {
    if (rememberMe) {
      this.setCookie(this.AUTH_TOKEN_KEY, token, 7);
    } else {
      sessionStorage.setItem(this.AUTH_TOKEN_KEY, token);
    }
  }

  private clearSession(): void {
    this.deleteCookie(this.AUTH_TOKEN_KEY);
    sessionStorage.removeItem(this.AUTH_TOKEN_KEY);
  }

  private setCookie(name: string, value: string, days: number): void {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie =
      name + '=' + (value || '') + expires + '; path=/; SameSite=Strict';
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  private deleteCookie(name: string): void {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
  }
}
