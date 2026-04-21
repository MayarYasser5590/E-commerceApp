import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  LucideAngularModule,
  ChevronDown,
  User,
  MapPinPen,
  Moon,
  SunMoon,
} from 'lucide-angular';
import { SearchInputMolecule } from '../../molecules/search-input-molecule/search-input-molecule';
import { LogoAtom } from '../../atoms/logo-atom/logo-atom';
import { NavUserDataMolecule } from '../../molecules/nav-user-data-molecule/nav-user-data-molecule';
import { AuthenticatedMenuMolecule } from '../../molecules/authenticated-menu-molecule/authenticated-menu-molecule';
import { ThemeService } from '@shop-workspace/shared-util';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-top-navbar-organism',
  imports: [
    LucideAngularModule,
    SearchInputMolecule,
    LogoAtom,
    NavUserDataMolecule,
    AuthenticatedMenuMolecule,
    RouterLink,
  ],
  templateUrl: './top-navbar-organism.html',
  styleUrl: './navbar-organism.scss',
  standalone: true,
})
export class TopNavbarOrganism {
  @Input() isAuthenticated = false;
  @Input() user: any;
  @Output() logout = new EventEmitter<void>();
  private themeService = inject(ThemeService);

  icons = {
    ChevronDown,
    User,
    MapPinPen,
    Moon,
    SunMoon,
  };

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isDark() {
    return this.themeService.theme() === 'dark';
  }
}
