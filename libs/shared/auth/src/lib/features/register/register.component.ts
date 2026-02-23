import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';
import { SignupCredentials } from '../../models/auth.models';
import { AuthLayout } from '@shop-workspace/shared-ui';
import { Register } from '@shop-workspace/shared-ui';

@Component({
  selector: 'lib-register-feature',
  imports: [AuthLayout, Register, RouterLink],
  template: `
    <lib-auth-layout
      [bannerImage]="'assets/images/auth-banner.png'"
      title="Register"
      subtitle="Create your account"
    >
      <div auth-form>
        <lib-register
          (formSubmit)="onRegister($event)"
          [isLoading]="isLoading()"
          [errorMessage]="errorMessage()"
        ></lib-register>
      </div>

      <div auth-footer class="mt-4">
        <p class="text-gray-600">
          Already have an account?
          <a
            routerLink="/auth/login"
            class="text-[#A6252A] font-semibold hover:underline"
            >Sign in</a
          >
        </p>
      </div>
    </lib-auth-layout>
  `,
})
export class RegisterFeatureComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  onRegister(data: SignupCredentials) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.signUp(data).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.error?.message || 'Registration failed. Please try again.',
        );
      },
    });
  }
}
