import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLayout, ResetPasswordOrganism } from '@shop-workspace/shared-ui';
import { AuthService } from '../../data-access/auth.service';
import { EmailService } from '../../data-access/email.service';

@Component({
  selector: 'lib-reset-password-feature',
  standalone: true,
  imports: [AuthLayout, ResetPasswordOrganism],
  template: `
    <lib-auth-layout
      [bannerImage]="'assets/images/auth-banner.png'"
      title="Reset Password"
      subtitle="Almost there! Create your new password."
    >
      <div auth-form>
        <lib-reset-password-organism
          [isLoading]="isLoading()"
          [errorMessage]="errorMessage()"
          (passwordValue)="onReset($event)"
        ></lib-reset-password-organism>
      </div>
      <div auth-footer class="font-medium text-[14px]">
        <p class="text-[var(--text-main-color)]">
          Need help? <a class="text-[var(--main-color)]">Contact us</a>
        </p>
      </div>
    </lib-auth-layout>
  `,
})
export class ResetPasswordFeatureComponent {
  private authService = inject(AuthService);
  private emailService = inject(EmailService);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  onReset(newPassword: string) {
    const email = this.emailService.email();
    if (!email) {
      this.errorMessage.set(
        'Session expired. Please try again from the forgot password screen.',
      );
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.resetPassword({ email, newPassword }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.emailService.clear();
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.error?.message || 'Failed to reset password. Please try again.',
        );
      },
    });
  }
}
