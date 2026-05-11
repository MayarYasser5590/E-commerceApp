import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LibButton } from '@shop-workspace/shared-ui';

@Component({
  selector: 'lib-product-filter-section',
  imports: [LibButton],
  templateUrl: './product-filter-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFilterSectionComponent {
  title = input.required<string>();
  bordered = input(true);
  withTopPadding = input(true);

  resetClicked = output<void>();
}
