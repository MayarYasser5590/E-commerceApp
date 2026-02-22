import { Component, inject, signal } from '@angular/core';
import { AuthLayout, VerifyOtpFormOragnism } from "@shop-workspace/shared-ui";
import {AuthService} from "@shop-workspace/shared-auth"
import { ViewChild } from '@angular/core';

@Component({
  selector: 'lib-verify-otp-code-feature',
  imports: [AuthLayout, VerifyOtpFormOragnism],
  templateUrl: './verify-otp-code-feature.html',
  styleUrl: './verify-otp-code-feature.scss',
})
export class VerifyOtpCodeFeature {
  private authService = inject(AuthService);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  email = '';  //Temporary value => The email should come from the Forget Password page.

  @ViewChild(VerifyOtpFormOragnism) otpComponent!: VerifyOtpFormOragnism;

  handleVerifyOtpCode(code: string) {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.authService.verifyReset(code ).subscribe({
        next: () => {
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
          this.errorMessage.set('Reset code is invalid or has expired');
        },
      });
  }

  handleResend() {
  this.authService.forgotPassword(this.email) 
    .subscribe({
      next: () => {
        console.log("done");
        
        this.otpComponent.startCountdown(30);
      },
      error:(err) => {
        console.log(err);
      },
    });
}
}
