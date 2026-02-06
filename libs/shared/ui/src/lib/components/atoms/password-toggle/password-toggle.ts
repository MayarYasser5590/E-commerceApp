import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-password-toggle',
  imports: [],
  templateUrl: './password-toggle.html',
  styleUrl: './password-toggle.scss',
})
export class PasswordToggle {
  @Input() isVisible = false;
  @Output() toggled = new EventEmitter<void>();

  onToggle(): void {
    this.toggled.emit();
  }

}
