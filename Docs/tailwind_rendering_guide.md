# Complete Guide: Rendering Tailwind CSS in Nx Monorepo

## Table of Contents

1. [Understanding the Architecture](#understanding-the-architecture)
2. [Case 1: Shared UI Library (Global Styles)](#case-1-shared-ui-library-global-styles)
3. [Case 2: Application-Level Styles](#case-2-application-level-styles)
4. [Case 3: Feature Library Styles](#case-3-feature-library-styles)
5. [Case 4: Component-Level Styles](#case-4-component-level-styles)
6. [Case 5: PrimeNG PassThrough API](#case-5-primeng-passthrough-api)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Understanding the Architecture

```
Nx Monorepo
├── apps/
│   └── shop/
│       └── src/
│           └── styles.scss          # App entry point
├── libs/
│   ├── shared/
│   │   └── ui/
│   │       └── src/
│   │           ├── styles.scss      # Global Tailwind import
│   │           └── lib/components/  # Reusable components
│   └── shop/
│       └── feature-home/
│           └── src/lib/             # Feature-specific components
```

**Key Principle**: Tailwind should be imported **once** at the shared UI level and consumed everywhere else.

---

## Case 1: Shared UI Library (Global Styles)

### ✅ Recommended Setup

**File**: `libs/shared/ui/src/styles.scss`

```scss
@import "tailwindcss";
```

**Why?**

- Single source of truth for Tailwind
- Automatically available to all apps and libs that import shared UI
- Prevents duplicate CSS generation
- Ensures consistent styling across the monorepo

### Configuration

**File**: `libs/shared/ui/project.json`

```json
{
  "targets": {
    "build": {
      "options": {
        "styles": ["libs/shared/ui/src/styles.scss"]
      }
    }
  }
}
```

---

## Case 2: Application-Level Styles

### ✅ Recommended Setup

**File**: `apps/shop/src/styles.scss`

```scss
// Import shared UI styles (which includes Tailwind)
@import "@shop-workspace/shared-ui/src/styles.scss";

// Add app-specific global styles here
.app-specific-class {
  // Custom styles
}
```

**File**: `apps/shop/project.json`

```json
{
  "targets": {
    "build": {
      "options": {
        "styles": ["apps/shop/src/styles.scss"]
      }
    }
  }
}
```

### ❌ What NOT to Do

```scss
// DON'T import Tailwind again at app level
@import "tailwindcss"; // ❌ Duplicate import
```

---

## Case 3: Feature Library Styles

### ✅ Recommended Setup

**Feature libraries should NOT have their own `styles.scss` for Tailwind.**

**Example**: `libs/shop/feature-home/`

```
feature-home/
├── src/
│   └── lib/
│       ├── button-showcase.html      # Uses Tailwind classes
│       ├── button-showcase.ts
│       └── button-showcase.scss      # Component-specific styles only
```

**File**: `button-showcase.scss`

```scss
// Component-specific styles (NOT Tailwind import)
.custom-showcase-layout {
  // Use Tailwind @apply if needed
  @apply flex items-center gap-4;
}
```

### How Tailwind Works Here

1. Component uses Tailwind classes in template:

```html
<div class="p-8 space-y-8 flex flex-col items-start">
  <h1 class="text-2xl font-bold">Title</h1>
</div>
```

2. Tailwind is available because:
   - The feature lib is imported by the app
   - The app imports shared UI styles
   - Shared UI has Tailwind imported

### ❌ What NOT to Do

```scss
// libs/shop/feature-home/src/styles.scss
@import "tailwindcss"; // ❌ DON'T create this file
```

---

## Case 4: Component-Level Styles

### ✅ Using Tailwind Classes in Templates

**File**: `lib-button.html`

```html
<button [class]="'px-4 py-2 rounded-lg transition-colors ' + variantClasses()">
  <ng-content></ng-content>
</button>
```

**File**: `lib-button.ts`

```typescript
@Component({
  selector: "lib-button",
  templateUrl: "./lib-button.html",
  styleUrl: "./lib-button.scss", // Optional component styles
})
export class LibButton {
  variant = input<"primary" | "secondary">("primary");

  variantClasses = computed(() => {
    const variants = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white",
      secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    };
    return variants[this.variant()];
  });
}
```

### ✅ Using @apply in Component SCSS

**File**: `lib-button.scss`

```scss
.btn-base {
  @apply px-4 py-2 rounded-lg transition-colors;
}

.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white;
}
```

**Important**: This works because Tailwind is imported globally in shared UI.

### ❌ What NOT to Do

```scss
// lib-button.scss
@import "tailwindcss"; // ❌ Don't import in component styles
```

---

## Case 5: PrimeNG PassThrough API

### ✅ Using Tailwind with PrimeNG Components

**File**: `toast.ts`

```typescript
import { Component } from "@angular/core";
import { ToastModule } from "primeng/toast";
import { ToastPassThrough } from "primeng/types/toast";

@Component({
  selector: "lib-toast",
  imports: [ToastModule],
  template: `<p-toast [pt]="pt" />`,
})
export class LibToast {
  protected readonly pt: ToastPassThrough = {
    message: (options: any) => ({
      class: [
        "rounded-2xl border shadow-none",
        "bg-emerald-50 border-emerald-600 text-emerald-800",
      ],
    }),
    messageContent: { class: "px-8 py-5 gap-4 items-center" },
    messageIcon: { class: "text-2xl" },
  };
}
```

### Requirements

1. **Global MessageService**:

```typescript
// app.config.ts
import { MessageService } from "primeng/api";

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService, // ✅ Provide globally
  ],
};
```

2. **Tailwind Classes Available**: Automatically available through shared UI import

---

## Best Practices

### ✅ DO

1. **Import Tailwind once** in `libs/shared/ui/src/styles.scss`
2. **Import shared UI styles** in app-level `styles.scss`
3. **Use Tailwind classes directly** in component templates
4. **Use @apply** in component SCSS for reusable patterns
5. **Provide services globally** when needed (e.g., MessageService)

### ❌ DON'T

1. **Don't import Tailwind multiple times** across different libs
2. **Don't create `styles.scss`** in feature libraries just for Tailwind
3. **Don't import Tailwind** in component-level SCSS files
4. **Don't provide services** at component level if they're used globally

---

## Troubleshooting

### Problem: Tailwind Classes Not Rendering

**Symptoms**: Classes like `bg-blue-500` don't apply styles

**Solutions**:

1. **Check app-level styles import**:

```scss
// apps/shop/src/styles.scss
@import "@shop-workspace/shared-ui/src/styles.scss"; // ✅ Must be present
```

2. **Verify shared UI has Tailwind**:

```scss
// libs/shared/ui/src/styles.scss
@import "tailwindcss"; // ✅ Must be present
```

3. **Check build configuration**:

```json
// apps/shop/project.json
{
  "targets": {
    "build": {
      "options": {
        "styles": ["apps/shop/src/styles.scss"] // ✅ Must include styles
      }
    }
  }
}
```

### Problem: Duplicate Tailwind CSS

**Symptoms**: Large bundle size, conflicting styles

**Solution**: Remove duplicate `@import 'tailwindcss'` statements. Should only exist in `libs/shared/ui/src/styles.scss`.

### Problem: @apply Not Working in Component SCSS

**Symptoms**: `@apply` directive throws errors

**Solution**: Ensure the component's library is importing shared UI (which has Tailwind).

### Problem: PrimeNG PassThrough Classes Not Applying

**Symptoms**: Tailwind classes in PassThrough API don't render

**Solutions**:

1. **Provide MessageService globally**:

```typescript
// app.config.ts
providers: [MessageService];
```

2. **Ensure ViewEncapsulation allows global styles**:

```typescript
@Component({
  encapsulation: ViewEncapsulation.None, // If needed
})
```

---

## Quick Reference

| Scenario           | Import Tailwind?  | Import Shared UI Styles? |
| ------------------ | ----------------- | ------------------------ |
| Shared UI Library  | ✅ Yes            | N/A                      |
| App-Level Styles   | ❌ No             | ✅ Yes                   |
| Feature Library    | ❌ No             | ❌ No                    |
| Component SCSS     | ❌ No             | ❌ No                    |
| Component Template | N/A (use classes) | N/A                      |

---

## File Structure Summary

```
✅ CORRECT STRUCTURE

libs/shared/ui/src/styles.scss
  └── @import 'tailwindcss';

apps/shop/src/styles.scss
  └── @import '@shop-workspace/shared-ui/src/styles.scss';

libs/shop/feature-home/src/lib/
  ├── button-showcase.html (uses Tailwind classes)
  ├── button-showcase.ts
  └── button-showcase.scss (component-specific only, can use @apply)

❌ INCORRECT STRUCTURE

libs/shop/feature-home/src/styles.scss
  └── @import 'tailwindcss'; // ❌ DON'T DO THIS
```

---

## Related Files

- [app.config.ts](file:///d:/projects/E-commerceApp/apps/shop/src/app/app.config.ts) - App configuration with global providers
- [shared UI styles.scss](file:///d:/projects/E-commerceApp/libs/shared/ui/src/styles.scss) - Global Tailwind import
- [shop styles.scss](file:///d:/projects/E-commerceApp/apps/shop/src/styles.scss) - App-level styles
- [toast.ts](file:///d:/projects/E-commerceApp/libs/shared/ui/src/lib/components/atoms/toast/toast.ts) - Example of PassThrough API usage
