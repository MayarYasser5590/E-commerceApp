import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthLayout } from '@shop-workspace/shared-ui';
import { AuthFooterService } from '../../auth-footer.service';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, AuthLayout, RouterLink],
  template: `
    <lib-auth-layout bannerImage="/assets/banner.webp">
      <div auth-form>
        <router-outlet></router-outlet>
      </div>

      <div auth-footer class="text-center font-medium text-[14px]">
        @if (
          authFooterService.footerType() === 'login' ||
          authFooterService.footerType() === 'forgot'
        ) {
          <p class="text-[var(--text-main-color)]">
            Don’t have an account yet?
            <a
              class="text-[var(--main-color)] cursor-pointer"
              routerLink="/auth/register"
              >Create one now!</a
            >
          </p>
        }

        @if (authFooterService.footerType() === 'register') {
          <p class="text-[var(--text-main-color)]">
            Already have an account?
            <a
              class="text-[var(--main-color)] cursor-pointer"
              routerLink="/auth/login"
              >Login</a
            >
          </p>
        }
        @if (
          authFooterService.footerType() === 'verify' ||
          authFooterService.footerType() === 'reset'
        ) {
          <p class="text-[var(--text-main-color)]">
            Need help?
            <a class="text-[var(--main-color)] cursor-pointer">Contact us</a>
          </p>
        }
      </div>
    </lib-auth-layout>
  `,
})
export class AuthLayoutComponent {
  authFooterService = inject(AuthFooterService);
}
