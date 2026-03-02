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
  token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));

  // Computed state
  isAuthenticated = computed(() => !!this.token());

  signIn(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponseDto>(
        `${this.config.apiUrl}${API_ENDPOINTS.AUTH.signIn}`,
        credentials,
      )
      .pipe(
        map((res) => AuthAdapter.fromResponseDto(res)),
        tap((res) => this.setAuth(res)),
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

  logout(): void {
    // TODO: REPLACE IT WITH COOKIES
    this.clearAuth();
  }

  getToken(): string | null {
    return this.token();
  }

  private setAuth(auth: AuthResponse): void {
    // TODO: REPLACE IT WITH COOKIES
    localStorage.setItem(this.TOKEN_KEY, auth.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(auth.user));
    this.token.set(auth.token);
    this.currentUser.set(auth.user);
  }

  private clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.token.set(null);
    this.currentUser.set(null);
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
