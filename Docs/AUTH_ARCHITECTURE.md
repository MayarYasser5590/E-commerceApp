# Authentication Architecture Guide

This document outlines the architectural patterns and clean code principles used in the `shared/auth` library.

## 1. Adapter (Mapper) Pattern

To decouple our application from backend changes and ensure a clean domain model, we use the **Adapter Pattern**.

### Why use it?

- **Backend Independence**: If the backend changes a field name (e.g., `_id` to `uuid`), we only update the adapter, not the entire UI.
- **Data Sanitization**: We can filter out unnecessary backend fields and ensure type safety (e.g., role fallbacks).
- **Frontend-Friendly Names**: We map API-specific naming conventions to clear, readable frontend properties.

### Implementation

The `AuthAdapter` class in `auth.models.ts` handles all transformations:

```typescript
// Maps full API response (user + token)
static fromResponseDto(dto: AuthResponseDto): AuthResponse {
  return {
    user: this.fromDto(dto.user),
    token: dto.token,
  };
}
```

---

## 2. DRY Models with Interface Inheritance

To avoid repeating core user properties (email, name, etc.) across multiple interfaces, we use **Interface Inheritance**.

### Structure

- **`BaseUser`**: Contains all shared properties.
- **`User`**: Extends `BaseUser` for internal app state (uses `id`).
- **`UserDto`**: Extends `BaseUser` for API interactions (uses `_id`).
- **`SignupCredentials`**: Extends `BaseUser` for registration forms.

### Benefit

Adding a new shared field like `profilePicture` only requires a single update in `BaseUser`.

---

## 3. Consolidated Responses

Since `Sign-in` and `Sign-up` endpoints return the same data structure, we use a single set of interfaces (`AuthResponse` and `AuthResponseDto`).

### Usage in AuthService

Services should remain simple and delegate transformation to the adapter:

```typescript
signIn(credentials: LoginCredentials): Observable<AuthResponse> {
  return this.http.post<AuthResponseDto>(url, credentials).pipe(
    map(res => AuthAdapter.fromResponseDto(res))
  );
}
```

---

## 4. Best Practices Summary

- [x] **DRY**: Use inheritance for models.
- [x] **Decoupled**: Use Adapters for API data.
- [x] **Type Safe**: Explicitly map roles and use strict interface definitions.
- [x] **Single-Purpose**: Models only define structure; Adapters only handle transformation.
