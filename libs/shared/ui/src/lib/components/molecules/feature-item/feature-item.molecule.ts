import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
@Component({
  selector: 'lib-feature-item-molecule',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div
      class="flex items-start gap-4 rounded-2xl border border-[#f1d9db] bg-white/80 p-4 shadow-sm"
    >
      <lucide-angular
        [img]="iconClass()"
        [size]="18"
        color="#741C21"
      ></lucide-angular>

      <div class="space-y-1">
        <h3 class="text-base font-semibold text-[#741C21]">{{ title() }}</h3>
        <p class="text-sm leading-6 text-stone-600">{{ description() }}</p>
      </div>
    </div>
  `,
})
export class FeatureItemMolecule {
  iconClass = input<LucideIconData | undefined>(undefined);
  title = input('');
  description = input('');
}
