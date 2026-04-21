import { AbstractControl } from '@angular/forms';

export function getEmailError(control: AbstractControl | null): string | null {
  if (!control || !control.touched) return null;

  if (control.errors?.['required']) {
    return 'Email is required';
  }

  if (control.errors?.['email']) {
    return 'Invalid email format';
  }

  return null;
}
