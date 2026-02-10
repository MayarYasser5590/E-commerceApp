import { Component } from '@angular/core';
import { AuthLayout, VerifyOtpFormOragnism } from "@shop-workspace/shared-ui";

@Component({
  selector: 'lib-verify-otp-code-feature',
  imports: [AuthLayout, VerifyOtpFormOragnism],
  templateUrl: './verify-otp-code-feature.html',
  styleUrl: './verify-otp-code-feature.scss',
})
export class VerifyOtpCodeFeature {}
