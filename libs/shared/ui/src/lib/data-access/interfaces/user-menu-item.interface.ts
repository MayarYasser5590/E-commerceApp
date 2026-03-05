import { LucideIconData } from 'lucide-angular';

export interface UserMenuItemInterface {
  label?: string;
  routerLink?: string;
  icon?: LucideIconData;
  separator?: boolean;
  command?: () => void;
}