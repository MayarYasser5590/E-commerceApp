import { Component } from '@angular/core';
import { VerifyOtpCodePage } from '../../pages/verify-otp-code-page/verify-otp-code-page';
import { ResetPassPage } from '../../pages/reset-pass-page/reset-pass-page';
import { ForgotPassRequestPage } from '../../pages/forgot-password-request-page/forgot-pass-request-page';
@Component({
  selector: 'app-forgot-pass-layout',
  imports: [VerifyOtpCodePage, ResetPassPage, ForgotPassRequestPage],
  template: ` @if (currentStep === 'email') {
      <app-forgot-pass-request-page
        (continue)="continue()"
      ></app-forgot-pass-request-page>
    }
    @if (currentStep === 'verify') {
      <app-verify-otp-code-page
        (verified)="verified()"
      ></app-verify-otp-code-page>
    }
    @if (currentStep === 'reset') {
      <app-reset-pass-page (done)="done()"></app-reset-pass-page>
    }`,
})
export class ForgotPassLayoutComponent {
  currentStep: 'email' | 'verify' | 'reset' = 'email';

  continue() {
    this.currentStep = 'verify';
  }

  verified() {
    this.currentStep = 'reset';
  }

  done() {
    this.currentStep = 'email';
  }
}
