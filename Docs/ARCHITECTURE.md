# Project Architecture & Structural Patterns

This document describes the core architectural patterns and folder structures used in the E-commerce monorepo.

## 1. UI Components: Atomic Design

All reusable UI components are located in `libs/shared/ui/src/lib/components` and follow the **Atomic Design** system.

### Atoms

- **Path**: `libs/shared/ui/src/lib/components/atoms`
- **Definition**: The smallest possible building blocks. They are logic-less and focus purely on rendering a single UI element.
- **Examples**: `Button`, `Input`, `Label`, `Icon`.

### Molecules

- **Path**: `libs/shared/ui/src/lib/components/molecules`
- **Definition**: Simple groups of multiple atoms. They are generally logic-less pairings.
- **Examples**: `FormField` (Label + Input), `SearchBar` (Input + Icon).

### Organisms

- **Path**: `libs/shared/ui/src/lib/components/organisms`
- **Definition**: Complex, standalone UI sections composed of atoms and molecules.
- **Examples**: `Navbar`, `LoginForm`, `Footer`, `ProductCard`.

### Templates

- **Path**: `libs/shared/ui/src/lib/components/templates`
- **Definition**: High-level layout wrappers that define the page structure without specific content.
- **Examples**: `AuthLayout`, `DashboardLayout`, `BlankLayout`.

---

## 2. Authentication: Clean Logic

The `libs/shared/auth` library centralizes all security and identity logic, decoupled from the UI.

### Folder Structure

- **models/**: Defines TypeScript interfaces for data (`User`, `AuthResponse`).
- **data-access/**: Contains the `AuthService` (state management) and `InjectionTokens`.
- **interceptors/**: HTTP middleware for adding tokens (`JwtInterceptor`) and handling expiry (`ErrorInterceptor`).
- **guards/**: Route protection logic (`AuthGuard`, `AdminGuard`).

---

## 3. General Principles

### State Management

- Prefer **Angular Signals** for local and shared state (e.g., `currentUser` in `AuthService`).
- Use computed signals for derived state to ensure reactivity.

### Dependency Injection

- Use **Injection Tokens** (e.g., `AUTH_API_URL`) for configuration to keep libraries environment-agnostic and testable.

### Public APIs

- Use `index.ts` in each library to control what is exported.
- Group exports logically to keep the public API clean and understandable.

---

## 4. Application Feature Patterns

For specific features within apps (e.g., `libs/shop/feature-home`):

- **pages/**: Routed screen components.
- **features/**: (Or `organisms/`) UI sections unique to this specific feature.
