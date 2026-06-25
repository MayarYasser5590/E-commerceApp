import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import {
  LucideAngularModule,
  LayoutDashboard,
  ClipboardList,
  CalendarHeart,
  Package,
} from 'lucide-angular';

import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-mobile-navbar',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './mobile-bottom-navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileBottomNavbar {
  private cdr = inject(ChangeDetectorRef);

  protected readonly icons = {
    LayoutDashboard,
    ClipboardList,
    CalendarHeart,
    Package,
  };
}
