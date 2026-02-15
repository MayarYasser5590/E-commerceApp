# Toast Tailwind Styles Management

## Component Hierarchy

```
Shop App (app.html)
  └── ShopFeatureHome (shop-feature-home.html)
      └── ButtonShowcase (button-showcase.html)
          └── LibToast (toast component)
```

## The Problem

The `LibToast` component uses Tailwind classes via PrimeNG's PassThrough API:

```typescript
protected readonly pt: ToastPassThrough = {
  message: (options: any) => ({
    class: [
      'rounded-2xl border shadow-none',
      this.severityClass[options?.context?.message?.severity ?? 'info'],
    ],
  }),
  // ... more Tailwind classes
};
```

**Issues:**

1. `MessageService` was only provided at the `ButtonShowcase` component level, limiting toast scope
2. Tailwind classes need to be properly compiled and available at runtime

## The Solution

### 1. Global MessageService Provider ✅

**Changed:** Moved `MessageService` from component-level to app-level

**Before:**

```typescript
// button-showcase.ts
@Component({
  providers: [MessageService], // ❌ Component-scoped
})
```

**After:**

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    MessageService, // ✅ App-scoped
  ],
};
```

### 2. Tailwind Class Compilation ✅

Your Tailwind setup is already correct:

- [styles.scss](file:///d:/projects/E-commerceApp/libs/shared/ui/src/styles.scss) imports Tailwind
- The toast classes will be compiled and available globally

### 3. Component Structure ✅

The toast is properly placed in the template:

```html
<!-- button-showcase.html -->
<div class="p-8 space-y-8 flex flex-col items-start">
  <!-- Button examples -->
</div>
<lib-toast #toast />
```

## How It Works Now

1. **App Level**: `MessageService` is provided globally in [app.config.ts](file:///d:/projects/E-commerceApp/apps/shop/src/app/app.config.ts#L33)
2. **Toast Component**: `LibToast` injects the global `MessageService` and uses Tailwind classes via PassThrough
3. **Button Showcase**: References toast via template reference variable `#toast` and calls methods like `toast.showSuccess()`
4. **Styling**: Tailwind processes all classes from the shared UI library

## Usage Example

```html
<!-- button-showcase.html -->
<lib-button
  label="Primary"
  variant="primary"
  (clicked)="toast.showSuccess('Success')"
></lib-button>

<lib-toast #toast />
```

## Benefits

✅ **Global Service**: Toast can be used anywhere in the app  
✅ **Proper Styling**: Tailwind classes are compiled and applied correctly  
✅ **Clean Architecture**: Service provided at the right level  
✅ **Reusable**: Toast component can be used in any feature module

## Files Modified

- [app.config.ts](file:///d:/projects/E-commerceApp/apps/shop/src/app/app.config.ts) - Added `MessageService` provider
- [button-showcase.ts](file:///d:/projects/E-commerceApp/libs/shop/feature-home/src/lib/button-showcase.ts) - Removed redundant provider
