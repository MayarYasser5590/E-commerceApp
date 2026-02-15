import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  LoaderCircle,
  LucideIconData,
} from 'lucide-angular';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'text'
  | 'danger' | 'custom';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './lib-button.html',
  styleUrl: './lib-button.scss',
})
export class LibButton {
  protected readonly LoaderCircle = LoaderCircle;
  label = input<string>('');
  type = input<ButtonType>('button');
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  isLoading = input<boolean>(false);
  disabled = input<boolean>(false);
  icon = input<LucideIconData | undefined>(undefined);
  iconPos = input<'left' | 'right'>('left');
  customClass = input<string>('');

  clicked = output<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (!this.isLoading() && !this.disabled()) {
      this.clicked.emit(event);
    }
  }
}
