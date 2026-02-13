import { Component } from '@angular/core';
import { AuthLayout, ResetPasswordOrganism } from "@shop-workspace/shared-ui";

@Component({
  selector: 'lib-reset-password-feature',
  imports: [AuthLayout, ResetPasswordOrganism],
  templateUrl: './reset-password-feature.html',
  styleUrl: './reset-password-feature.scss',
})
export class ResetPasswordFeature {}
