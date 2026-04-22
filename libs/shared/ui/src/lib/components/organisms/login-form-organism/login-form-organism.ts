import { Component, input, output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  getEmailError,
  getNewPasswordError,
  PASSWORD_PATTERN,
} from '@shop-workspace/shared-util';
import { FormField } from '../../molecules/form-field/form-field';
import { LibButton } from '../../atoms/lib-button/lib-button';
import { CustomInput } from '../../atoms/custom-input/custom-input';
import { LibCheckbox } from '../../atoms/checkbox/checkbox';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-login-form-organism',
  imports: [
    ReactiveFormsModule,
    FormField,
    LibButton,
    CustomInput,
    LibCheckbox,
    RouterLink,
  ],
  templateUrl: './login-form-organism.html',
  styleUrl: './login-form-organism.scss',
})
export class LoginFormOrganism {
  isLoading = input<boolean>(false);
  errorMessage = input<string | null>(null);
  loginSubmit = output<{
    email: string;
    password: string;
    rememberMe: boolean;
  }>();

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
    }),
    rememberMe: new FormControl(false, { nonNullable: true }),
  });

  get emailError(): string | null {
    return getEmailError(this.loginForm.controls.email);
  }

  get passwordError(): string | null {
    return getNewPasswordError(this.loginForm.controls.password);
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      this.loginSubmit.emit({
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value,
        rememberMe: this.loginForm.controls.rememberMe.value,
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
