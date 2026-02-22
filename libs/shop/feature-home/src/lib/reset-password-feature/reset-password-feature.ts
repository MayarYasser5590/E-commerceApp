import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, EmailService } from '@shop-workspace/shared-auth';
import { AuthLayout, ResetPasswordOrganism } from "@shop-workspace/shared-ui";

@Component({
  selector: 'lib-reset-password-feature',
  imports: [AuthLayout, ResetPasswordOrganism],
  templateUrl: './reset-password-feature.html',
  styleUrl: './reset-password-feature.scss',
})
export class ResetPasswordFeature {
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

  this.authService.resetPassword({
    email,
    newPassword
  }).subscribe({
    next: () => {
      this.isLoading.set(false);
      this.emailService.clear();
      this.router.navigate(['/login']);
    },
    error: () => {
      this.isLoading.set(false);
      this.errorMessage.set('Something went wrong');
    }
  });
}
}
