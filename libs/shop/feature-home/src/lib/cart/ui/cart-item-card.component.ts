import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CartItem } from '@shop-workspace/shared-types';
import { LucideAngularModule, Minus, Plus, Trash2 } from 'lucide-angular';

@Component({
  selector: 'lib-cart-item-card',
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-item-card.component.html',
})
export class CartItemCardComponent {
  item = input.required<CartItem>();
  currency = input('EGP');
  disabled = input(false);

  quantityChange = output<number>();
  remove = output<string>();

  protected readonly icons = {
    Minus,
    Plus,
    Trash2,
  };

  onQuantityInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.quantityChange.emit(Number(inputElement.value));
  }
}
