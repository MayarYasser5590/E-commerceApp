import { Component, computed, input, output } from '@angular/core';
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
  | 'danger'
  | 'icon-only'
  | 'icon-only-neutral'
  | 'icon-only-primary'
  | 'icon-only-danger'
  | 'custom';
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
  ariaLabel = input<string>('');
  type = input<ButtonType>('button');
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  isLoading = input<boolean>(false);
  disabled = input<boolean>(false);
  fullWidth = input<boolean>(false);
  rounded = input<boolean>(false);
  icon = input<LucideIconData | undefined>(undefined);
  iconPos = input<'left' | 'right'>('left');
  customClass = input<string>('');

  clicked = output<MouseEvent>();

  protected readonly isIconOnly = computed(() =>
    this.variant().startsWith('icon-only'),
  );
  protected readonly buttonClasses = computed(() => [
    'lib-button',
    this.variant() !== 'custom' ? `variant-${this.variant()}` : '',
    this.isIconOnly() ? 'is-icon-only' : '',
    this.fullWidth() ? 'is-full-width' : '',
    this.rounded() ? 'is-rounded' : '',
    `size-${this.size()}`,
    this.customClass(),
  ]);
  protected readonly resolvedAriaLabel = computed(
    () => this.ariaLabel().trim() || this.label().trim() || null,
  );
  protected readonly showLabel = computed(
    () => !this.isIconOnly() && this.label().trim().length > 0,
  );
  protected readonly iconSize = computed(() => {
    switch (this.size()) {
      case 'sm':
        return 16;
      case 'lg':
        return 20;
      default:
        return 18;
    }
  });

  onClick(event: MouseEvent): void {
    if (this.type() === 'submit') return;
    if (!this.isLoading() && !this.disabled()) {
      this.clicked.emit(event);
    }
  }
}
