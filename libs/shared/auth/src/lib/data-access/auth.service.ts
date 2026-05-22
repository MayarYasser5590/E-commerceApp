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
  PhotoResponseDto,
  ResetPasswordDto,
  SignupCredentials,
  User,
  UserDto,
  UserResponseDto,
} from '../models/auth.models';
import { API_ENDPOINTS } from '@shop-workspace/shared-util';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);
  private cookieService = inject(SsrCookieService);

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  // State using Signals
  currentUser = signal<User | null>(this.getStoredUser());

  token = signal<string | null>(
    this.cookieService.get(this.TOKEN_KEY) ||
      sessionStorage.getItem(this.TOKEN_KEY),
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
      .pipe(map((res) => AuthAdapter.fromResponseDto(res)));
  }

  changePassword(data: ChangePasswordDto): Observable<MessageResponse> {
    return this.http.patch<MessageResponse>(
      `${this.config.apiUrl}${API_ENDPOINTS.AUTH.changePassword}`,
      data,
    );
  }

  uploadProfilePhoto(file: File): Observable<User> {
    const formData = new FormData();
    formData.append('photo', file);
    return this.http
      .put<AuthResponseDto | UserDto | UserResponseDto | PhotoResponseDto>(
        `${this.config.apiUrl}${API_ENDPOINTS.AUTH.uploadPhoto}`,
        formData,
      )
      .pipe(
        map((res) => {
          if ('token' in res && res.token) {
            const auth = AuthAdapter.fromResponseDto(res);
            this.setAuth(auth);
            return auth.user;
          }

          if ('photo' in res && !('user' in res)) {
            const currentUser = this.currentUser();
            if (currentUser) {
              return AuthAdapter.fromPhotoResponseDto(res, currentUser);
            }
          }

          if ('user' in res || '_id' in res) {
            return AuthAdapter.fromUserResponseDto(res);
          }

          const currentUser = this.currentUser();
          if (currentUser) {
            return currentUser;
          }

          throw new Error('Upload photo succeeded but no current user was available.');
        }),
        tap((user) => this.setUser(user)),
      );
  }

  getLoggedUserData(): Observable<User> {
    return this.http
      .get<UserDto | UserResponseDto>(
        `${this.config.apiUrl}${API_ENDPOINTS.AUTH.getUserData}`,
      )
      .pipe(
        map((res) => AuthAdapter.fromUserResponseDto(res)),
        tap((user) => this.setUser(user)),
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
      .pipe(tap(() => this.clearAuth()));
  }

  editProfile(data: Partial<BaseUser>): Observable<User> {
    const dto = AuthAdapter.toEditProfileDto(data);
    return this.http
      .put<UserDto | UserResponseDto>(
        `${this.config.apiUrl}${API_ENDPOINTS.AUTH.editProfile}`,
        dto,
      )
      .pipe(
        map((res) => AuthAdapter.fromUserResponseDto(res)),
        tap((user) => this.setUser(user)),
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

    this.cookieService.delete(this.TOKEN_KEY, '/');

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
      this.cookieService.get(this.TOKEN_KEY) ||
      sessionStorage.getItem(this.TOKEN_KEY)
    );
  }

  private setAuth(auth: AuthResponse, rememberMe?: boolean): void {
    if (rememberMe) {
      this.cookieService.set(this.TOKEN_KEY, auth.token, {
        expires: 7,
        path: '/',
      });
    } else {
      sessionStorage.setItem(this.TOKEN_KEY, auth.token);
    }

    localStorage.setItem(this.USER_KEY, JSON.stringify(auth.user));
    this.token.set(auth.token);
    this.setUser(auth.user);
  }

  private setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUser.set(user);
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
