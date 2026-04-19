import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@shop-workspace/shared-auth';
import { LoginFormOrganism, AuthLayout } from '@shop-workspace/shared-ui';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormOrganism, AuthLayout, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  handleLogin(data: { email: string; password: string; rememberMe: boolean }) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.signIn(data).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.error?.message || 'Invalid email or password',
        );
      },
    });
  }
}
