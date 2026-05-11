import { AbstractControl, ValidationErrors } from '@angular/forms';

const EGYPTIAN_LOCAL_PHONE_PATTERN = /^1[0125]\d{8}$/;

export function toEgyptianLocalPhone(phone: string | null | undefined): string {
  const digits = (phone ?? '').replace(/\D/g, '');

  if (digits.startsWith('0020')) {
    return digits.slice(4);
  }

  if (digits.startsWith('20')) {
    return digits.slice(2);
  }

  if (digits.startsWith('0')) {
    return digits.slice(1);
  }

  return digits;
}

export function toEgyptianInternationalPhone(
  phone: string | null | undefined,
): string {
  return `+20${toEgyptianLocalPhone(phone)}`;
}

export function egyptianPhoneValidator(
  control: AbstractControl<string>,
): ValidationErrors | null {
  return EGYPTIAN_LOCAL_PHONE_PATTERN.test(toEgyptianLocalPhone(control.value))
    ? null
    : { invalidPhone: true };
}

export function getEgyptianPhoneError(
  control: AbstractControl | null,
): string | null {
  if (!control?.touched) return null;
  if (control.hasError('required')) return 'Phone is required';
  if (control.hasError('invalidPhone'))
    return 'Enter a valid Egyptian phone number';
  return null;
}
