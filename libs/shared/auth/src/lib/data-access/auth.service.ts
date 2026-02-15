import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginCredentials, User } from '../models/auth.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _currentUser = signal<User | null>(null);
  private readonly _router = inject(Router);
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => !!this._currentUser());

  login(credentials: LoginCredentials): void {
    // Mock login logic
    if (credentials.email && credentials.password) {
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'Test User',
        role: 'user',
      };
      this._currentUser.set(mockUser);
      // Determine redirect based on role or default to home
      this._router.navigate(['/home']);
    }
  }

  logout(): void {
    this._currentUser.set(null);
    this._router.navigate(['/auth/login']);
  }
}
