import { FormControl } from '@angular/forms';

export function getNameError(control: FormControl): string | null {
  if (control.touched && control.hasError('required')) {
    return 'Name is required';
  }
  if (control.touched && control.hasError('minlength')) {
    return 'Name Must be at least 2 characters';
  }
  return null;
}
