import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shop-workspace/shared-auth';
import { LoginFormOrganism } from '@shop-workspace/shared-ui';
import { AuthFooterService } from '../../auth-footer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormOrganism],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private authFooterService = inject(AuthFooterService);
  private readonly router = inject(Router);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  loginSubscribe: Subscription = new Subscription();

  ngOnInit() {
    this.authFooterService.setFooter('login');
  }

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

  ngOnDestroy(): void {
    this.loginSubscribe.unsubscribe();
  }
}
