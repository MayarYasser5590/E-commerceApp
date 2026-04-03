import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

export type BadgeVariant = 'accent' | 'warn' | 'danger' | 'neutral' | 'success';

@Component({
  selector: 'lib-badge-atom',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]"
      [ngClass]="variantClasses[variant()]"
    >
      {{ label() }}
    </span>
  `,
})
export class BadgeAtom {
  label = input('');
  variant = input<BadgeVariant>('accent');

  protected readonly variantClasses: Record<BadgeVariant, string> = {
    accent: 'bg-[#FBEAEA] text-[#A6252A]',
    warn: 'bg-amber-100 text-amber-800',
    danger: 'bg-red-100 text-red-700',
    neutral: 'bg-stone-100 text-stone-700',
    success: 'bg-emerald-100 text-emerald-700',
  };
}
