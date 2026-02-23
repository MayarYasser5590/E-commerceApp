import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormField } from '../../molecules/form-field/form-field';
import { CustomInput } from '../../atoms/custom-input/custom-input';
import { LibButton } from '../../atoms/lib-button/lib-button';
import { AuthFormHeaderMolecule } from '../../molecules/AuthFormHeaderMolecule/AuthFormHeaderMolecule';

@Component({
  selector: 'lib-register',
  imports: [
    FormField,
    CustomInput,
    ReactiveFormsModule,
    LibButton,
    AuthFormHeaderMolecule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  @Output() formSubmit = new EventEmitter<any>();
  isLoading = input<boolean>(false);
  errorMessage = input<string | null>(null);

  private _FormBuilder = inject(FormBuilder);

  registerForm: FormGroup = this._FormBuilder.group(
    {
      firstName: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      gender: [
        null,
        [Validators.required, Validators.pattern(/^(male|female)$/)],
      ],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
          ),
        ],
      ],
      rePassword: [null],
    },
    { validators: this.confirmPassword },
  );

  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  submitRegisterForm() {
    if (this.registerForm.valid) {
      this.formSubmit.emit(this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
