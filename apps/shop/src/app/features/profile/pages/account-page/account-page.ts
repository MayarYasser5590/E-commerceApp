import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, of, switchMap, throwError } from 'rxjs';
import { AuthService, BaseUser, User } from '@shop-workspace/shared-auth';
import {
  AvatarUpload,
  CustomInput,
  FormField,
  LibButton,
  Toast,
} from '@shop-workspace/shared-ui';
import {
  egyptianPhoneValidator,
  getApiErrorMessage,
  getEgyptianPhoneError,
  getEmailError,
  getNameError,
  toEgyptianInternationalPhone,
  toEgyptianLocalPhone,
} from '@shop-workspace/shared-util';

type AccountForm = FormGroup<{
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  gender: FormControl<string>;
}>;

@Component({
  selector: 'app-account-page',
  imports: [
    ReactiveFormsModule,
    AvatarUpload,
    CustomInput,
    FormField,
    LibButton,
    Toast,
  ],
  template: `
    <lib-toast #toast />
    @if (loadError()) {
      <div
        class="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        role="alert"
      >
        {{ loadError() }}
      </div>
    }

    <form
      [formGroup]="accountForm"
      (ngSubmit)="submit(toast)"
      class="flex flex-col gap-4"
    >
      <lib-avatar-upload
        [imageUrl]="profilePhoto()"
        [userName]="fullName()"
        [disabled]="isSaving() || isLoading()"
        (fileSelected)="onPhotoSelected($event)"
        (validationFailed)="uploadError.set($event)"
      />

      @if (uploadError()) {
        <p class="text-sm text-[#A6252A]" role="alert">{{ uploadError() }}</p>
      }

      <div class="flex flex-col gap-2.5">
        <div class="grid gap-5 md:grid-cols-2">
          <lib-form-field
            label="First name"
            labelClass="text-[14px] font-medium leading-normal text-[#27272a]"
            [error]="firstNameError"
            errorClass="mt-1 text-sm text-[#A6252A]"
          >
            <lib-custom-input
              formControlName="firstName"
              inputClass="h-[49px] w-full rounded-[10px] border border-[#d4d4d8] bg-white p-4 text-[14px] font-normal text-[#27272a] placeholder:text-[#a1a1aa] focus:outline-none focus:ring-1 focus:ring-[#a6252a]"
              type="text"
              placeholder="First name"
            />
          </lib-form-field>

          <lib-form-field
            label="Last name"
            labelClass="text-[14px] font-medium leading-normal text-[#27272a]"
            [error]="lastNameError"
            errorClass="mt-1 text-sm text-[#A6252A]"
          >
            <lib-custom-input
              formControlName="lastName"
              inputClass="h-[49px] w-full rounded-[10px] border border-[#d4d4d8] bg-white p-4 text-[14px] font-normal text-[#27272a] placeholder:text-[#a1a1aa] focus:outline-none focus:ring-1 focus:ring-[#a6252a]"
              type="text"
              placeholder="Last name"
            />
          </lib-form-field>
        </div>

        <lib-form-field
          label="Email"
          labelClass="text-[14px] font-medium leading-normal text-[#27272a]"
          [error]="emailError"
          errorClass="mt-1 text-sm text-[#A6252A]"
        >
          <lib-custom-input
            formControlName="email"
            inputClass="h-[49px] w-full rounded-[10px] border border-[#d4d4d8] bg-white p-4 text-[14px] font-normal text-[#27272a] placeholder:text-[#a1a1aa] focus:outline-none focus:ring-1 focus:ring-[#a6252a]"
            type="email"
            placeholder="user@example.com"
          />
        </lib-form-field>

        <lib-form-field
          label="Phone"
          labelClass="text-[14px] font-medium leading-normal text-[#27272a]"
          [error]="phoneError"
          errorClass="mt-1 text-sm text-[#A6252A]"
        >
          <div
            class="flex h-[49px] items-center gap-2 rounded-[10px] border border-[#d4d4d8] bg-white p-4 focus-within:ring-1 focus-within:ring-[#a6252a]"
          >
            <span
              class="shrink-0 text-[14px] font-medium leading-[21px] text-[#323639]"
              >EG(+20)</span
            >
            <input
              formControlName="phone"
              type="tel"
              placeholder="1012345678"
              class="min-w-0 flex-1 bg-transparent text-[14px] font-normal text-[#27272a] placeholder:text-[#a1a1aa] focus:outline-none"
            />
          </div>
        </lib-form-field>

        <lib-form-field
          label="Gender"
          labelClass="text-[14px] font-medium leading-normal text-[#a1a1aa]"
        >
          <lib-custom-input
            formControlName="gender"
            inputClass="h-[49px] w-full rounded-[10px] border-0 bg-[#f4f4f5] p-4 text-[14px] font-normal text-[#a1a1aa] disabled:bg-[#f4f4f5] disabled:text-[#a1a1aa]"
            type="text"
            placeholder="Gender"
          />
        </lib-form-field>
      </div>

      @if (submitError()) {
        <div
          class="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {{ submitError() }}
        </div>
      }

      <div
        class="flex flex-col-reverse gap-3 pt-[60px] sm:flex-row sm:items-center sm:justify-between"
      >
        <button
          type="button"
          class="text-left text-[16px] font-medium leading-none text-[#cd2e33] hover:underline disabled:cursor-not-allowed disabled:opacity-60"
          [disabled]="isSaving() || isDeleting()"
          (click)="deleteAccount(toast)"
        >
          {{ isDeleting() ? 'Deleting account...' : 'Delete My Account' }}
        </button>

        <lib-button
          label="Save Changes"
          type="submit"
          variant="custom"
          customClass="h-[46px] w-[228px] rounded-[10px] bg-[#a6252a] px-4 py-[14px] text-[16px] font-medium leading-none text-white hover:bg-[#741c21]"
          [disabled]="accountForm.invalid || !!uploadError() || isLoading()"
          [isLoading]="isSaving()"
        />
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPage implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isLoading = signal(false);
  protected readonly isSaving = signal(false);
  protected readonly isDeleting = signal(false);
  protected readonly loadError = signal<string | null>(null);
  protected readonly submitError = signal<string | null>(null);
  protected readonly uploadError = signal<string | null>(null);
  protected readonly selectedPhoto = signal<File | null>(null);
  protected readonly user = this.authService.currentUser;
  protected readonly profilePhoto = computed(() => this.user()?.photo ?? null);
  protected readonly fullName = computed(() => {
    const currentUser = this.user();
    return currentUser
      ? `${currentUser.firstName} ${currentUser.lastName}`.trim()
      : '';
  });

  protected readonly accountForm: AccountForm = new FormGroup({
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
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, egyptianPhoneValidator],
    }),
    gender: new FormControl(
      { value: '', disabled: true },
      { nonNullable: true },
    ),
  });

  ngOnInit(): void {
    const cachedUser = this.authService.currentUser();
    if (cachedUser) {
      this.patchForm(cachedUser);
    }
    this.loadProfile();
  }

  protected get firstNameError(): string | null {
    return getNameError(this.accountForm.controls.firstName);
  }

  protected get lastNameError(): string | null {
    return getNameError(this.accountForm.controls.lastName);
  }

  protected get emailError(): string | null {
    return getEmailError(this.accountForm.controls.email);
  }

  protected get phoneError(): string | null {
    return getEgyptianPhoneError(this.accountForm.controls.phone);
  }

  protected submit(toast: Toast): void {
    if (this.accountForm.invalid || this.uploadError()) {
      this.accountForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    this.submitError.set(null);

    const value = this.accountForm.getRawValue();
    const payload: Partial<BaseUser> = {
      firstName: value.firstName.trim(),
      lastName: value.lastName.trim(),
      phone: toEgyptianInternationalPhone(value.phone),
    };
    const photo = this.selectedPhoto();
    const profileChanged = this.hasEditableProfileChanges(payload);

    const saveProfile$ = profileChanged
      ? this.authService.editProfile(payload)
      : of(this.authService.currentUser());

    saveProfile$
      .pipe(
        switchMap(() =>
          photo
            ? this.authService
                .uploadProfilePhoto(photo)
                .pipe(
                  switchMap((uploadedUser) =>
                    this.authService
                      .getLoggedUserData()
                      .pipe(catchError(() => of(uploadedUser))),
                  ),
                )
            : of(null),
        ),
        finalize(() => this.isSaving.set(false)),
      )
      .subscribe({
        next: () => {
          this.submitError.set(null);
          this.selectedPhoto.set(null);
          toast.showSuccess('Profile updated successfully');
        },
        error: (error) => {
          this.submitError.set(
            getApiErrorMessage(
              error,
              'Could not update your profile. Try again later.',
            ),
          );
        },
      });
  }

  protected deleteAccount(toast: Toast): void {
    if (
      !globalThis.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.',
      )
    ) {
      return;
    }

    this.isDeleting.set(true);
    this.authService
      .deleteAccount()
      .pipe(finalize(() => this.isDeleting.set(false)))
      .subscribe({
        next: () => {
          toast.showSuccess('Account deleted successfully');
          this.router.navigate(['/auth/register']);
        },
        error: (error) => {
          toast.showError(
            getApiErrorMessage(
              error,
              'Could not delete your account. Try again later.',
            ),
          );
        },
      });
  }

  protected onPhotoSelected(file: File | null): void {
    this.selectedPhoto.set(file);
    this.submitError.set(null);
  }

  private loadProfile(): void {
    this.isLoading.set(true);
    this.loadError.set(null);

    this.authService
      .getLoggedUserData()
      .pipe(
        catchError((error) => {
          this.loadError.set(
            getApiErrorMessage(error, 'Could not load your profile.'),
          );
          return throwError(() => error);
        }),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (user) => this.patchForm(user),
        error: () => undefined,
      });
  }

  private patchForm(user: User): void {
    this.accountForm.patchValue({
      firstName: user.firstName ?? this.accountForm.controls.firstName.value,
      lastName: user.lastName ?? this.accountForm.controls.lastName.value,
      email: user.email ?? this.accountForm.controls.email.value,
      phone: user.phone
        ? toEgyptianLocalPhone(user.phone)
        : this.accountForm.controls.phone.value,
      gender: user.gender ?? this.accountForm.controls.gender.value,
    });
  }

  private hasEditableProfileChanges(payload: Partial<BaseUser>): boolean {
    const currentUser = this.authService.currentUser();

    if (!currentUser) {
      return true;
    }

    return (
      payload.firstName !== currentUser.firstName ||
      payload.lastName !== currentUser.lastName ||
      payload.phone !== currentUser.phone
    );
  }
}
