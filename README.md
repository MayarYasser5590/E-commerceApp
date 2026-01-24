# E-commerce Shop & Admin Workspace

This is an Nx-powered Angular monorepo containing a customer-facing Shop and an internal Admin dashboard.

## 🚀 Quick Start

| Application | Development Server   | Production Build     |
| :---------- | :------------------- | :------------------- |
| **Shop**    | `npx nx serve shop`  | `npx nx build shop`  |
| **Admin**   | `npx nx serve admin` | `npx nx build admin` |

## 🏗️ Architecture

The workspace follows a strict **Scope & Type** library architecture to ensure modularity and prevent coupling.

### Project Tags & Boundaries

Enforced via `.eslintrc.json`:

- **Scopes**: `scope:shop`, `scope:admin`, `scope:shared`.
- **Types**: `type:feature`, `type:ui`, `type:data-access`, `type:util`, `type:model`, `type:auth`.

> [!IMPORTANT]
> `shop` cannot depend on `admin` and vice versa. Use `shared` libraries for common logic.

### Core Libraries

- `libs/shared/auth`: Centralized `AuthService` and `AuthGuard` (Signals-based).
- `libs/shared/ui`: Reusable UI components (Buttons, Layouts, etc.).
- `libs/shared/util`: Shared configuration tokens (`APP_CONFIG`) and helpers.
- `libs/shared/types`: Common TypeScript interfaces and models.

## 🛠️ Development Workflow

### Useful Commands

- **Visualize Dependencies**: `npx nx graph`
- **Lint Projects**: `npx nx run-many -t lint`
- **Run Tests**: `npx nx run-many -t test`
- **Affected Only**: `npx nx affected -t lint test build` (Ideal for CI/PRs).

### Generating New Code

- **Library**: `npx nx g @nx/angular:lib --name=my-lib --directory=libs/[scope]/[name] --tags=scope:[scope],type:[type]`
- **Component**: `npx nx g @nx/angular:component --name=my-comp --project=[project-name]`
