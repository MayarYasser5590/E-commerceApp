import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, EmailService } from '@shop-workspace/shared-auth';
import { AuthLayout, ResetPasswordOrganism } from '@shop-workspace/shared-ui';

@Component({
  selector: 'app-reset-pass-page',
  imports: [AuthLayout, ResetPasswordOrganism],
  templateUrl: './reset-pass-page.html',
  styleUrl: './reset-pass-page.scss',
})
export class ResetPassPage {
  @Output() done = new EventEmitter<void>();
  private authService = inject(AuthService);
  private readonly router = inject(Router);
  private emailService = inject(EmailService);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  handleResetPassword(newPassword: string) {
    this.isLoading.set(true);
    const email = this.emailService.email();

    if (!email) {
      this.errorMessage.set('Please try again.');
      return;
    }
    this.errorMessage.set(null);

    this.authService
      .resetPassword({
        email,
        newPassword,
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.emailService.clear();
          this.router.navigate(['/auth/login']);
        },
        error: () => {
          this.isLoading.set(false);
          this.errorMessage.set('Something went wrong');
        },
      });
  }
}
