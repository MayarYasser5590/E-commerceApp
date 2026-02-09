import { Component, signal } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { FormControl, FormGroup, FormsModule , ReactiveFormsModule } from '@angular/forms';
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
disabled = false;
invalid = false;
value = signal('');
isLoading = false;


  otpForm = new FormGroup({
  otp: new FormControl('')
});


submitOtpForm() {
  if (this.otpForm.valid) {
    this.isLoading = true;

  }
}

}
