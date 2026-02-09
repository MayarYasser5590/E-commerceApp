import { Component, EventEmitter, OnDestroy, Output, signal } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { FormControl, FormGroup, FormsModule , ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthFormHeaderMolecule } from "../../molecules/AuthFormHeaderMolecule/AuthFormHeaderMolecule";
import { LibButton } from "../../atoms/lib-button/lib-button";
import { Subscription } from 'rxjs';


@Component({
  selector: 'lib-verify-otp-form-oragnism',
  imports: [InputOtpModule, FormsModule, ReactiveFormsModule, AuthFormHeaderMolecule, LibButton],
  templateUrl: './verify-otp-form-oragnism.html',
  styleUrl: './verify-otp-form-oragnism.scss',
})
export class VerifyOtpFormOragnism implements OnDestroy {
  length = 6;
  isLoading = false;
  countdown = signal(0);
  disableResend = signal(false);
  intervalId: any;
  resendSuccess = false;


  @Output() verified = new EventEmitter<string>();  // will use it when forget password flow finished

  otpForm = new FormGroup({
    otp: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });

      submitOtpForm() {
    if (this.otpForm.valid) {
      this.isLoading = true;
      const otpValue = this.otpForm.value.otp;
      console.log('Verified OTP:', otpValue);
    }
  }

  resendOtp() {
    this.startCountdown(30);
  }

  startCountdown(seconds: number) {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.countdown.set(seconds);
    this.disableResend.set(true);

    this.intervalId = setInterval(() => {
      this.countdown.update(v => v - 1);

      if (this.countdown() <= 0) {
        this.disableResend.set(false);
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }


}
