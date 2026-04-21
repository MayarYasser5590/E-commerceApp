import { Component, EventEmitter, input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormField } from '../../molecules/form-field/form-field';
import { CustomInput } from '../../atoms/custom-input/custom-input';
import { LibButton } from '../../atoms/lib-button/lib-button';
import { AuthFormHeaderMolecule } from '../../molecules/AuthFormHeaderMolecule/AuthFormHeaderMolecule';
import { getEmailError } from '@shop-workspace/shared-util';

@Component({
  selector: 'lib-forgot-pass-request-organism',
  imports: [
    AuthFormHeaderMolecule,
    FormField,
    CustomInput,
    LibButton,
    ReactiveFormsModule,
  ],
  templateUrl: './forgot-pass-request-organism.html',
  styleUrl: './forgot-pass-request-organism.scss',
})
export class ForgotPassRequestOrganism {
  @Output() emailValue = new EventEmitter<string>();
  isLoading = input<boolean>(false);
  errorMessage = input<string | null>(null);

  forgotPassForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  get emailError(): string | null {
    return getEmailError(this.forgotPassForm.controls.email);
  }

  submitForgotPassForm() {
    if (this.forgotPassForm.valid) {
      const email = this.forgotPassForm.controls.email.value;
      this.emailValue.emit(email);
    } else {
      this.forgotPassForm.markAllAsTouched();
    }
  }
}
