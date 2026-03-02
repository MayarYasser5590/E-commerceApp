import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule , ChevronDown , User , MapPinPen   } from 'lucide-angular';
import { SearchInputMolecule } from "../../molecules/search-input-molecule/search-input-molecule";
import { LogoAtom } from "../../atoms/logo-atom/logo-atom";
import { NavUserDataMolecule } from "../../molecules/nav-user-data-molecule/nav-user-data-molecule";
import { AuthenticatedMenuMolecule } from "../../molecules/authenticated-menu-molecule/authenticated-menu-molecule";

@Component({
  selector: 'lib-top-navbar-organism',
  imports: [LucideAngularModule, SearchInputMolecule, LogoAtom, NavUserDataMolecule, AuthenticatedMenuMolecule],
  templateUrl: './top-navbar-organism.html',
  styleUrl: './navbar-organism.scss',
  standalone: true,
})
export class TopNavbarOrganism {
  @Input() isAuthenticated= false;
  @Input() user: any;
  @Output() logout = new EventEmitter<void>();


    icons = {
      ChevronDown , User , MapPinPen 
    };

}
