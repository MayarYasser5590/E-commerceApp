import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
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
  disableResend = false;
  countdown = 0;
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

startCountdown(seconds: number) {
  if (this.intervalId) {
    clearInterval(this.intervalId);
  }

  this.countdown = seconds;
  this.disableResend = true;

  this.intervalId = setInterval(() => {
    this.countdown--;

    if (this.countdown <= 0) {
      this.disableResend = false;
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }, 1000);
}

resendOtp() {
  this.resendSuccess = false;
  this.startCountdown(30);
}


ngOnDestroy() {
  if (this.intervalId) {
    clearInterval(this.intervalId);
  }
}



}
