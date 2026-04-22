import { Component, input, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  confirmPasswordValidator,
  getConfirmPasswordError,
  getEmailError,
  getNameError,
  getNewPasswordError,
  PASSWORD_PATTERN,
} from '@shop-workspace/shared-util';
import { FormField } from '../../molecules/form-field/form-field';
import { CustomInput } from '../../atoms/custom-input/custom-input';
import { LibButton } from '../../atoms/lib-button/lib-button';
import {
  PhoneInput,
  PhoneInputValue,
} from '../../molecules/phone-input/phone-input';

@Component({
  selector: 'lib-register-form-organism',
  imports: [ReactiveFormsModule, FormField, LibButton, CustomInput, PhoneInput],
  templateUrl: './register-form-organism.html',
  styleUrl: './register-form-organism.scss',
})
export class RegisterFormOrganism {
  isLoading = input<boolean>(false);
  errorMessage = input<string | null>(null);
  registerSubmit = output<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
    gender: string;
  }>();

  registerForm = new FormGroup(
    {
      firstName: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2)],
      }),
      lastName: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2)],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl<PhoneInputValue | null>(null),
      gender: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),

      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    { validators: confirmPasswordValidator('password', 'confirmPassword') },
  );

  get emailError(): string | null {
    return getEmailError(this.registerForm.controls.email);
  }

  get passwordError(): string | null {
    return getNewPasswordError(this.registerForm.controls.password);
  }

  get firstNameError() {
    return getNameError(this.registerForm.controls.firstName);
  }
  get lastNameError() {
    return getNameError(this.registerForm.controls.lastName);
  }

  get confirmPasswordError(): string | null {
    return getConfirmPasswordError(this.registerForm.get('confirmPassword'));
  }

  submitregisterForm() {
    if (this.registerForm.valid) {
      const form = this.registerForm.controls;

      this.registerSubmit.emit({
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value.trim(),
        password: form.password.value,
        rePassword: form.confirmPassword.value,
        phone: form.phone.value
          ? `${form.phone.value.countryCode}${form.phone.value.number}`
          : '',
        gender: form.gender.value,
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
