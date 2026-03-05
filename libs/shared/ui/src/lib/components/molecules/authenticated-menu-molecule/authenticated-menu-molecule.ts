import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MenuModule, Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ChevronDown , User , MapPinHouse , ScrollText , Settings , LogOut  } from 'lucide-angular';
import { UserMenuItemInterface } from '../../../data-access/interfaces/user-menu-item.interface';

@Component({
  selector: 'lib-authenticated-menu-molecule',
  standalone: true,
  imports: [MenuModule, RouterModule, LucideAngularModule],
  templateUrl: './authenticated-menu-molecule.html',
  styleUrl: './authenticated-menu-molecule.scss',
})
export class AuthenticatedMenuMolecule {

  @Input() userName!: string;
  @Output() logout = new EventEmitter<void>();

  @ViewChild('menu') menu!: Menu;

  icons = { ChevronDown };

items: UserMenuItemInterface[] = [
  {
   label: this.userName ,
  },
  {
    icon: User,
    label: 'My Profile',
    // routerLink: '/profile'
  },
  {
    icon: MapPinHouse,
    label: 'My Addresses',
    // routerLink: '/addresses'
  },
  {
    icon: ScrollText,
    label: 'My Orders',
    // routerLink: '/orders'
  },
  {
    icon: Settings,
    label: 'Dashboard',
    // routerLink: '/dashboard'
  },
  {
    separator: true
  },
  {
    icon: LogOut,
    label: 'Log out',
    command: () => this.logout.emit()
  }
];

get menuModel(): MenuItem[] {
  return this.items as unknown as MenuItem[];
}

  toggle(event: Event) {
    this.menu.toggle(event);
  }

}