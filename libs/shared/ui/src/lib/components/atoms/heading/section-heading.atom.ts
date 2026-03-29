import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-section-heading-atom',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="space-y-3"
      [ngClass]="align() === 'center' ? 'text-center' : 'text-left'"
    >
      @if (subtitle()) {
        <p
          class="text-sm font-semibold uppercase tracking-[0.28em] text-[#A6252A]"
        >
          {{ subtitle() }}
        </p>
      }

      <h2 class="text-3xl font-bold leading-tight text-[#741C21] md:text-4xl">
        <span class="relative inline-block">
          {{ title() }}
          <span
            class="absolute bottom-1 left-0 -z-10 h-3 w-[72%] bg-[#f3cfd3]"
          ></span>
        </span>
      </h2>

      @if (description()) {
        <p class="max-w-2xl text-sm leading-7 text-stone-600 md:text-base">
          {{ description() }}
        </p>
      }
    </div>
  `,
})
export class SectionHeadingAtom {
  subtitle = input('');
  title = input('');
  description = input('');
  align = input<'left' | 'center'>('left');
}
