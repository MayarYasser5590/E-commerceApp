import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@shop-workspace/shared-auth';
import {
  CustomInput,
  FormField,
  LibButton,
  Toast,
} from '@shop-workspace/shared-ui';
import {
  confirmPasswordValidator,
  getApiErrorMessage,
  getConfirmPasswordError,
} from '@shop-workspace/shared-util';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';

type ChangePasswordForm = FormGroup<{
  oldPassword: FormControl<string>;
  newPassword: FormControl<string>;
  confirmPassword: FormControl<string>;
}>;

@Component({
  selector: 'app-admin-change-password-page',
  standalone: true,
  imports: [ReactiveFormsModule, CustomInput, FormField, LibButton, Toast],
  providers: [MessageService],
  template: `
    <lib-toast #toast />

    <section>
      <form
        [formGroup]="passwordForm"
        (ngSubmit)="submit(toast)"
        class="flex flex-col gap-4"
      >
        <lib-form-field
          label="Old Password"
          labelClass="text-[14px] font-medium leading-normal text-[#27272a]"
          [error]="oldPasswordError"
          errorClass="mt-1 text-sm text-[#A6252A]"
        >
          <lib-custom-input
            formControlName="oldPassword"
            inputClass="h-[49px] w-full rounded-[10px] border border-[#d4d4d8] bg-white p-4 pr-12 text-[14px] font-normal text-[#27272a] placeholder:text-[#a1a1aa] focus:outline-none focus:ring-1 focus:ring-[#a6252a]"
            type="password"
            placeholder="********"
            autocomplete="current-password"
          />
        </lib-form-field>

        <lib-form-field
          label="New Password"
          labelClass="text-[14px] font-medium leading-normal text-[#27272a]"
          [error]="newPasswordError"
          errorClass="mt-1 text-sm text-[#A6252A]"
        >
          <lib-custom-input
            formControlName="newPassword"
            inputClass="h-[49px] w-full rounded-[10px] border border-[#d4d4d8] bg-white p-4 pr-12 text-[14px] font-normal text-[#27272a] placeholder:text-[#a1a1aa] focus:outline-none focus:ring-1 focus:ring-[#a6252a]"
            type="password"
            placeholder="********"
            autocomplete="new-password"
          />
        </lib-form-field>

        <lib-form-field
          label="Confirm New Password"
          labelClass="text-[14px] font-medium leading-normal text-[#27272a]"
          [error]="confirmPasswordError"
          errorClass="mt-1 text-sm text-[#A6252A]"
        >
          <lib-custom-input
            formControlName="confirmPassword"
            inputClass="h-[49px] w-full rounded-[10px] border border-[#d4d4d8] bg-white p-4 pr-12 text-[14px] font-normal text-[#27272a] placeholder:text-[#a1a1aa] focus:outline-none focus:ring-1 focus:ring-[#a6252a]"
            type="password"
            placeholder="********"
            autocomplete="new-password"
          />
        </lib-form-field>

        @if (submitError()) {
          <div
            class="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {{ submitError() }}
          </div>
        }

        <div class="flex justify-end pt-6">
          <lib-button
            label="Change Password"
            type="submit"
            variant="custom"
            customClass="h-[46px] w-[228px] rounded-[10px] bg-[#a6252a] px-4 py-[14px] text-[16px] font-medium leading-none text-white hover:bg-[#741c21]"
            [disabled]="passwordForm.invalid || isSubmitting()"
            [isLoading]="isSubmitting()"
          />
        </div>
      </form>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminChangePasswordPage {
  private readonly authService = inject(AuthService);

  protected readonly isSubmitting = signal(false);
  protected readonly submitError = signal<string | null>(null);
  protected readonly passwordForm: ChangePasswordForm = new FormGroup(
    {
      oldPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      newPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    {
      validators: confirmPasswordValidator('newPassword', 'confirmPassword'),
    },
  );

  protected get oldPasswordError(): string | null {
    const control = this.passwordForm.controls.oldPassword;
    if (!control.touched) return null;
    if (control.hasError('required')) return 'Old password is required';
    return null;
  }

  protected get newPasswordError(): string | null {
    const control = this.passwordForm.controls.newPassword;
    if (!control.touched) return null;
    if (control.hasError('required')) return 'New password is required';
    if (control.hasError('minlength'))
      return 'New password must be at least 8 characters';
    return null;
  }

  protected get confirmPasswordError(): string | null {
    return getConfirmPasswordError(this.passwordForm.controls.confirmPassword);
  }

  protected submit(toast: Toast): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { oldPassword, newPassword } = this.passwordForm.getRawValue();

    this.isSubmitting.set(true);
    this.submitError.set(null);

    this.authService
      .changePassword({
        password: oldPassword,
        newPassword,
      })
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.passwordForm.reset();
          toast.showSuccess('Password changed successfully');
        },
        error: (error) => {
          this.submitError.set(
            getApiErrorMessage(
              error,
              'Could not change your password. Try again later.',
            ),
          );
        },
      });
  }
}
