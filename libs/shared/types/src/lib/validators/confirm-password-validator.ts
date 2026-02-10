import { AbstractControl, ValidationErrors } from '@angular/forms';

export function confirmPasswordValidator(
  controlName: string,
  matchControlName: string
) {
  return (group: AbstractControl): ValidationErrors | null => {

    const password = group.get(controlName);
    const confirmPassword = group.get(matchControlName);

    if (!password || !confirmPassword) return null;

    if (confirmPassword.value !== password.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      if (confirmPassword.errors) {
        delete confirmPassword.errors['mismatch'];
        if (Object.keys(confirmPassword.errors).length === 0) {
          confirmPassword.setErrors(null);
        }
      }
      return null;
    }
  };
}
