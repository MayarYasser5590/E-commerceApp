import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  EventEmitter,
  inject,
  input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LucideAngularModule, ArrowRight, TicketPercent } from 'lucide-angular';
import { SliderOrganism } from '@shop-workspace/shared-ui';
import { ProductData } from '@shop-workspace/shared-types';
import { CartUi } from '../../cart/data-access/cart.ui';
import { HomeService } from '@shop-workspace/data-access';

@Component({
  selector: 'lib-shopping-flow-layout',
  imports: [LucideAngularModule, SliderOrganism],
  templateUrl: './shopping-flow-layout.html',
  styleUrl: './shopping-flow-layout.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingFlowLayout implements OnInit {
  readonly cart = inject(CartUi);
  private readonly homeService = inject(HomeService);
  private readonly destroyRef = inject(DestroyRef);
  currentStep = input<'cart' | 'address' | 'payment'>('cart');

  couponCode = signal('');

  products = signal<ProductData[]>([]);

  recommendedProducts = computed(() =>
    this.products()
      .filter(
        (product) =>
          !this.cart.items().some((item) => item.productId === product._id),
      )
      .slice(0, 8),
  );

  @Output() next = new EventEmitter<void>();

  icons = {
    ArrowRight,
    TicketPercent,
  };

  ngOnInit(): void {
    this.loadRecommendations();
  }

  applyCoupon() {
    this.cart.applyCoupon(this.couponCode());
  }

  private loadRecommendations() {
    this.homeService
      .getHomeData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => this.products.set(res.products),
        error: () => this.products.set([]),
      });
  }
}
