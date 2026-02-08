import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-auth-layout',
  imports: [],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {
  bannerImage = input.required<string>();
  title = input<string>();
  subtitle = input<string>();
}
