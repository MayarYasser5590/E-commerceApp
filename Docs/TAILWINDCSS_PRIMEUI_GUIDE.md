# Tailwind CSS PrimeUI Guide

This guide explains how `tailwindcss-primeui` is integrated in this workspace and how to use it safely with PrimeNG.

## What It Does

`tailwindcss-primeui` exposes PrimeUI design tokens (colors, surfaces, semantic values) as Tailwind utilities so PrimeNG and Tailwind styling stay aligned.

## Workspace Setup

### 1. Install package

`package.json` includes:

```json
"tailwindcss-primeui": "^0.6.1"
```

### 2. Enable plugin in shared Tailwind entry

File: `libs/shared/ui/src/styles.scss`

```scss
@import 'tailwindcss';
@plugin 'tailwindcss-primeui';
```

### 3. Import shared styles at app level

File: `apps/shop/src/styles.scss`

```scss
@import 'libs/shared/ui/src/styles.scss';
```

### 4. Configure PrimeNG layer ordering

File: `apps/shop/src/app/app.config.ts`

```ts
providePrimeNG({
  theme: {
    preset: Lara,
    options: {
      cssLayer: {
        name: 'primeng',
        order: 'theme, base, primeng',
      },
    },
  },
});
```

This keeps Tailwind base/theme and PrimeNG styles in predictable order.

## Usage

You can use Tailwind utilities directly in templates and with PrimeNG PassThrough classes.

```html
<button class="bg-primary text-primary-contrast px-4 py-2 rounded-md">Buy now</button>
```

## Common Pitfalls

1. Do not `@import 'tailwindcss-primeui'` inside `.scss` files.  
   In this workspace, Sass may try to resolve internal CSS imports and fail (for example `theme/colors.css`).
2. Use `@plugin 'tailwindcss-primeui'` in the Tailwind entry stylesheet.
3. Keep Tailwind imported once at shared global level to avoid duplicate output.

## Verification Commands

```bash
npm.cmd run build:tailwind:ui
npx.cmd nx build shop
```

## Troubleshooting

### Error: `Can't resolve './theme/colors.css'`

Cause: using `@import 'tailwindcss-primeui'` from Sass.

Fix: replace with:

```scss
@plugin 'tailwindcss-primeui';
```

### Prime/Tailwind classes not applying as expected

Check:
1. `libs/shared/ui/src/styles.scss` has both Tailwind and plugin lines.
2. `apps/shop/src/styles.scss` imports shared styles.
3. `apps/shop/src/app/app.config.ts` includes PrimeNG `cssLayer` options.

