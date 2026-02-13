import { AbstractControl } from '@angular/forms';

export function getConfirmPasswordError(
  control: AbstractControl | null
): string | null {
  if (!control || !control.touched) return null;

  if (control.errors?.['required']) {
    return 'Confirm password is required';
  }

  if (control.errors?.['mismatch']) {
    return 'Passwords do not match';
  }

  return null;
}
