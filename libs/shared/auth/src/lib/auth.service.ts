import { Injectable, signal } from '@angular/core';

export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser = signal<User | null>(null);
  currentUser = this._currentUser.asReadonly();

  isAuthenticated = signal(false);

  login(role: UserRole) {
    this._currentUser.set({
      id: '1',
      email: `${role}@example.com`,
      role: role,
    });
    this.isAuthenticated.set(true);
  }

  logout() {
    this._currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  hasRole(role: UserRole): boolean {
    const user = this._currentUser();
    return !!user && user.role === role;
  }
}
