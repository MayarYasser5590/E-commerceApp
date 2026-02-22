import { AbstractControl } from '@angular/forms';

export function getNewPasswordError(
  control: AbstractControl | null
): string | null {

  if (!control || !control.touched) return null;

  if (control.errors?.['required']) {
    return 'Password is required';
  }

  if (control.errors?.['pattern']) {
    return 'Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character (#?!@$%^&*-)';
  }

  return null;
}