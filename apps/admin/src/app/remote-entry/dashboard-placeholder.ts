import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard-placeholder',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="grid min-h-[18rem] place-items-center rounded-xl border border-dashed border-[#f1dfda] bg-[#f8f6f3]/60 p-6 text-center"
    >
      <p class="text-sm font-semibold text-[#847780]">
        {{ title }} content outlet
      </p>
    </div>
  `,
})
export class AdminDashboardPlaceholder {
  private readonly route = inject(ActivatedRoute);

  protected readonly title = this.route.snapshot.data['breadcrumb'] ?? 'Page';
}
