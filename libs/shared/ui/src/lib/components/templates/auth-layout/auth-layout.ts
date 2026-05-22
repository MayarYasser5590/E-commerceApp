import { Component, input } from '@angular/core';
import { Flourish } from '../../atoms/flourish/flourish';
import { LangSwitchAtom } from '../../atoms/lang-switch-atom/lang-switch-atom';

@Component({
  selector: 'lib-auth-layout',
  imports: [Flourish, LangSwitchAtom],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
  bannerImage = input.required<string>();
  title = input<string>();
  subtitle = input<string>();
}
