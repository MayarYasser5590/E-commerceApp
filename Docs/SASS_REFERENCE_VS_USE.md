# Sass `@reference` vs `@use` in This Workspace

This document explains when to use `@reference` and when to use `@use`, with the exact behavior seen in this Nx + Angular + Tailwind setup.

## Quick Rule

1. Use `@use` when you want to include a stylesheet's CSS output.
2. Use `@reference` when you only need symbols/utilities for processing (like Tailwind `@apply`) and do not want CSS emitted.

## Why This Matters Here

Component stylesheet budgets are enforced in production builds (`anyComponentStyle` in `apps/shop/project.json`).

If a component SCSS file pulls in Tailwind output, that component CSS can become too large and fail the build.

## Real Example From This Project

File: `libs/shared/ui/src/lib/components/atoms/lib-button/lib-button.scss`

### Problematic version

```scss
@use 'tailwindcss';
```

This can cause Tailwind CSS to be emitted in the component stylesheet, increasing size and causing budget errors.

### Correct version

```scss
@reference 'tailwindcss';
```

This keeps `@apply` working but avoids emitting Tailwind CSS into that component output.

## Decision Table

| Need | Use | Result |
|---|---|---|
| Access mixins/functions/variables and include CSS output | `@use` | CSS may be emitted |
| Resolve utility references without output (Tailwind in component styles) | `@reference` | No CSS emission |
| Global Tailwind generation | `@import 'tailwindcss'` in global shared stylesheet | Single global CSS output |

## Recommended Pattern for This Repo

1. Global entry (`libs/shared/ui/src/styles.scss`):
   - `@import 'tailwindcss';`
   - `@plugin 'tailwindcss-primeui';`
2. Component SCSS files:
   - `@reference 'tailwindcss';` only when needed for `@apply`
3. Avoid `@use 'tailwindcss'` in component SCSS.

## Symptoms and Fixes

### Symptom: component style budget exceeded

Check if the component SCSS contains:

```scss
@use 'tailwindcss';
```

Replace with:

```scss
@reference 'tailwindcss';
```

Then rebuild:

```bash
npx.cmd nx build shop
```

## Notes

`@reference` is specifically useful in Tailwind v4 workflows to avoid duplicate/unwanted CSS generation from component-level styles.

