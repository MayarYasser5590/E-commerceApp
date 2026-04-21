import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, EmailService } from '@shop-workspace/shared-auth';
import { ResetPasswordOrganism } from '@shop-workspace/shared-ui';
import { AuthFooterService } from '../../auth-footer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-pass-page',
  imports: [ResetPasswordOrganism],
  templateUrl: './reset-pass-page.html',
  styleUrl: './reset-pass-page.scss',
})
export class ResetPassPage implements OnInit, OnDestroy {
  @Output() done = new EventEmitter<void>();
  private authService = inject(AuthService);
  authFooterService = inject(AuthFooterService);
  private readonly router = inject(Router);
  private emailService = inject(EmailService);
  resetPasswordSubscribe: Subscription = new Subscription();

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.authFooterService.setFooter('reset');
  }

  handleResetPassword(newPassword: string) {
    this.isLoading.set(true);
    const email = this.emailService.email();

    if (!email) {
      this.errorMessage.set('Please try again.');
      return;
    }
    this.errorMessage.set(null);

    this.resetPasswordSubscribe = this.authService
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

  ngOnDestroy(): void {
    this.resetPasswordSubscribe.unsubscribe();
  }
}
