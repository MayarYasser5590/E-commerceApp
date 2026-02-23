import { Component, inject, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLayout, VerifyOtpFormOragnism } from '@shop-workspace/shared-ui';
import { AuthService } from '../../data-access/auth.service';
import { EmailService } from '../../data-access/email.service';

@Component({
  selector: 'lib-verify-otp',
  standalone: true,
  imports: [AuthLayout, VerifyOtpFormOragnism],
  template: `
    <lib-auth-layout
      [bannerImage]="'assets/images/auth-banner.png'"
      title="Verify Account"
      subtitle="Enter the verification code."
    >
      <div auth-form>
        <lib-verify-otp-form-oragnism
          #otpOrganism
          [isLoading]="isLoading()"
          [errorMessage]="errorMessage()"
          (verified)="onVerify($event)"
          (resend)="onResend()"
        ></lib-verify-otp-form-oragnism>
      </div>
    </lib-auth-layout>
  `,
})
export class VerifyOtpComponent {
  private authService = inject(AuthService);
  private emailService = inject(EmailService);
  private router = inject(Router);

  @ViewChild('otpOrganism') otpOrganism!: VerifyOtpFormOragnism;

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  onVerify(code: string) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.verifyReset(code).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/auth/reset-password']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.error?.message || 'Invalid verification code.',
        );
      },
    });
  }

  onResend() {
    const email = this.emailService.email();
    if (!email) {
      this.errorMessage.set(
        'Session expired. Please try again from the forgot password screen.',
      );
      return;
    }

    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.otpOrganism.startCountdown(60);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Failed to resend code.');
      },
    });
  }
}
