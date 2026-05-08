import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, LockKeyhole, LogOut, LucideIconData, UserRoundPen } from 'lucide-angular';

interface ProfileSidebarItem {
  label: string;
  route: string;
  icon: LucideIconData;
}

@Component({
  selector: 'app-profile-sidebar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  template: `
    <aside class="flex h-auto w-full shrink-0 rounded-2xl border border-[#f4f4f5] bg-[#fafafa] p-4 lg:h-[720px] lg:w-[299px]">
      <nav aria-label="Profile navigation" class="flex w-full gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        <div class="flex flex-1 gap-2 lg:flex-col">
        @for (item of items; track item.route) {
          <a
            [routerLink]="item.route"
            routerLinkActive="bg-[#27272a] text-[#fafafa]"
            class="flex min-w-max items-center gap-2.5 rounded-lg px-4 py-3 text-[16px] font-medium leading-none text-[#27272a] transition hover:bg-[#f4f4f5] lg:min-w-0"
          >
            <lucide-icon [name]="item.icon" class="h-6 w-6"></lucide-icon>
            <span>{{ item.label }}</span>
          </a>
        }
        </div>
        <button
          type="button"
          class="flex min-w-max items-center gap-2.5 rounded-lg bg-[#f4f4f5] px-4 py-3 text-left text-[16px] font-medium leading-none text-[#cd2e33] transition hover:bg-[#fbeaea] lg:min-w-0"
          [disabled]="isLoggingOut()"
          (click)="logout.emit()"
        >
          <lucide-icon [name]="icons.LogOut" class="h-5 w-5 rotate-180 scale-y-[-1]"></lucide-icon>
          <span>{{ isLoggingOut() ? 'Logging out...' : 'Logout' }}</span>
        </button>
      </nav>
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSidebar {
  isLoggingOut = input<boolean>(false);
  logout = output<void>();

  protected readonly icons = { LogOut };
  protected readonly items: ProfileSidebarItem[] = [
    { label: 'My Account', route: '/profile/account', icon: UserRoundPen },
    { label: 'Change Password', route: '/profile/change-password', icon: LockKeyhole },
  ];
}
