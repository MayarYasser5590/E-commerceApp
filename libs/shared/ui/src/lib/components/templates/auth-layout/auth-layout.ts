import { Component, input } from '@angular/core';
import { Flourish } from '../../atoms/flourish/flourish';

@Component({
  selector: 'lib-auth-layout',
  imports: [Flourish],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
  bannerImage = input.required<string>();
  title = input<string>();
  subtitle = input<string>();
}
