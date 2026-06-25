import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, BaseUser, User } from '@shop-workspace/shared-auth';
import {
  egyptianPhoneValidator,
  getApiErrorMessage,
  getEgyptianPhoneError,
  getEmailError,
  getNameError,
  toEgyptianInternationalPhone,
  toEgyptianLocalPhone,
} from '@shop-workspace/shared-util';
import { catchError, finalize, of, switchMap, throwError } from 'rxjs';
import { Toast } from '@shop-workspace/shared-ui';
import {
  AvatarUpload,
  CustomInput,
  FormField,
  LibButton,
} from '@shop-workspace/shared-ui';

@Component({
  selector: 'app-admin-account-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AvatarUpload,
    FormField,
    LibButton,
    CustomInput,
    Toast,
  ],
  providers: [MessageService],
  templateUrl: './admin-account-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminAccountPage implements OnInit {
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

  protected readonly accountForm = new FormGroup({
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
