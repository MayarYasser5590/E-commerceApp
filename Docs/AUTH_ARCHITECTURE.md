# Authentication Architecture Guide

This document outlines the architectural patterns and clean code principles used in the `shared/auth` library.

## 1. Adapter (Mapper) Pattern

To decouple our application from backend changes and ensure a clean domain model, we use the **Adapter Pattern**.

### Why use it?

- **Backend Independence**: If the backend changes a field name (e.g., `_id` to `uuid`), we only update the adapter, not the UI.
- **Frontend-Friendly Names**: We map API-specific naming conventions to clear, readable frontend properties (e.g., `_id` -> `id`).

### Implementation

The `AuthAdapter` class in `auth.models.ts` handles all transformations:

```typescript
// Maps API UserDto to App User
static fromDto(dto: UserDto): User {
  return {
    id: dto._id,
    email: dto.email,
    firstName: dto.firstName,
    lastName: dto.lastName,
    role: dto.role as 'user' | 'admin',
    // ... logic for other fields
  };
}
```

---

## 2. API Endpoint Centralization

To maintain a "single source of truth," all API paths are defined in `shared-util/endpoints.const.ts`. This makes it easy to update URLs without searching through service files.

**Example Usage in `AuthService`**:

```typescript
this.http.post(`${this.config.apiUrl}${API_ENDPOINTS.AUTH.signIn}`, data);
```

---

## 3. State Management with Angular Signals

We use **Angular Signals** for reactive, high-performance state management.

- `currentUser`: A signal containing the currently logged-in user object.
- `isAuthenticated`: A computed signal that automatically updates based on the presence of an auth token.

---

## 4. Service Logic Flow

Our `AuthService` follows a simple, consistent pattern for all actions:

1. **Request**: Call the API using standardized endpoints.
2. **Transform**: Use `AuthAdapter` to convert the backend response (DTO) to a frontend model.
3. **State Update**: Update local signals (`currentUser.set()`) and local storage.

### Example: Sign In Flow

```typescript
signIn(credentials: LoginCredentials): Observable<AuthResponse> {
  return this.http.post<AuthResponseDto>(URL, credentials).pipe(
    map(res => AuthAdapter.fromResponseDto(res)), // Step 2: Transform
    tap(res => this.setAuth(res))                // Step 3: Update State
  );
}
```

---

## 5. Supported Actions

The library supports a full range of authentication features:

- **Core**: Sign In, Sign Up, Logout.
- **Account**: Get User Data, Edit Profile, Upload Photo, Delete Account.
- **Security**: Change Password, Forgot Password, Reset Password Flow.
- **Admin**: Update User Roles.
