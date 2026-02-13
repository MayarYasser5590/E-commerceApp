import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';

@Component({
  selector: 'lib-password-toggle',
  imports: [LucideAngularModule],
  templateUrl: './password-toggle.html',
  styleUrl: './password-toggle.scss',
})
export class PasswordToggle {
  @Input() isVisible = false;
  @Output() toggled = new EventEmitter<void>();

  icons = {
  Eye,
  EyeOff
};

  onToggle(): void {
    this.toggled.emit();
  }


}
