import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  Output,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, EmailService } from '@shop-workspace/shared-auth';
import {
  AuthLayout,
  ForgotPassRequestOrganism,
} from '@shop-workspace/shared-ui';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-pass-request-page',
  imports: [AuthLayout, ForgotPassRequestOrganism],
  templateUrl: './forgot-pass-request-page.html',
  styleUrl: './forgot-pass-request-page.scss',
})
export class ForgotPassRequestPage implements OnDestroy {
  @Output() continue = new EventEmitter<void>();
  private authService = inject(AuthService);
  private readonly router = inject(Router);
  private emailService = inject(EmailService);
  requestResetEmailSubscribe: Subscription = new Subscription();

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  handleRequestEmail(email: string) {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.emailService.setEmail(email);

    this.requestResetEmailSubscribe = this.authService
      .forgotPassword(email)
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.continue.emit();
        },
        error: () => {
          this.isLoading.set(false);
          this.errorMessage.set('Something went wrong');
        },
      });
  }

  ngOnDestroy(): void {
    this.requestResetEmailSubscribe.unsubscribe();
  }
}
