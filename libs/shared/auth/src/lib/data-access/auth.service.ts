import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '@shop-workspace/shared-util';
import { map, Observable, tap } from 'rxjs';
import {
  AuthAdapter,
  AuthResponse,
  AuthResponseDto,
  BaseUser,
  ChangePasswordDto,
  LoginCredentials,
  MessageResponse,
  ResetPasswordDto,
  SignupCredentials,
  User,
  UserDto,
} from '../models/auth.models';
import { API_ENDPOINTS } from '@shop-workspace/shared-util';
import { setCookie, getCookie } from './auth.tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  // State using Signals
  currentUser = signal<User | null>(this.getStoredUser());

  token = signal<string | null>(
    getCookie(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY),
  );

  // Computed state
  isAuthenticated = computed(() => !!this.token());

  signIn(credentials: LoginCredentials): Observable<AuthResponse> {
    const { email, password } = credentials;

    return this.http
      .post<AuthResponseDto>(
        `${this.config.apiUrl}${API_ENDPOINTS.AUTH.signIn}`,
        { email, password },
      )
      .pipe(
        map((res) => AuthAdapter.fromResponseDto(res)),
        tap((res) => this.setAuth(res, credentials.rememberMe)),
      );
  }

  signUp(credentials: SignupCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponseDto>(
        `${this.config.apiUrl}${API_ENDPOINTS.AUTH.signUp}`,
        credentials,
      )
      .pipe(
        map((res) => AuthAdapter.fromResponseDto(res)),
        tap((res) => this.setAuth(res)),
      );
  }

  changePassword(data: ChangePasswordDto): Observable<MessageResponse> {
    return this.http.patch<MessageResponse>(
      `${this.config.apiUrl}${API_ENDPOINTS.AUTH.changePassword}`,
      data,
    );
  }

  uploadProfilePhoto(file: File): Observable<AuthResponse> {
    const formData = new FormData();
    formData.append('photo', file);
    return this.http
      .put<AuthResponseDto>(
        `${this.config.apiUrl}${API_ENDPOINTS.AUTH.uploadPhoto}`,
        formData,
      )
      .pipe(
        map((res) => AuthAdapter.fromResponseDto(res)),
        tap((res) => this.setAuth(res)),
      );
  }

  getLoggedUserData(): Observable<User> {
    return this.http
      .get<UserDto>(`${this.config.apiUrl}${API_ENDPOINTS.AUTH.getUserData}`)
      .pipe(
        map((res) => AuthAdapter.fromDto(res)),
        tap((user) => this.currentUser.set(user)),
      );
  }

  forgotPassword(email: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.config.apiUrl}${API_ENDPOINTS.AUTH.forgotPassword}`,
      { email },
    );
  }

  verifyReset(code: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.config.apiUrl}${API_ENDPOINTS.AUTH.verifyReset}`,
      { code },
    );
  }

  resetPassword(data: ResetPasswordDto): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(
      `${this.config.apiUrl}${API_ENDPOINTS.AUTH.resetPassword}`,
      data,
    );
  }

  deleteAccount(): Observable<MessageResponse> {
    return this.http
      .delete<MessageResponse>(
        `${this.config.apiUrl}${API_ENDPOINTS.AUTH.deleteAccount}`,
      )
      .pipe(tap(() => this.logout()));
  }

  editProfile(data: Partial<BaseUser>): Observable<User> {
    const dto = AuthAdapter.toEditProfileDto(data);
    return this.http
      .put<UserDto>(
        `${this.config.apiUrl}${API_ENDPOINTS.AUTH.editProfile}`,
        dto,
      )
      .pipe(
        map((res) => AuthAdapter.fromDto(res)),
        tap((user) => this.currentUser.set(user)),
      );
  }

  changeUserRole(userId: string, role: 'user' | 'admin'): Observable<User> {
    return this.http
      .patch<UserDto>(`${this.config.apiUrl}${API_ENDPOINTS.AUTH.changeRole}`, {
        userId,
        role,
      })
      .pipe(map((res) => AuthAdapter.fromDto(res)));
  }

  clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);

    document.cookie = `${this.TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    localStorage.removeItem(this.USER_KEY);

    this.token.set(null);
    this.currentUser.set(null);
  }

  logout(): Observable<MessageResponse> {
    return this.http
      .get<MessageResponse>(`${this.config.apiUrl}${API_ENDPOINTS.AUTH.logout}`)
      .pipe(tap(() => this.clearAuth()));

    // TODO: REPLACE IT WITH COOKIES
  }

  getToken(): string | null {
    return (
      this.token() ||
      getCookie(this.TOKEN_KEY) ||
      sessionStorage.getItem(this.TOKEN_KEY)
    );
  }

  private setAuth(auth: AuthResponse, rememberMe?: boolean): void {
    if (rememberMe) {
      setCookie(this.TOKEN_KEY, auth.token, 7);
    } else {
      sessionStorage.setItem(this.TOKEN_KEY, auth.token);
    }

    localStorage.setItem(this.USER_KEY, JSON.stringify(auth.user));
    this.token.set(auth.token);
    this.currentUser.set(auth.user);
  }

  private getStoredUser(): User | null {
    const user = localStorage.getItem(this.USER_KEY);
    try {
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

  initUser(): void {
    if (this.token() && !this.currentUser()) {
      this.getLoggedUserData().subscribe();
    }
  }
}
