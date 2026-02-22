import { Component, EventEmitter, input, Output } from '@angular/core';
import { AuthFormHeaderMolecule } from "../../molecules/AuthFormHeaderMolecule/AuthFormHeaderMolecule";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibButton } from '../../atoms/lib-button/lib-button';
import { FormField } from "../../molecules/form-field/form-field";
import { CustomInput } from "../../atoms/custom-input/custom-input";
import { confirmPasswordValidator, PASSWORD_PATTERN } from '@shop-workspace/shared-util';
import { getConfirmPasswordError , getNewPasswordError } from '@shop-workspace/shared-util';

@Component({
  selector: 'lib-reset-password-organism',
  imports: [AuthFormHeaderMolecule, ReactiveFormsModule, LibButton, FormField, CustomInput ],
  templateUrl: './reset-password-organism.html',
  styleUrl: './reset-password-organism.scss',
})
export class ResetPasswordOrganism {
  @Output() done = new EventEmitter<void>();   // will use it when forget password flow finished
  @Output() passwordValue = new EventEmitter<string>();
  isLoading = input<boolean>(false);
  errorMessage = input<string | null>(null);


  resetPassForm = new FormGroup({
    newPassword: new FormControl(''  , {nonNullable: true, 
    validators: [Validators.required, Validators.pattern(PASSWORD_PATTERN)]}),
    confirmPassword: new FormControl('' , {nonNullable: true, validators: [Validators.required]})}
    , {validators: confirmPasswordValidator('newPassword','confirmPassword') });


get newPasswordError(): string | null {
  return getNewPasswordError(
    this.resetPassForm.controls.newPassword
  );
}

get confirmPasswordError(): string | null {
  return getConfirmPasswordError(
    this.resetPassForm.get('confirmPassword')
  );
}


submitResetPassForm() {
  if (this.resetPassForm.valid) {
    const password = this.resetPassForm.controls.newPassword.value;
    this.passwordValue.emit(password);
  } else {
    this.resetPassForm.markAllAsTouched();
  }
}

}



