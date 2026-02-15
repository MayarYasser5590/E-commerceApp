# Remember Me Authentication Implementation Guide

## Overview

This document outlines the implementation details of the "Remember Me" functionality in the E-commerce application. The feature allows users to persist their login session across browser restarts using cookies.

## Architecture

### 1. Authentication Service (`AuthService`)

The core logic resides in `libs/shared/auth/src/lib/data-access/auth.service.ts`.

- **State Management**: Uses Angular Signals (`userSignal`) to manage the current user state.
- **Login**: The `login()` method accepts `LoginCredentials` including a `rememberMe` boolean.
  - If `rememberMe` is `true`: The JWT token is stored in a secure cookie with a 7-day expiration.
  - If `rememberMe` is `false`: The token is stored in `sessionStorage`, which clears when the browser tab is closed.
- **Auto-Login**: The `autoLogin()` method checks for the existence of the auth cookie on application startup. If found, it automatically restores the user session.
- **Logout**: Clears both the signal state and the storage (cookie or sessionStorage).

### 2. JWT Interceptor (`libs/shared/auth/src/lib/interceptors/jwt.interceptor.ts`)

- Automatically attaches the `Authorization` header to every outgoing HTTP request.
- Retrieves the token via `AuthService.getToken()`, which checks both cookies and session storage.

### 3. UI Components

#### Checkbox Atom (`libs/shared/ui/src/lib/components/atoms/checkbox`)

- A reusable component wrapping PrimeNG `p-checkbox`.
- Implements `ControlValueAccessor` to work seamlessly with Angular Reactive Forms.
- attributes: `label`, `id`, `disabled`.

#### Login Form Organism (`libs/shared/ui/src/lib/components/organisms/login-form`)

- Uses `ReactiveFormsModule` to handle form input.
- Includes the "Remember Me" checkbox.
- Emits `LoginCredentials` payload on submit.

### 4. Application Integration

#### App Configuration (`apps/shop/src/app/app.config.ts`)

- An `APP_INITIALIZER` is registered to invoke `AuthService.autoLogin()` during the app bootstrap phase.
- This ensures the session is restored before the UI fully loads.

## Usage

### Injecting AuthService

```typescript
import { AuthService } from '@shop-workspace/shared-auth';

@Component({...})
export class AnyComponent {
  authService = inject(AuthService);
  currentUser = this.authService.currentUser; // Signal<User | null>
}
```

### Using the Login Form

```html
<lib-login-form (loginSubmit)="handleLogin($event)"></lib-login-form>
```

```typescript
handleLogin(credentials: LoginCredentials) {
  this.authService.login(credentials).subscribe();
}
```

## Security Considerations

- **HttpOnly Cookies**: In a production environment with a real backend, the cookie should ideally be `HttpOnly` to prevent XSS attacks. The current implementation uses `document.cookie` for client-side storage mocking.
- **Secure Flag**: Ensure cookies are set with the `Secure` flag in production (requires HTTPS).
- **SameSite**: The implementation sets `SameSite=Strict` to prevent CSRF attacks.
