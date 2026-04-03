import { FormsModule } from '@angular/forms';
import { Component, input } from '@angular/core';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'lib-rating-atom',
  standalone: true,
  imports: [FormsModule, RatingModule],
  template: `
    <div class="flex items-center gap-2">
      <p-rating
        [ngModel]="value()"
        class="text-[#FBA707]"
        [readonly]="true"
        [stars]="5"
      ></p-rating>

      @if (count()) {
        <span class="text-sm text-stone-500">({{ count() }})</span>
      }
    </div>
  `,
})
export class RatingAtom {
  value = input(0);
  count = input(0);
}
