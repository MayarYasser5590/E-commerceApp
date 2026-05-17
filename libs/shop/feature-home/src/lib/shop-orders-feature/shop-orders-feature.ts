import { Component, OnInit, inject, signal } from '@angular/core';
import { Order } from '@shop-workspace/shared-types';
import { CommonModule } from '@angular/common';
import { OrderService } from '../data-access/order.service';
import { LucideAngularModule, Star } from 'lucide-angular';

@Component({
  selector: 'lib-shop-orders-feature',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './shop-orders-feature.html',
  styleUrl: './shop-orders-feature.scss',
})
export class ShopOrdersFeature implements OnInit {
  private readonly orderService = inject(OrderService);

  orders = signal<Order[]>([]);
  expandedOrderId = signal<string | null>(null);

  icons = {
    Star,
  };

  ngOnInit() {
    this.orderService.getUserOrders().subscribe({
      next: (res) => {
        this.orders.set(res.orders);
      },
      error: (err) => console.error(err),
    });
  }

  toggle(orderId: string) {
    this.expandedOrderId.update((current) =>
      current === orderId ? null : orderId,
    );
  }

  isExpanded(orderId: string) {
    return this.expandedOrderId() === orderId;
  }

// --> in status.ts
export const STATUS_CLASSES: Record<string, string> = {
  pending:    'bg-blue-100 text-blue-600',
  done:       'bg-green-600 text-white',
  canceled:   'bg-red-600 text-white',
  inprogress: 'bg-blue-600 text-white',
};

export const DEFAULT_STATUS_CLASS = 'bg-gray-100 text-gray-600';


// --> in shop-orders-feature.ts component: 
import { STATUS_CLASSES, DEFAULT_STATUS_CLASS } from './status-classes.config';

getStatusClasses(state: string): string {
  return STATUS_CLASSES[state.toLowerCase()] ?? DEFAULT_STATUS_CLASS;
}

}
