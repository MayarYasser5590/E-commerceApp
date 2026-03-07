import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { LucideAngularModule , House , Gift , ClipboardList , PartyPopper , Headset , Info , Menu , LogOut , X , LogIn } from 'lucide-angular';
import { RouterLink , RouterLinkActive } from '@angular/router';
import { LucideIconData } from 'lucide-angular';


interface MainNavItem {
  label: string;
  route: string;
  icon: LucideIconData;
}

@Component({
  selector: 'lib-main-navbar-organism',
  imports: [LucideAngularModule , RouterLink , RouterLinkActive],
  templateUrl: './main-navbar-organism.html',
  styleUrl: './main-navbar-organism.scss',
})
export class MainNavbarOrganism {
    icons = {
      House , Gift , ClipboardList , PartyPopper , Headset , Info , Menu , LogOut , X , LogIn
    };

  @Input() isAuthenticated = false;
  @Output() logout = new EventEmitter<void>();

  isOpen = signal(false);

  navItems: MainNavItem[] = [
    { label: 'Home', route: '/home', icon: House },
    { label: 'Products', route: '/products', icon: Gift },
    { label: 'Categories', route: '/Categories', icon: ClipboardList },
    { label: 'Occasions', route: '/Occasions', icon: PartyPopper },
    { label: 'Contact', route: '/Contact', icon: Headset },
    { label: 'About', route: '/About', icon: Info }
  ];


  toggleMenu() {
    this.isOpen.update(v => !v);
  }

  closeMenu() {
    this.isOpen.set(false);
  }

}
