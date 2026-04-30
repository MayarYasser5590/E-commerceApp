import { Component, Input } from '@angular/core';
import { LucideAngularModule , Heart , ShoppingCart  , Bell , User } from 'lucide-angular';

@Component({
  selector: 'lib-nav-user-data-molecule',
  imports: [LucideAngularModule],
  templateUrl: './nav-user-data-molecule.html',
  styleUrl: './nav-user-data-molecule.scss',
})
export class NavUserDataMolecule {
  @Input() isAuthenticated = false;
  @Input() favCount?: number;
  @Input() cartCount?: number;

  icons = {
    Heart , ShoppingCart , Bell , User 
  };
}
