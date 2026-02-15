# Atomic Form Components Guide (PrimeNG + Shared UI)

This guide explains, in simple terms, how to build and use form inputs with your Atomic Design setup in:

`libs/shared/ui/src/lib/components`

## Goal

Use small reusable parts first (atoms), then compose them (molecules), then build full form sections (organisms).

## Quick Rule

1. If it is one control only (input/select/button): make an `Atom`.
2. If it combines 2+ atoms into one field unit: make a `Molecule`.
3. If it is a full form block/section: make an `Organism`.
4. If it is page layout only: make a `Template`.

## Current Components

### Atoms

- `lib-custom-input`  
  Path: `libs/shared/ui/src/lib/components/atoms/custom-input/custom-input.ts`  
  Use for text/email/password/tel input.

- `lib-select-input`  
  Path: `libs/shared/ui/src/lib/components/atoms/select-input/select-input.ts`  
  PrimeNG `p-select` wrapped as reusable CVA.

### Molecules

- `lib-form-field`  
  Path: `libs/shared/ui/src/lib/components/molecules/form-field/form-field.ts`  
  Label + error wrapper around any input.

- `lib-phone-input`  
  Path: `libs/shared/ui/src/lib/components/molecules/phone-input/phone-input.ts`  
  Country code select + phone number input in one field.

## Case 1: Gender Select (Simple)

Use:

- `lib-select-input` as the control
- `lib-form-field` for label/error

Example (Reactive Forms):

```html
<lib-form-field
  label="Gender"
  inputId="gender"
  [error]="form.controls.gender.touched && form.controls.gender.invalid ? 'Gender is required' : null"
>
  <lib-select-input
    inputId="gender"
    formControlName="gender"
    [options]="genderOptions"
    optionLabel="label"
    optionValue="value"
    placeholder="Select gender"
  />
</lib-form-field>
```

```ts
genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' }
];
```

## Case 2: Phone Input (Composite)

Use `lib-phone-input` molecule (already combines select + input).

Example (Reactive Forms):

```html
<lib-form-field
  label="Phone"
  inputId="phone"
  [error]="form.controls.phone.touched && form.controls.phone.invalid ? 'Phone is required' : null"
>
  <lib-phone-input
    inputId="phone"
    formControlName="phone"
    [countries]="countryOptions"
    phonePlaceholder="1012345678"
  />
</lib-form-field>
```

```ts
countryOptions = [
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: 'EG' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: 'US' }
];
```

`lib-phone-input` value shape:

```ts
{
  countryCode: string | null;
  number: string;
}
```

## Case 3: Full Signup/Profile Form

When a component contains many fields (name, gender, phone, password, submit), build an `Organism`:

- `signup-form-organism`
- `profile-form-organism`

Inside the organism, use molecules/atoms only. Do not repeat PrimeNG raw controls directly if shared atoms already exist.

## Export and Reuse

Shared UI exports are in:

`libs/shared/ui/src/index.ts`

New exports added:

- `lib-custom-input`
- `lib-select-input`
- `lib-form-field`
- `lib-phone-input`

Import from the shared package public API instead of deep paths when used by apps/features.

## Naming Pattern

Use this pattern for future fields:

1. Atom: `*-input`, `*-button`, `*-toggle`
2. Molecule: `*-field`, `*-input` (if composite)
3. Organism: `*-form-organism`
4. Template: `*-layout`

## Common Mistakes to Avoid

1. Creating a molecule for a single simple control.
2. Using PrimeNG controls directly in feature pages instead of shared atoms.
3. Duplicating label/error logic instead of using `lib-form-field`.
4. Exporting nothing from `libs/shared/ui/src/index.ts` and then importing deep relative paths everywhere.

## Fast Decision Checklist

Before creating a new component, ask:

1. Is it one control only?  
If yes, create atom.
2. Is it a composed field (2+ controls)?  
If yes, create molecule.
3. Is it an entire form section?  
If yes, create organism.
4. Is it just page shell/layout?  
If yes, create template.
