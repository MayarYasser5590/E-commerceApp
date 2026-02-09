import { Component, EventEmitter, Output, signal } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { FormControl, FormGroup, FormsModule , ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthFormHeaderMolecule } from "../../molecules/AuthFormHeaderMolecule/AuthFormHeaderMolecule";
import { LibButton } from "../../atoms/lib-button/lib-button";


@Component({
  selector: 'lib-verify-otp-form-oragnism',
  imports: [InputOtpModule, FormsModule, ReactiveFormsModule, AuthFormHeaderMolecule, LibButton],
  templateUrl: './verify-otp-form-oragnism.html',
  styleUrl: './verify-otp-form-oragnism.scss',
})
export class VerifyOtpFormOragnism {
  length = 6;
  isLoading = false;

  @Output() verified = new EventEmitter<string>();

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


}
