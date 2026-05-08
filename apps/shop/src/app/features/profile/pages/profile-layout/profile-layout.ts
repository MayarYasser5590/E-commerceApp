import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@shop-workspace/shared-auth';
import { Toast } from '@shop-workspace/shared-ui';
import { ProfileSidebar } from '../../components/profile-sidebar/profile-sidebar';

@Component({
  selector: 'app-profile-layout',
  imports: [RouterOutlet, ProfileSidebar, Toast],
  template: `
    <lib-toast #toast />
    <section class="flex flex-col items-start gap-9 pt-2 pb-12 sm:pt-4">
      <h1 class="text-[40px] font-bold leading-none text-[#27272a] sm:text-[48px]">Update Profile</h1>
      <div class="flex w-full flex-col gap-9 lg:min-h-[720px] lg:flex-row lg:items-start">
        <app-profile-sidebar [isLoggingOut]="isLoggingOut()" (logout)="handleLogout(toast)" />
        <div class="min-w-0 flex-1 overflow-hidden">
          <router-outlet></router-outlet>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileLayout {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isLoggingOut = signal(false);

  handleLogout(toast: Toast): void {
    this.isLoggingOut.set(true);
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggingOut.set(false);
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.isLoggingOut.set(false);
        toast.showError('Something went wrong. Try again later.');
      },
    });
  }
}
