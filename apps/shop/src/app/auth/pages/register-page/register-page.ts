import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SignupCredentials } from '@shop-workspace/shared-auth';
import { RegisterFormOrganism } from '@shop-workspace/shared-ui';
import { AuthFooterService } from '../../auth-footer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-page',
  imports: [RegisterFormOrganism],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private authFooterService = inject(AuthFooterService);
  private readonly router = inject(Router);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  registerSubscribe: Subscription = new Subscription();

  ngOnInit() {
    this.authFooterService.setFooter('register');
  }

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

  ngOnDestroy(): void {
    this.registerSubscribe.unsubscribe();
  }
}
