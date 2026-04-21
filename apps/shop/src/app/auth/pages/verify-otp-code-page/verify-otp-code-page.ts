import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { AuthService, EmailService } from '@shop-workspace/shared-auth';
import { VerifyOtpFormOragnism } from '@shop-workspace/shared-ui';
import { Subscription } from 'rxjs';
import { AuthFooterService } from '../../auth-footer.service';

@Component({
  selector: 'app-verify-otp-code-page',
  imports: [VerifyOtpFormOragnism],
  templateUrl: './verify-otp-code-page.html',
  styleUrl: './verify-otp-code-page.scss',
})
export class VerifyOtpCodePage implements OnInit, OnDestroy {
  @Output() verified = new EventEmitter<void>();

  private authService = inject(AuthService);
  private emailService = inject(EmailService);
  private authFooterService = inject(AuthFooterService);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  email: string | null = null;
  verifyOtpCodeSubscribe: Subscription = new Subscription();
  resentCodeSubscribe: Subscription = new Subscription();

  @ViewChild(VerifyOtpFormOragnism) otpComponent!: VerifyOtpFormOragnism;

  ngOnInit(): void {
    this.email = this.emailService.email();
    this.authFooterService.setFooter('verify');
  }

  handleVerifyOtpCode(code: string) {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.verifyOtpCodeSubscribe = this.authService.verifyReset(code).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.verified.emit();
      },
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set('Reset code is invalid or has expired');
      },
    });
  }

  handleResend() {
    if (!this.email) {
      this.errorMessage.set('Email is missing');
      return;
    }

    this.resentCodeSubscribe = this.authService
      .forgotPassword(this.email)
      .subscribe({
        next: () => {
          console.log('done');

          this.otpComponent.startCountdown(30);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.verifyOtpCodeSubscribe.unsubscribe();
    this.resentCodeSubscribe.unsubscribe();
  }
}
