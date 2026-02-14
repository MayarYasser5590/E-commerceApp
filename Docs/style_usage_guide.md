# Application Style Usage Guide

This document clarifies how styles are organized, consumed, and extended within the `apps/shop` application and the broader workspace. It complements the [Tailwind Rendering Guide](./tailwind_rendering_guide.md).

## 1. Architecture Overview

- **Global Source of Truth**: `libs/shared/ui/src/styles.scss`
  - Imports `tailwindcss` framework.
  - Sets up Tailwind plugins (e.g., `tailwindcss-primeui`).
  - _Do not import `tailwindcss` anywhere else._

- **App Entry Point**: `apps/shop/src/styles.scss`
  - Imports the shared UI styles.
  - Defines app-wide theme variables.
  - Sets up global utility classes (e.g., `.auth-page`).
  - Overrides 3rd party component styles (e.g., PrimeNG) that need global scope.

## 2. Implementation Details

### A. Importing Shared Styles

The application **must** import the shared styles first to inherit Tailwind and base configurations.

**File:** `apps/shop/src/styles.scss`

```scss
/* Correct: Import properly configured shared styles */
@import 'libs/shared/ui/src/styles.scss';
```

**Incorrect:**

```scss
/* WRONG: Do not re-import Tailwind directly */
@import 'tailwindcss';
```

### B. Using Theme Variables

We use CSS variables to manage theming (e.g., light/dark mode support) separately from the logic.

**Definition:** `libs/shared/ui/src/lib/styles/_auth-theme.scss`

```css
:root {
  --page-bg: #ffffff;
  --main-color: #a6252a;
}
```

**Usage:** `apps/shop/src/styles.scss`

```scss
@use '../../../libs/shared/ui/src/lib/styles/auth-theme';

.auth-page {
  background-color: var(--page-bg); /* Consuming variable */
}
```

### C. Component Overrides

Some PrimeNG components typically require global style overrides because they render elements (like popups or complex nested structures) outside of standard view encapsulation or need deep selection.

**Example: OTP Input Override**

We customize the PrimeNG `p-inputotp` component globally in `apps/shop/src/styles.scss` to ensure consistent auth screen styling.

```scss
/* Global override for specific component internals */
.p-inputotp .p-inputtext {
  border-color: #d4d4d8;
  box-shadow: none !important;
}

/* Interaction states */
.p-inputotp .p-inputtext:focus {
  border-color: #a6252a !important; /* Using brand color */
}
```

## 3. Best Practices Checklist

1. **New Pages/Features**:
   - Do **not** create a `styles.scss` file in your feature library.
   - Use Tailwind utility classes directly in HTML.
   - If you need custom CSS constructs, use `@apply` in a component-specific `.scss` file.

2. **Resolving Conflicts**:
   - If you see "Tailwind classes not applying", check that `apps/shop/src/styles.scss` imports the shared UI styles.
   - If you see "Duplicate styles" or build warnings, check if `tailwindcss` is accidentally imported in a component or feature lib.

3. **Mobile Responsiveness**:
   - Use Tailwind breakpoints (`sm:`, `md:`, `lg:`) in HTML components.
   - For global overrides (like the OTP input), use standard media queries in the global style sheet as a last resort:
     ```scss
     @media (max-width: 640px) { ... }
     ```
