import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SignupCredentials } from '@shop-workspace/shared-auth';
import { AuthLayout, RegisterFormOrganism } from '@shop-workspace/shared-ui';

@Component({
  selector: 'app-register-page',
  imports: [AuthLayout, RegisterFormOrganism],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  private authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  handleRegister(data: SignupCredentials) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.signUp(data).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message);
      },
    });
  }
}
