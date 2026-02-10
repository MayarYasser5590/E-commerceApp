import { Component, EventEmitter, Output } from '@angular/core';
import { AuthFormHeaderMolecule } from "../../molecules/AuthFormHeaderMolecule/AuthFormHeaderMolecule";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibButton } from '../../atoms/lib-button/lib-button';
import { FormField } from "../../molecules/form-field/form-field";
import { CustomInput } from "../../atoms/custom-input/custom-input";
import { confirmPasswordValidator } from '@shop-workspace/shared-types';

@Component({
  selector: 'lib-reset-password-organism',
  imports: [AuthFormHeaderMolecule, ReactiveFormsModule, LibButton, FormField, CustomInput ],
  templateUrl: './reset-password-organism.html',
  styleUrl: './reset-password-organism.scss',
})
export class ResetPasswordOrganism {
  @Output() done = new EventEmitter<void>();   // will use it when forget password flow finished

  resetPassForm = new FormGroup({
    newPassword: new FormControl(null  , [Validators.required]),
    confirmPassword: new FormControl(null , [Validators.required]),
  }, {validators: confirmPasswordValidator('newPassword','confirmPassword') });


  get newPasswordError(): string | null {
  const control = this.resetPassForm.get('newPassword');
  if (!control || !control.touched) return null;
  if (control.errors?.['required']) {
    return 'Password is required';
  }
    return null;
}

  get confirmPasswordError(): string | null {
  const control = this.resetPassForm.get('confirmPassword');
  if (!control || !control.touched) return null;

  if (control.errors?.['required']) {
    return 'Confirm password is required';
  }
  if (control.errors?.['mismatch']) {
    return 'Passwords do not match';
  }

  return null;
}

  submitResetPassForm() {
    if (this.resetPassForm.valid) {
      console.log("success");  
  }
  else{
        this.resetPassForm.markAllAsTouched();
  }
  }

}



